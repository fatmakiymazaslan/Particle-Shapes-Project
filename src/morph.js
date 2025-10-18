export function morphToShape(particles, newPts) {
  const positions = particles.geometry.attributes.position.array;
  let frame = 0;
  const totalFrames = 60;

  function animateMorph() {
    frame++;
    for (let i = 0; i < positions.length / 3; i++) {
      const cx = positions[i * 3];
      const cy = positions[i * 3 + 1];
      const cz = positions[i * 3 + 2];
      const tgt = newPts[i];
      positions[i * 3] += (tgt.x - cx) * 0.1;
      positions[i * 3 + 1] += (tgt.y - cy) * 0.1;
      positions[i * 3 + 2] += (tgt.z - cz) * 0.1;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    if (frame < totalFrames) requestAnimationFrame(animateMorph);
  }
  animateMorph();
}
