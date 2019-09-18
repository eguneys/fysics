import { objMap } from 'outilz';

export function dimensions(x, y, w, h = w) {
  return {
    left: x,
    top: y,
    right: x + w,
    bottom: y + h,
  };
};

export function sides({ left, right, top, bottom }, tileSize = 40) {
  let q = tileSize * 0.5;
  return {
    left: [[left, top - q],
             [left, bottom + q]],
    right: [[right, top - q],
              [right, bottom + q]],
    top: [[left + q, top],
            [right - q, top]],
    bottom: [[left + q, bottom],
               [right - q, bottom]]
  };
}
