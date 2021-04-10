const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = ({ width, height }) => {
  const characters = '♠♣♥♦'.split('');
  const palette = random.pick(palettes);
  const bg = palette.shift();
  const counter = 25;
  const margin = width * 0.15;

  const createGrid = () => {
    const points = [];
    const frequency = random.range(0.75, 1.25);

    for (let x = 0; x < counter; x++) {
      for (let y = 0; y < counter; y++) {
        const u = counter < 0 ? 0.5 : x / (counter - 1);
        const v = counter < 0 ? 0.5 : y / (counter - 1);

        const n = random.noise2D(u * frequency, v * frequency);
        const size = n * 0.5 + 0.5;
        const baseSize = width * 0.05;
        const sizeOffset = width * 0.07;

        points.push({
          color: random.pick(palette),
          size: Math.abs(baseSize * size + random.gaussian() * sizeOffset),
          character: random.pick(characters),
          rotation: n * Math.PI * 0.5,
          position: [u, v], 
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
        size, 
        color,
        character,
        rotation,
      } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      
      context.fillStyle = color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = `${size}px Helvetica`;

      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText(character, 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
