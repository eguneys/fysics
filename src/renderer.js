import Graphics from './graphics';

export default function Renderer(canvas) {

  const { width, height, aspect } = canvas;

  this.data = {
    width,
    height,
    aspect
  };
  
  const g = new Graphics(canvas);

  this.drawRect = (x, y, w, h, color) =>
  g.raw(ctx => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  });


  this.clear = (color = '#ccc') => 
  g.raw(ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);    
  });


}
