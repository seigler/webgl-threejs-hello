import props from 'js/core/props';
// import depthShaderFrag from 'js/shaders/depthShader-frag';
// import depthShaderVert from 'js/shaders/depthShader-vert';

class Clouds extends THREE.Object3D {
  constructor() {
    super();

    let loader = new THREE.TextureLoader();
    this.cloudTexture = loader.load('textures/clouds.png');
    this.cloudTexture.wrapS = this.cloudTexture.wrapT = THREE.RepeatWrapping;
    this.cloudTexture.repeat.set(3, 3);

    this.material = new THREE.MeshBasicMaterial({
      map: this.cloudTexture,
      transparent: true,
      side: THREE.DoubleSide,
    });
    let geometry = new THREE.PlaneBufferGeometry(200, 200);
    let mesh = new THREE.Mesh(geometry, this.material);

    mesh.customDepthMaterial = new THREE.MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking,
      map: this.cloudTexture,
      alphaTest: 0.3
    });

    mesh.rotation.x = -Math.PI/2;
    mesh.position.y = 10;
    mesh.castShadow = true;

    this.add(mesh);

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(time) {
    this.cloudTexture.offset.x = (time / 1000) % 200;
    this.cloudTexture.offset.y = (time / 5000) % 400;
  }
}

module.exports = Clouds;
