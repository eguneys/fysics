import Loop from 'loopz';
import Events from './events';
import Canvas from './canvas';
import Renderer from './renderer';
import Play from './play';

export function app(element, options) {

  const events = new Events();
  events.bindDocument();

  const canvas = new Canvas(element);

  const renderer = new Renderer(canvas);

  const play = new Play(renderer);

  new Loop(delta => {
    events.update(delta);
    play.update(delta);
    play.render();
  }, 60).start();

}
