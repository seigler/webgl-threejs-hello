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

    this.add(this.mesh);
    this.position.z += this.radius / 2 + 0.01;

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate() {
    // this.rotation.x += props.rotation;
    // this.rotation.y += props.rotation;
  }
}

module.exports = Bean;
