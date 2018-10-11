import props from 'js/core/props';

class Ground extends THREE.Object3D {
  constructor() {
    super();

    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x050505 });
    material.color.setHSL(0.095, 0.4, 0.5);
    const geometry = new THREE.PlaneBufferGeometry(10000, 10000);
    let mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.x = -Math.PI/2;
    mesh.position.y = -1;
    mesh.receiveShadow = true;

    this.add(mesh);
  }
}

module.exports = Ground;
