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

    this.cloudShadow = loader.load('textures/clouds-dithered.png');
    this.cloudShadow.wrapS = this.cloudShadow.wrapT = THREE.RepeatWrapping;
    this.cloudShadow.magFilter = THREE.NearestFilter;
    this.cloudShadow.repeat.set(3, 3);

    this.material = new THREE.MeshBasicMaterial({
      map: this.cloudTexture,
      transparent: true,
      side: THREE.DoubleSide,
    });
    let geometry = new THREE.PlaneBufferGeometry(200, 200);
    let mesh = new THREE.Mesh(geometry, this.material);

    mesh.customDepthMaterial = new THREE.MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking,
      map: this.cloudShadow,
      alphaTest: 0.25
    });

    mesh.rotation.x = -Math.PI/2;
    mesh.position.y = 15;
    mesh.castShadow = true;

    this.add(mesh);

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(time) {
    this.cloudTexture.offset.x = (props.cloudSpeed / 1000 * time) % 200;
    this.cloudTexture.offset.y = (props.cloudSpeed / 5000 * time) % 400;
    this.cloudShadow.offset.x = (props.cloudSpeed / 1000 * time) % 200;
    this.cloudShadow.offset.y = (props.cloudSpeed / 5000 * time) % 400;
  }
}

module.exports = Clouds;
