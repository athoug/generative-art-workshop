/*
  source 
  https://github.com/mattdesl/workshop-generative-art/blob/master/src/2d/05-grid-konami.js
*/ 

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');


const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const count = 20;
  const characters = '←↑→↓AB'.split('');
  const colorCount = random.rangeFloor(1, 6)
  const palette = random.shuffle(random.pick(palettes))
                        .slice(0,colorCount);
  const background = 'hsl(0, 0%, 96%)';
  
  const createGrid = () => {
    const points = []; // these are the points

    for(let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 :  x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const character = random.pick(characters);
        const radius = Math.abs(random.noise2D(u, v)) * 0.1;

        points.push({
            color: random.pick(palette),
            radius,
            position: [u, v],
            rotation: random.noise2D(u, v),
            character,
        });
        }
    }

    return points; // we return the points
  };

  const points = createGrid().filter(() => random.chance(0.5));

  return ({ context, width, height }) => {
    const margin = width * 0.175;

    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    // with these points we will loop through each of them
    points.forEach((data) => {
        // destructure the data
        const {
            position,
            radius,
            color,
            rotation,
            character,
        } = data;

        const [u, v] = position;

      // we now need to scale them relativly 
      const x = lerp(margin, (width - margin), u);
      const y = lerp(margin, (height - margin), v);

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.translate(x, y);
      // context.rotate(0.65);
      context.rotate(rotation); // instead of harded coded value we can use a variable here
      context.fillText(character, 0, 0); // the readson we changed the position to 0, 0 is because we're translating the canvas to fix rotation issue

      context.restore();
    });

  };
};

canvasSketch(sketch, settings);
