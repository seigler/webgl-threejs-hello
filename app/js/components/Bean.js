import props from 'js/core/props';

class Bean extends THREE.Object3D {
  constructor() {
    super();

    this.radius = 1;
    const material = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
    });
    const geometry = new THREE.SphereGeometry(this.radius, 20, 20);

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.add(this.mesh);
    this.position.z += this.radius / 2 + 0.01;

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(time) {
    this.position.y = 0.01 * Math.sin(Math.PI * 2 * time / 20) + 0.01 * Math.sin(Math.PI * 2 * time / 70);
    this.position.x = 0.1 * Math.sin(Math.PI * 2 * time / 5300);
    this.position.z = 0.1 * Math.cos(Math.PI * 2 * time / 5300);
  }
}

module.exports = Bean;
