import * as THREE from 'three';

// Szene erstellen
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer erstellen
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Würfel hinzufügen
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Kamera positionieren
camera.position.z = 5;

// Steuerung (WASD + Maus)
const controls = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  lookX: 0,
  lookY: 0
};

// Event-Listener für Bewegung
document.addEventListener('keydown', (event) => {
  if (event.key === 'w') controls.forward = true;
  if (event.key === 's') controls.backward = true;
  if (event.key === 'a') controls.left = true;
  if (event.key === 'd') controls.right = true;
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'w') controls.forward = false;
  if (event.key === 's') controls.backward = false;
  if (event.key === 'a') controls.left = false;
  if (event.key === 'd') controls.right = false;
});

// Event-Listener für Mausbewegung
document.addEventListener('mousemove', (event) => {
  controls.lookX = (event.clientX / window.innerWidth) * 2 - 1;
  controls.lookY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation und Rendering
function animate() {
  requestAnimationFrame(animate);

  // Kamerabewegung
  if (controls.forward) camera.position.z -= 0.1;
  if (controls.backward) camera.position.z += 0.1;
  if (controls.left) camera.position.x -= 0.1;
  if (controls.right) camera.position.x += 0.1;

  // Maussteuerung für Kamera-Rotation
  camera.rotation.x = controls.lookY * Math.PI;
  camera.rotation.y = controls.lookX * Math.PI;

  // Szene rendern
  renderer.render(scene, camera);
}

animate();
