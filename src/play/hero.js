import * as m from 'mutilz';
import Physics from '../physics';
import Ticker from '../ticker';

import * as le from '../levels';

import * as coll from '../collision';

import * as co from 'colourz';

export default function Hero(play, r) {

  const { width, height } = r.data;
  const { tileSize } = play.data;

  let heroWidth = tileSize,
      heroHeight = heroWidth;

  const phy = new Physics();

  const colour = new co.shifter(co.Palette.Blue);

  let physicsUpdate,
      grounded,
      groundedTop;

  this.init = (levelGen) => {
    let [x, y] = le.tilePos2worldPos(levelGen.heroPos, tileSize);

    phy.pos({ x, y });
  };
  
  this.update = delta => {

    if (physicsUpdate) {
      phy.applyUpdate(physicsUpdate);
    }

  };

  this.updateCollide = (delta, collisions) => {
    physicsUpdate = phy.calculateUpdate(delta, collisions);
    grounded = collisions.top;
    groundedTop = collisions.bottom;
  };


  let facing = 1;
  let previousUp;

  let dashUsed = false,
      dashDir = 0,
      dashTicker = new Ticker();

  this.updateMovement = (delta, e) => {
    let speed = phy.gravityY() * -1;

    let hSpeed = phy.gravityY();

    if (!grounded) {
      hSpeed *= 0.5;
    } else {
      dashUsed = false;
    }

    dashTicker.update(delta);

    if (e.up) {

      if (!dashUsed) {
        if (!previousUp && !grounded) {
          dashUsed = true;
          dashDir = facing;
          dashTicker.start();
        } else {
          phy.force({ y: speed * 2.5 * (1 - m.smoothstep(1, 3, e.up)) });
        }
      }

      previousUp = e.up;
    } else {
      previousUp = undefined;
      phy.force({ y: -speed *0.3 });
    }

    if (e.right) {
      facing = 1;
      phy.force({ x: -hSpeed });
    } else if (e.left) {
      facing = -1;
      phy.force({ x: hSpeed });
    } else {
      phy.force({ x: 0 });
    }

    if (dashTicker.running()) {
      if (dashTicker.value() > 0.4) {
        dashTicker.stop();
      }
      phy.force({ y: speed , x: dashDir * speed * 3.5 });
    }
  };


  this.dimensions = delta => {
    const { pos: afterPos } = phy.calculateUpdate(delta);

    const pos = phy.values(),
          posAfter = phy.values(afterPos);

    return {
      before: coll.dimensions(pos.x, pos.y, heroWidth, heroHeight),
      after: coll.dimensions(posAfter.x, posAfter.y, heroWidth, heroHeight)
    };
  };

  this.render = () => {

    let { x, y } = phy.values();

    y = height - y - tileSize;

    r.drawRect(x, y, heroWidth, heroHeight, colour.css());

  };

}
