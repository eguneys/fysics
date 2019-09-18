import LevelGen from '../levels';

import Hero from './hero';
import Walls from './walls';

export default function Play(r, e) {

  this.data = {
    tileSize: 30
  };
  
  let levelGen = new LevelGen();

  let hero = this.hero = new Hero(this, r);
  let walls = this.walls = new Walls(this, r);

  hero.init(levelGen);
  walls.init(levelGen);

  this.update = delta => {
    hero.update(delta);
    hero.updateMovement(delta, e.data);

    walls.update(delta);
  };

  this.render = () => {

    r.clear();

    walls.render();
    hero.render();

  };

}
