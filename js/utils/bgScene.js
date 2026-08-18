const THREE_CDN = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function initBgScene() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => startScene(canvas), { timeout: 2000 });
  } else {
    setTimeout(() => startScene(canvas), 300);
  }
}

async function startScene(canvas) {
  const THREE = await import(THREE_CDN);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.z = 12;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const STAR_COUNT = 260;
  const positions = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x818cf8,
    size: 0.05,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  };
  resize();
  window.addEventListener('resize', resize);

  let visible = true;
  document.addEventListener('visibilitychange', () => {
    visible = document.visibilityState === 'visible';
  });

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  const animate = () => {
    requestAnimationFrame(animate);
    if (!visible) return;

    stars.rotation.y += 0.0004;
    stars.rotation.x += 0.0001;
    camera.position.y = -scrollY * 0.0015;

    renderer.render(scene, camera);
  };
  animate();

  canvas.classList.add('is-ready');
}
