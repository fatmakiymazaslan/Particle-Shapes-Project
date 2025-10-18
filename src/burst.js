import { morphToShape } from './morph.js';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.js';

export function burstEffect(particles, shapeIndex, shapePoints, count, isBurstingFlagSetter) {
  isBurstingFlagSetter(true);
  const positions = particles.geometry.attributes.position.array;
  const velocities = [];
  for (let i = 0; i < count; i++) {
    velocities.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      )
    );
  }

  let frame = 0;
  const totalFrames = 60;

  function animateBurst() {
    frame++;
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    if (frame < totalFrames) {
      requestAnimationFrame(animateBurst);
    } else {
      morphToShape(particles, shapePoints[shapeIndex]);
      isBurstingFlagSetter(false);
    }
  }
  animateBurst();
}
