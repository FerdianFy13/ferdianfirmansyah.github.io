export function renderHTML(selector, html) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = html;
}

export function renderList(items, renderFn) {
  return items.map(renderFn).join('');
}

export function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
