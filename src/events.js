export default function Events() {
  let state = this.data = {};

  const keysByCode = {
    'Space': 'space',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
  };

  const keys = Object.values(keysByCode);

  this.update = (delta) => {
    keys.forEach(key => {
      if (state[key] || state[key] === 0) {
        state[key] += delta * 0.01;
      }
    });
  };

  this.bindDocument = () => {
    const unbinds = [];

    const onKeyDown = startMove(state);
    const onKeyUp = endMove(state);

    unbinds.push(unbindable(document, 'keydown', onKeyDown));
    unbinds.push(unbindable(document, 'keyup', onKeyUp));

    return () => { unbinds.forEach(_ => _()); };

  };

  function unbindable(el, eventName, callback) {
    el.addEventListener(eventName, callback);
    return () => el.removeEventListener(eventName, callback);
  }

  function startMove(state) {
    function press(key) {
      if (!state[key]) {
        state[key] = 0;
      }
    }
    return function(e) {
      switch(e.code) {
      case 'Space':
        press('space');
        break;
      case 'ArrowUp':
        press('up');
        break;
      case 'ArrowDown':
        press('down');
        break;
      case 'ArrowLeft':
        press('left');
        break;
      case 'ArrowRight':
        press('right');
        break;
      default:
        return;
      }
      e.preventDefault();
    };
  }


  function endMove(state) {
    function release(key) {
      delete state[key];
    }
    return function(e) {
      switch (e.code) {
      case 'Space':
        release('space');
        break;
      case 'ArrowUp':
        release('up');
        break;
      case 'ArrowDown':
        release('down');
        break;
      case 'ArrowLeft':
        release('left');
        break;
      case 'ArrowRight':
        release('right');
        break;
      }
    };
  }
}
