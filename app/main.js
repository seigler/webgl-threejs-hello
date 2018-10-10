import Webgl from 'js/core/Webgl';
import loop from 'js/core/Loop';
import props from 'js/core/props';
import Eyeball from 'js/components/Eyeball';
import { createLight, createHemisphereLight } from 'js/components/Light';

// ##
// INIT
const webgl = new Webgl(window.innerWidth, window.innerHeight);
document.body.appendChild(webgl.dom);
// - Add object update to loop
loop.add(webgl.onUpdate);

// ##
// GUI
const gui = new dat.GUI();
gui.add(props, 'rotation', 0.01, 1);
gui.close();

// ##
// EXAMPLE LIGHT
webgl.add(createLight());
webgl.add(createHemisphereLight());

// ##
// EXAMPLE BOX
const eyeball = new Eyeball();
webgl.add(eyeball);
loop.add(eyeball.onUpdate);

// ##
// RENDERER
loop.start();


// ##
// ON RESIZE / ORIENTATION CHANGE
function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  webgl.onResize(w, h);
}

window.addEventListener('resize', onResize);
window.addEventListener('orientationchange', onResize);
