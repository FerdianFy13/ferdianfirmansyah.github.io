const THREE_CDN = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  const hero = document.getElementById('hero');
  if (!canvas || !hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        observer.disconnect();
        startScene(canvas, hero);
      }
    });
  }, { threshold: 0.05 });

  observer.observe(hero);
}

function createNode(THREE, { geometryFactory, wireColor, coreColor, dustColor, spinSign }) {
  const group = new THREE.Group();

  const outerGeometry = geometryFactory(1.7, 1);
  const outerMaterial = new THREE.MeshBasicMaterial({
    color: wireColor,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
  group.add(outerMesh);

  const coreGeometry = geometryFactory(1.1, 1);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: coreColor,
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(coreMesh);

  const ringGeometry = new THREE.TorusGeometry(2.3, 0.01, 8, 80);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: wireColor,
    transparent: true,
    opacity: 0.32,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2.4;
  ring.rotation.y = 0.3 * spinSign;
  group.add(ring);

  const DUST_COUNT = 34;
  const dustPositions = new Float32Array(DUST_COUNT * 3);
  for (let i = 0; i < DUST_COUNT; i++) {
    const radius = 2.5 + Math.random() * 1.3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    dustPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    dustPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    dustPositions[i * 3 + 2] = radius * Math.cos(phi);
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMaterial = new THREE.PointsMaterial({
    color: dustColor,
    size: 0.04,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true,
  });
  const dust = new THREE.Points(dustGeometry, dustMaterial);
  group.add(dust);

  return {
    group, outerMesh, outerMaterial, coreMesh, coreMaterial, ring, dust,
    spinSign,
    baseX: 0,
    baseY: 0,
    phase: Math.random() * Math.PI * 2,
    proximity: 0,
  };
}

async function startScene(canvas, hero) {
  const THREE = await import(THREE_CDN);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const rightNode = createNode(THREE, {
    geometryFactory: (r, d) => new THREE.IcosahedronGeometry(r, d),
    wireColor: 0x818cf8,
    coreColor: 0x6366f1,
    dustColor: 0xa5b4fc,
    spinSign: 1,
  });
  const leftNode = createNode(THREE, {
    geometryFactory: (r, d) => new THREE.DodecahedronGeometry(r, d),
    wireColor: 0x6366f1,
    coreColor: 0x818cf8,
    dustColor: 0xc7d2fe,
    spinSign: -1,
  });
  scene.add(rightNode.group, leftNode.group);
  const nodes = [rightNode, leftNode];

  // Connector beam + traveling pulse linking the two nodes
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(), new THREE.Vector3(),
  ]);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x818cf8,
    transparent: true,
    opacity: 0.18,
  });
  const connector = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(connector);

  const pulseGeometry = new THREE.IcosahedronGeometry(0.055, 0);
  const pulseMaterial = new THREE.MeshBasicMaterial({
    color: 0xc7d2fe,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
  scene.add(pulse);

  let desktop = window.innerWidth > 992;
  const applyLayout = () => {
    desktop = window.innerWidth > 992;

    rightNode.baseX = desktop ? 3.1 : 1.3;
    rightNode.baseY = desktop ? 0.2 : -1.7;
    leftNode.baseX = desktop ? -3.1 : -1.3;
    leftNode.baseY = desktop ? -0.1 : -1.7;

    const scale = desktop ? 1 : 0.42;
    rightNode.group.scale.setScalar(scale);
    leftNode.group.scale.setScalar(scale);

    connector.visible = true;
    pulse.visible = true;
  };
  applyLayout();

  const pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth) - 0.5;
    pointer.y = (event.clientY / window.innerHeight) - 0.5;
  }, { passive: true });

  const resize = () => {
    const { clientWidth, clientHeight } = hero;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight, false);
    applyLayout();
  };
  resize();
  window.addEventListener('resize', resize);

  let visible = true;
  document.addEventListener('visibilitychange', () => {
    visible = document.visibilityState === 'visible';
  });
  const inViewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { visible = entry.isIntersecting; });
  }, { threshold: 0 });
  inViewObserver.observe(hero);

  const projected = new THREE.Vector3();

  const updateNode = (node, elapsed) => {
    const driftAmount = desktop ? 0.3 : 0.14;
    node.group.position.x = node.baseX + Math.sin(elapsed * 0.6 + node.phase) * driftAmount;
    node.group.position.y = node.baseY + Math.sin(elapsed * 0.9 + node.phase) * (driftAmount * 0.6) + pointer.y * -0.15;
    node.group.position.z = Math.cos(elapsed * 0.5 + node.phase) * (driftAmount * 0.5);

    node.group.rotation.y += 0.002 * node.spinSign;
    node.group.rotation.x += 0.0008;
    node.coreMesh.rotation.y -= 0.001 * node.spinSign;
    node.ring.rotation.z += 0.0016 * node.spinSign;
    node.dust.rotation.y += 0.0008 * node.spinSign;

    projected.copy(node.group.position).project(camera);
    const screenX = (projected.x + 1) / 2;
    const screenY = (-projected.y + 1) / 2;
    const dist = Math.hypot(pointer.x + 0.5 - screenX, pointer.y + 0.5 - screenY);
    const targetProximity = desktop ? Math.max(0, 1 - dist * 3) : 0;
    node.proximity += (targetProximity - node.proximity) * 0.08;

    const glow = node.proximity;

    const breathe = 1 + Math.sin(elapsed + node.phase) * 0.03 + glow * 0.12;
    node.coreMesh.scale.setScalar(breathe);
    node.coreMaterial.opacity = 0.12 + glow * 0.35;
    node.outerMaterial.opacity = 0.5 + glow * 0.3;
    node.ring.scale.setScalar(1 + glow * 0.08);
  };

  let elapsed = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    if (!visible) return;

    elapsed += 0.012;

    nodes.forEach((node) => updateNode(node, elapsed));

    // Connector beam follows both nodes; traveling pulse ping-pongs between them
    const positions = connector.geometry.attributes.position;
    positions.setXYZ(0, leftNode.group.position.x, leftNode.group.position.y, leftNode.group.position.z);
    positions.setXYZ(1, rightNode.group.position.x, rightNode.group.position.y, rightNode.group.position.z);
    positions.needsUpdate = true;

    const t = (Math.sin(elapsed * 0.7) + 1) / 2;
    pulse.position.lerpVectors(leftNode.group.position, rightNode.group.position, t);
    const pulseGlow = Math.max(leftNode.proximity, rightNode.proximity);
    pulseMaterial.opacity = 0.6 + pulseGlow * 0.4;
    connector.visible = desktop;
    pulse.visible = desktop;

    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  };
  animate();

  canvas.classList.add('hero__canvas--ready');
}
