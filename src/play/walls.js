import { objMap } from 'outilz';
import * as coll from '../collision';
import * as le from '../levels';
import * as co from 'colourz';

export default function Walls(play, r) {

  const { width, height } = r.data;
  const { tileSize } = play.data;

  const colour = new co.shifter(co.Palette.Blue);


  let walls;

  this.init = (levelGen) => {
    walls = levelGen.walls;
  };

  this.update = delta => {

    updateHeroCollisions(delta);

  };

  const updateHeroCollisions = delta => {
    
    const { after } = play.hero.dimensions(delta);

    let tileKeysForSides = objMap(
      coll.sides(after), (_, poss) =>
      poss.map(pos => 
        le.pos2key(le.worldPos2tilePos(pos, tileSize)))
    );

    let collisions = objMap(
      tileKeysForSides, (_, tileKeys) => 
      tileKeys.some(key => walls[key])
    );

    play.hero.updateCollide(delta, collisions);
  };

  this.render = () => {

    le.allPos.forEach(pos => {
      let key = le.pos2key(pos);
      let tile = walls[key];
      if (tile) {
        let [x, y] = le.tilePos2worldPos(pos, tileSize);
        y = height - y - tileSize;
        r.drawRect(x, y, tileSize, tileSize);
      }
    });

  };

}
