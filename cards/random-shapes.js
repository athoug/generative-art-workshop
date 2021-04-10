const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const palette = random.pick(palettes);
const bg = palette.shift();
const margin = 350;
const counter = 20;

const sketch = () => {
  const createGrid = () => {
    const points = [];
    for (let x = 0; x < counter; x++) {
      for (let y = 0; y < counter; y++) {
        const u = counter <=1 ? 0.5 : x / (counter - 1);
        const v = counter <=1 ? 0.5 : y / (counter - 1);
        const radius = random.value() * 0.4;
        points.push({
          position: [u, v], 
          color: random.pick(palette),
          radius,
        });
      }
    }

    return points;
  }

  const points = createGrid().filter(() => Math.random() > 0.75);

  return ({ context, width, height }) => {
    context.fillStyle = bg;
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position, 
        radius, 
        color,
      } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.fillStyle = color;
      context.arc(x, y, 5, 0, Math.PI * 2);
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
