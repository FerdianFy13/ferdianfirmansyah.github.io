// Lightweight image preview modal for award / certificate photos.
// The image URL is only assigned to <img src> when the modal opens, so nothing
// is downloaded until the visitor asks for it. Reuses the .cv-modal styles.

export function initImageModal() {
  const modal = document.createElement('div');
  modal.className = 'cv-modal cv-modal--image';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Certificate preview');
  modal.innerHTML = `
    <div class="cv-modal__backdrop" data-img-close></div>
    <div class="cv-modal__dialog">
      <div class="cv-modal__header">
        <span class="cv-modal__title"></span>
        <button type="button" class="cv-modal__close" data-img-close aria-label="Close preview">&times;</button>
      </div>
      <div class="cv-modal__body">
        <p class="cv-modal__status" role="status">Loading…</p>
        <img class="cv-modal__image" alt="" decoding="async" draggable="false" hidden>
      </div>
      <p class="cv-modal__note">Preview only.</p>
    </div>
  `;
  document.body.appendChild(modal);

  const title = modal.querySelector('.cv-modal__title');
  const status = modal.querySelector('.cv-modal__status');
  const img = modal.querySelector('.cv-modal__image');
  const closeBtn = modal.querySelector('.cv-modal__close');
  let lastFocus = null;

  img.addEventListener('load', () => {
    status.hidden = true;
    img.hidden = false;
  });

  img.addEventListener('error', () => {
    if (!img.getAttribute('src')) return; // fired by close(), ignore
    status.textContent = 'Unable to load the image.';
    status.hidden = false;
  });

  const open = (src, name) => {
    lastFocus = document.activeElement;
    title.textContent = name;
    img.alt = name;
    img.hidden = true;
    status.textContent = 'Loading…';
    status.hidden = false;
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    closeBtn.focus();
    img.src = src; // lazy: the request starts here, not on page load
  };

  const close = () => {
    modal.hidden = true;
    img.removeAttribute('src');
    img.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-image-open]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger.dataset.imageOpen, trigger.dataset.imageTitle || 'Certificate');
  });

  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-img-close]')) close();
  });

  modal.addEventListener('dragstart', (e) => e.preventDefault());

  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') close();
    // Keep keyboard focus inside the dialog (close button is its only control)
    if (e.key === 'Tab') {
      e.preventDefault();
      closeBtn.focus();
    }
  });
}
