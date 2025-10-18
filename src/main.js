import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.js';
import { rawShapes, getPointsFromGeometry } from './shapes.js';
import { morphToShape } from './morph.js';
import { burstEffect } from './burst.js';

let scene, camera, renderer;
let particles, material;
let shapeIndex = 0;
let mouseX = 0, mouseY = 0;
let hue = 0;
const count = 2000;
let isBursting = false;

const shapePoints = rawShapes.map(shape => getPointsFromGeometry(shape, count));

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const v = shapePoints[shapeIndex][i];
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  document.addEventListener('mousemove', (evt) => {
    mouseX = (evt.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(evt.clientY / window.innerHeight - 0.5) * 2;
  });

  document.addEventListener('wheel', (event) => {
    camera.position.z += event.deltaY * 0.05;
    camera.position.z = Math.max(10, Math.min(200, camera.position.z));
  });

  document.addEventListener('click', () => {
    if (!isBursting) burstEffect(particles, shapeIndex, shapePoints, count, (val) => isBursting = val);
  });

  document.getElementById('changeShape').addEventListener('click', () => {
    shapeIndex = (shapeIndex + 1) % shapePoints.length;
    morphToShape(particles, shapePoints[shapeIndex]);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);
  hue += 0.3;
  if (hue > 360) hue = 0;
  material.color.setHSL(hue / 360, 1, 0.5);

  particles.rotation.x += (mouseY - particles.rotation.x) * 0.05;
  particles.rotation.y += (mouseX - particles.rotation.y) * 0.05;

  renderer.render(scene, camera);
}

init();
animate();
