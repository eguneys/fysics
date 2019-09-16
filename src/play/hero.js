import Physics from '../physics';

import * as co from 'colourz';

export default function Hero(play, r) {

  const { width, height } = r.data;

  let phy = new Physics();

  const colour = new co.shifter(co.Palette.Blue);

  this.init = () => {
    phy.pos({
      x: width * 0.1,
      y: height * 0.5
    });
  };
  
  
  this.update = delta => {

    phy.update(delta);

  };

  this.render = () => {

    let [w, h] = [40, 40];

    let { x, y } = phy.values();

    r.drawRect(x, y, w, h, colour.css());

  };

}
