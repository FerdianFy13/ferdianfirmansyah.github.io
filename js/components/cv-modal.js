import { config } from '../data/config.js';

const PDFJS_VERSION = '3.11.174';
const PDFJS_BASE = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`;

const DOCS = {
  cv: { title: 'Curriculum Vitae', file: () => config.cv, version: () => config.cvVersion },
  portfolio: { title: 'Portfolio', file: () => config.portfolio, version: () => config.portfolioVersion },
};

// ---- Client-side cache -------------------------------------------------
// Documents: key -> { promise, pdf }. Caching the promise dedupes concurrent opens.
// Canvases: key -> rendered <canvas>. Bounded, as a page can cost ~16 MB at DPR 2.
const MAX_DOCS = 3;
const MAX_CANVASES = 6;
const docCache = new Map();
const canvasCache = new Map();

const docId = (doc) => `${doc.file()}@${doc.version?.() ?? ''}`;
const docUrl = (doc) => encodeURI(`${doc.file()}${doc.version?.() ? `?v=${doc.version()}` : ''}`);

function touch(map, key) {
  const value = map.get(key);
  map.delete(key);
  map.set(key, value);
  return value;
}

function dropCanvases(id) {
  for (const key of [...canvasCache.keys()]) {
    if (key.startsWith(`${id}|`)) canvasCache.delete(key);
  }
}

function evictDoc(id) {
  const entry = docCache.get(id);
  docCache.delete(id);
  dropCanvases(id);
  entry?.promise.then((pdf) => pdf.destroy()).catch(() => {});
}

function getPdf(pdfjsLib, doc) {
  const id = docId(doc);
  if (docCache.has(id)) return touch(docCache, id).promise;

  const promise = pdfjsLib.getDocument(docUrl(doc)).promise;
  docCache.set(id, { promise });
  promise.catch(() => {
    if (docCache.get(id)?.promise === promise) docCache.delete(id);
  });
  while (docCache.size > MAX_DOCS) evictDoc(docCache.keys().next().value);
  return promise;
}

function storeCanvas(key, canvas) {
  canvasCache.set(key, canvas);
  while (canvasCache.size > MAX_CANVASES) canvasCache.delete(canvasCache.keys().next().value);
}

/** Releases every cached document and canvas. The next open starts from scratch. */
export function clearPdfCache() {
  for (const id of [...docCache.keys()]) evictDoc(id);
  canvasCache.clear();
}

let pdfjsPromise = null;

function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (!pdfjsPromise) {
    pdfjsPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${PDFJS_BASE}/pdf.min.js`;
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE}/pdf.worker.min.js`;
        resolve(window.pdfjsLib);
      };
      script.onerror = () => {
        pdfjsPromise = null;
        reject(new Error('Failed to load PDF.js'));
      };
      document.head.appendChild(script);
    });
  }
  return pdfjsPromise;
}

export function initCvModal() {
  const modal = document.createElement('div');
  modal.className = 'cv-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Document preview');
  modal.hidden = true;
  modal.innerHTML = `
    <div class="cv-modal__backdrop" data-cv-close></div>
    <div class="cv-modal__dialog">
      <div class="cv-modal__header">
        <span class="cv-modal__title">Curriculum Vitae</span>
        <button type="button" class="cv-modal__close" data-cv-close aria-label="Close preview">&times;</button>
      </div>
      <div class="cv-modal__body">
        <div class="cv-modal__pages"></div>
        <p class="cv-modal__status">Loading…</p>
      </div>
      <p class="cv-modal__note">Preview only. Download is disabled for privacy. Please contact me for a copy.</p>
    </div>
  `;
  document.body.appendChild(modal);

  const body = modal.querySelector('.cv-modal__body');
  const pages = modal.querySelector('.cv-modal__pages');
  const status = modal.querySelector('.cv-modal__status');
  let lastFocus = null;
  let session = 0;

  async function renderPdf(id, doc) {
    status.hidden = false;
    status.textContent = 'Loading…';
    try {
      const pdfjsLib = await loadPdfJs();
      const pdf = await getPdf(pdfjsLib, doc);
      const cssWidth = Math.min(body.clientWidth - 32, 860);
      const dpr = window.devicePixelRatio || 1;
      const did = docId(doc);

      for (let n = 1; n <= pdf.numPages; n++) {
        if (id !== session) return;

        const cacheKey = `${did}|${n}|${cssWidth}|${dpr}`;
        const cached = canvasCache.get(cacheKey);
        if (cached) {
          touch(canvasCache, cacheKey);
          pages.appendChild(cached);
          if (n === 1) status.hidden = true;
          continue;
        }

        const page = await pdf.getPage(n);
        if (id !== session) return;
        const base = page.getViewport({ scale: 1 });
        const scale = cssWidth / base.width;
        const viewport = page.getViewport({ scale: scale * dpr });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${viewport.height / dpr}px`;
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', `${doc.title} page ${n}`);
        pages.appendChild(canvas);

        const task = page.render({ canvasContext: canvas.getContext('2d'), viewport });
        // Closing the modal mid-render cancels it; half-drawn canvases are never cached.
        const watcher = setInterval(() => {
          if (id !== session) task.cancel();
        }, 50);
        try {
          await task.promise;
        } finally {
          clearInterval(watcher);
        }
        if (id !== session) return;
        storeCanvas(cacheKey, canvas);
        if (n === 1) status.hidden = true;
      }
    } catch (err) {
      if (id === session) {
        status.hidden = false;
        status.textContent = 'Unable to load the preview. Please contact me for a copy.';
      }
    }
  }

  const open = (key) => {
    const doc = DOCS[key] || DOCS.cv;
    modal.querySelector('.cv-modal__title').textContent = doc.title;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    modal.querySelector('.cv-modal__close').focus();
    pages.replaceChildren();
    renderPdf(++session, doc);
  };

  const close = () => {
    session++;
    modal.hidden = true;
    pages.replaceChildren();
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-doc-open]');
    if (trigger) {
      e.preventDefault();
      open(trigger.dataset.docOpen);
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-cv-close]')) close();
  });

  modal.addEventListener('dragstart', (e) => e.preventDefault());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}
