const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]', '0.0.0.0'];

function isLocalEnvironment() {
  const { hostname, protocol } = window.location;
  return (
    protocol === 'file:' ||
    LOCAL_HOSTS.includes(hostname) ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.test') ||
    /^(192\.168|10\.)\./.test(hostname)
  );
}

// Blocks right-click and common DevTools / view-source / save / print shortcuts.
// Skipped entirely in local environments so development stays unaffected.
export function initProtection() {
  if (isLocalEnvironment()) return;

  document.addEventListener('contextmenu', (e) => e.preventDefault());

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const mod = e.ctrlKey || e.metaKey;

    const blocked =
      e.key === 'F12' ||
      (mod && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      (mod && ['u', 's', 'p'].includes(key)) ||
      (e.metaKey && e.altKey && ['i', 'j', 'c', 'u'].includes(key));

    if (blocked) e.preventDefault();
  });
}
