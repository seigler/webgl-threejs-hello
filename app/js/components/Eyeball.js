import props from 'js/core/props';

class Eyeball extends THREE.Object3D {
  constructor() {
    super();

    var loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
      // resource URL
      'blue_eyeball/scene.gltf',
      // called when the resource is loaded
      ( gltf ) => {

        this.add( gltf.scene );

        // gltf.animations; // Array<THREE.AnimationClip>
        // gltf.scene; // THREE.Scene
        // gltf.scenes; // Array<THREE.Scene>
        // gltf.cameras; // Array<THREE.Camera>
        // gltf.asset; // Object

      },
      // called while loading is progressing
      ( xhr ) => {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      ( error ) => {

        console.log( { error } );

      }
    );

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate() {
    // this.rotation.x += props.rotation;
    // this.rotation.y += props.rotation;
  }
}

module.exports = Eyeball;
