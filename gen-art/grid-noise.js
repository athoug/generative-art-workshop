const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // generating a random color palette
  const colorCount = random.rangeFloor(1, 6)
  const palette = random.shuffle(random.pick(palettes))
                        .slice(0,colorCount);
  console.log(palette);
  
  const createGrid = () => {
    const points = []; // these are the points
    const count = 30;

    for(let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 :  x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        // instead of the random gaussian radius we'll make a noise function
        // we use the noise2D abd pass the horizontal and vertical coordinates
        const radius = Math.abs(random.noise2D(u, v)) * 0.07;
        // const radius = Math.abs(random.noise2D(u, v));
        points.push({
            color: random.pick(palette),
            radius,
            position: [u, v],
        });
        }
    }

    return points; // we return the points
  };

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // with these points we will loop through each of them
    points.forEach((data) => {
        // destructure the data
        const {
            position,
            radius,
            color,
        } = data;

        const [u, v] = position;

      // we now need to scale them relativly 
      const x = lerp(margin, (width - margin), u);
      const y = lerp(margin, (height - margin), v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false); // we multiplied teh radies by the width to have a relative size based on screen
      context.strokeStyle = 'black';
      context.lineWidth = 20;
      // before you fill, you have to set a fill style
      context.fillStyle = color;
      context.fill();
    });

  };
};

canvasSketch(sketch, settings);
