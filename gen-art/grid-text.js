const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

// if you like an image and want to know how to generate it
// matt uses this approach
const randomSeed = random.getRandomSeed();
random.setSeed(randomSeed);
console.log(random.getSeed());
// or I can use the suffix prop that comes with this
// library, so when I save the image I get the suffix and know the seed value


const settings = {
  suffix: randomSeed,
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
    const count = 40;

    for(let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 :  x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        // instead of the random gaussian radius we'll make a noise function
        // we use the noise2D abd pass the horizontal and vertical coordinates
        const radius = Math.abs(random.noise2D(u, v)) * 0.1;
        // const radius = Math.abs(random.noise2D(u, v));
        points.push({
            color: random.pick(palette),
            radius,
            position: [u, v],
            rotation: random.noise2D(u, v),
        });
        }
    }

    return points; // we return the points
  };

  const points = createGrid().filter(() => random.value() > 0.1);
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
            rotation,
        } = data;

        const [u, v] = position;

      // we now need to scale them relativly 
      const x = lerp(margin, (width - margin), u);
      const y = lerp(margin, (height - margin), v);

    
      context.save();
      context.fillStyle = color;
      // to have a dynamic size we use a template string for radius, we multiply it by the width becuase the size is small
      context.font = `${radius * width}px "Helvetica"`;
      // so canvas is a state based meaning it remembers the last rotate value and here it ads 1 to the previouson
      // to solve this state based memory we can use the canvas .save() and .restore() methods
      // another issue the the pivot point of the rotation we need to move it to trotate around itself instread of the canvas
      // we fix it with translate
      context.translate(x, y);
      // context.rotate(0.65);
      context.rotate(rotation); // instead of harded coded value we can use a variable here
      context.fillText('<', 0, 0); // the readson we changed the position to 0, 0 is because we're translating the canvas to fix rotation issue

      context.restore();
    });

  };
};

canvasSketch(sketch, settings);
