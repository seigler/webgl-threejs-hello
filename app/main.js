import Webgl from 'js/core/Webgl';
import loop from 'js/core/Loop';
import props from 'js/core/props';
import Bean from 'js/components/Bean';
import Ground from 'js/components/Ground';
import Clouds from 'js/components/Clouds';
import Light from 'js/components/Light';

// ##
// INIT
const webgl = new Webgl(window.innerWidth, window.innerHeight);
document.body.appendChild(webgl.dom);
// - Add object update to loop
loop.add(webgl.onUpdate);

// ##
// GUI
const gui = new dat.GUI();
gui.add(props, 'cloudSpeed', -1, 1);
gui.close();

webgl.add(new Ground());

const clouds = new Clouds();
webgl.add(clouds);
loop.add(clouds.onUpdate);

const light = new Light();
webgl.add(light);
loop.add(light.onUpdate);

// ##
// EXAMPLE BOX
const bean = new Bean();
webgl.add(bean);
loop.add(bean.onUpdate);

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
