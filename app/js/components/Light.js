class Lighting extends THREE.Object3D {
  constructor() {
    super();

    let lightDirection = 0;

    let dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.095, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 20 );

    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.radius = 2;

    let d = 100;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 3500;

    this.add(dirLight);
    // this.add(new THREE.DirectionalLightHelper( dirLight, 1 ));

    let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.6 );
    hemiLight.position.set( 0, 4, 0 );
    this.add( hemiLight );
    // this.add( new THREE.HemisphereLightHelper( hemiLight, 1 ) );

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate() {
  }
}

module.exports = Lighting;
