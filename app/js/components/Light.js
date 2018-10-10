export function createLight() {

  var lightGeometry = new THREE.SphereGeometry(0.1);

  var lightMaterial = new THREE.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000
  });

  var light = new THREE.PointLight(0xffffff, 1, 20, 2);
  light.power = 50;
  light.castShadow = true;
  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.heigth = 512;
  light.shadow.radius = 1.5;

  light.add(new THREE.Mesh(lightGeometry, lightMaterial));
  light.position.set(0, 5, 3);

  return light;
}

export function createHemisphereLight() {
  return new THREE.HemisphereLight(0x303F9F, 0x111111, 3);
}
