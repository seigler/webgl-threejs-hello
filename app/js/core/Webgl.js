// import PCSS from '../shaders/PCSS-frag';

export default class Webgl {
  constructor(w, h) {
    this.scene = new THREE.Scene();
    let fogColor = new THREE.Color().setHSL( 0.6, 1, 0.6 );
    this.scene.background = fogColor;
    this.scene.fog = new THREE.Fog(fogColor, 0.0025, 100);

    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    this.camera.position.z = 10;

    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._renderer.gammaInput = true;
    this._renderer.gammaOutput = true;

    this._renderer.shadowMap.enabled = true;
    // this._renderer.shadowMap.type = THREE.BasicShadowMap;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.dom = this._renderer.domElement;

    this.usePostprocessing = true;
    this._passes = [
      new THREE.RenderPass(this.scene, this.camera),
      new THREE.HalftonePass(),
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
    this._controls.minDistance = 3;
    this._controls.maxDistance = 50;
    this._controls.maxPolarAngle = Math.PI / 2;
  }

  initPostprocessing() {
    if (!this.usePostprocessing) return;
    this._composer = new THREE.EffectComposer(this._renderer);
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

    if (this.usePostprocessing) {
      this._renderer.setSize(w, h);
      this._renderer.setPixelRatio(window.devicePixelRatio / 2);
      this._composer.setSize(w/2, h/2);
    } else {
      this._renderer.setSize(w, h);
    }
  }
}
