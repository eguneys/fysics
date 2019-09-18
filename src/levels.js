export const cols = 30;
export const rows = 30;

export function pos2key(pos) {
  return pos[0] + '.' + pos[1];
};

export function key2pos(key) {
  return key.split('.').map(_ => parseInt(_));
}

export function tilePos2worldPos(pos, tileSize) {
  return [pos[0] * tileSize,
          pos[1] * tileSize];
}

export function worldPos2tilePos(worldPos, tileSize) {
  return [Math.floor(worldPos[0] / tileSize),
          Math.floor(worldPos[1] / tileSize)];
}

export const allCols = (() => {
  let res = [];
  for (let i = 0; i < cols; i++) {
    res.push(i);
  }
  return res;
})();

export const allPos = (() => {
  let res = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      res.push([i, j]);
    }
  }
  return res;
})();

export default function LevelGen() {

  let walls = {};

  let seqHeight = 0;

  this.walls = walls;

  this.heroPos = [1, 2];

  const generateMap = () => {

    addFloor(seqHeight);
    addH(seqHeight, 3);

    for (let i = 0; i < 10; i++) {
      addL(0, seqHeight, cols * 0.3);
      addL(cols - cols * 0.3, seqHeight, cols * 0.3);
      addH(seqHeight, 3);

      addL(cols * 0.3, seqHeight, cols * 0.3);
      addH(seqHeight, 3);
    }
  };

  const addH = (y, height) => {
    for (let i = 0; i < height; i++) {
      addWall(0, y + i);
      addWall(cols - 1, y + i);
    }
    seqHeight += height;
  };

  const addL = (x, y, width) => {
    for (let i = 0; i < width; i++) {
      addWall(x + i, y);
    }
  };

  const addFloor = (y) => {
    for (let i = 0; i < cols; i++) {
      addWall(i, y);
    }
  };

  const addWall = (x, y) => {
    let key = pos2key([x, y]);

    walls[key] = {};

  };



  generateMap();


}
