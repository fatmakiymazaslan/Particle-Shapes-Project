import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.js';

// 🔹 Küre, Küp, Piramit, Torus (Halka)
export const rawShapes = [
  new THREE.SphereGeometry(10, 64, 64),
  new THREE.BoxGeometry(20, 20, 20, 20, 20, 20),
  new THREE.CylinderGeometry(0, 10, 20, 4, 1, false),
  new THREE.TorusGeometry(10, 2, 16, 100) // halka
];

// Geometriyi rastgele noktalara çevir
export function getPointsFromGeometry(geometry, count = 2000) {
  const nonIndexed = geometry.toNonIndexed();
  const posAttr = nonIndexed.attributes.position;
  const vertices = [];
  const totalTriangles = posAttr.count / 3;

  for (let i = 0; i < count; i++) {
    const tri = Math.floor(Math.random() * totalTriangles) * 3;
    const vA = new THREE.Vector3(
      posAttr.getX(tri),
      posAttr.getY(tri),
      posAttr.getZ(tri)
    );
    const vB = new THREE.Vector3(
      posAttr.getX(tri + 1),
      posAttr.getY(tri + 1),
      posAttr.getZ(tri + 1)
    );
    const vC = new THREE.Vector3(
      posAttr.getX(tri + 2),
      posAttr.getY(tri + 2),
      posAttr.getZ(tri + 2)
    );

    const r1 = Math.random();
    const r2 = Math.random();
    const sqrtR1 = Math.sqrt(r1);

    const point = new THREE.Vector3()
      .add(vA.clone().multiplyScalar(1 - sqrtR1))
      .add(vB.clone().multiplyScalar(sqrtR1 * (1 - r2)))
      .add(vC.clone().multiplyScalar(sqrtR1 * r2));

    vertices.push(point);
  }
  return vertices;
}
