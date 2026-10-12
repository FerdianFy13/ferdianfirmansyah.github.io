import { config } from '../data/config.js';

const PDFJS_VERSION = '3.11.174';
const PDFJS_BASE = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`;

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
  modal.setAttribute('aria-label', 'Curriculum Vitae preview');
  modal.hidden = true;
  modal.innerHTML = `
    <div class="cv-modal__backdrop"></div>
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

  async function renderPdf(id) {
    status.hidden = false;
    status.textContent = 'Loading…';
    try {
      const pdfjsLib = await loadPdfJs();
      const pdf = await pdfjsLib.getDocument(encodeURI(config.cv)).promise;
      const cssWidth = Math.min(body.clientWidth - 32, 860);
      const dpr = window.devicePixelRatio || 1;

      for (let n = 1; n <= pdf.numPages; n++) {
        if (id !== session) return;
        const page = await pdf.getPage(n);
        const base = page.getViewport({ scale: 1 });
        const scale = cssWidth / base.width;
        const viewport = page.getViewport({ scale: scale * dpr });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${viewport.height / dpr}px`;
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', `Curriculum Vitae page ${n}`);
        pages.appendChild(canvas);

        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        if (n === 1) status.hidden = true;
      }
    } catch (err) {
      if (id === session) {
        status.hidden = false;
        status.textContent = 'Unable to load the preview. Please contact me for a copy.';
      }
    }
  }

  const open = () => {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    modal.querySelector('.cv-modal__close').focus();
    pages.replaceChildren();
    renderPdf(++session);
  };

  const close = () => {
    session++;
    modal.hidden = true;
    pages.replaceChildren();
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-cv-open]')) {
      e.preventDefault();
      open();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-cv-close]')) close();
  });

  modal.addEventListener('dragstart', (e) => e.preventDefault());
}
