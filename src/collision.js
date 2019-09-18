import { objMap } from 'outilz';

export function dimensions(x, y, w, h = w) {
  return {
    left: x,
    top: y,
    right: x + w,
    bottom: y + h,
  };
};

export function sides({ left, right, top, bottom }) {
  return {
    left: [[left, top],
             [left, bottom]],
    right: [[right, top],
              [right, bottom]],
    top: [[left, top],
            [right, top]],
    bottom: [[left, bottom],
               [right, bottom]]
  };
}
