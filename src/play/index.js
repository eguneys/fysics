import Hero from './hero';

export default function Play(r) {
  
  let hero = new Hero(this, r);

  hero.init();

  this.update = delta => {

    hero.update(delta);

  };

  this.render = () => {

    r.clear();

    hero.render();

  };

}
