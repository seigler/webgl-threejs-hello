export default class Webgl {
  constructor(w, h) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    this.camera.position.z = 10;

    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setClearColor(0x0c171a);
    this._renderer.gammaInput = true;
    this._renderer.gammaOutput = true;
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.bias = -0.0001;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.dom = this._renderer.domElement;

    this.usePostprocessing = true;
    this._passes = [
      new THREE.RenderPass(this.scene, this.camera),
      // new THREE.SMAAPass(),
    ];
    this.initPostprocessing();
    this.onResize(w, h);

    this.onUpdate = this.onUpdate.bind(this);
    this.onResize = this.onResize.bind(this);

    this._controls = new THREE.OrbitControls(this.camera, this._renderer.domElement);
    //this._controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    this._controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this._controls.dampingFactor = 0.25;
    this._controls.screenSpacePanning = false;
    this._controls.minDistance = 10;
    this._controls.maxDistance = 200;
    this._controls.maxPolarAngle = Math.PI / 2;
  }

  initPostprocessing() {
    if (!this.usePostprocessing) return;
    this._composer = new THREE.EffectComposer(this._renderer);
    let ssaoShader = THREE.SSAOShader;
    ssaoShader.uniforms.onlyAO = true;
    this._passes.forEach((effect, i) => {
      if (i == this._passes.length - 1) {
        effect.renderToScreen = true;
      }
      this._composer.addPass(effect);
    });
  }

  add(mesh) {
    this.scene.add(mesh);
  }

  onUpdate() {
    this._controls.update();
    if (this.usePostprocessing) {
      this._composer.render(this.scene, this.camera);
    } else {
      this._renderer.render(this.scene, this.camera);
    }
  }

  onResize(w, h) {
    this.width = w;
    this.height = h;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this._renderer.setSize(w, h);
    if (this.usePostprocessing) {
      this._composer.setSize(w, h);
    }
  }
}
