const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const createGrid = () => {
    const points = []; // these are the points
     //this is the grid size (how many accross by how many down)
     // so if we look at the image we will create it's a 5 x 5 so the count is 5
    const count = 40;

    // then we will have a nested for loop 
    // a for loop accross and a for loop down
    for(let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // here is where we want to have the point at each grod point
        // we use a uv coordinate which is basically having the points be in the
        // range from 0 - 1 because it's better to work with that (not sure why yet)

        // to get 0 - 1 we take the x or y value and divide by the grid count 
        const u = count <= 1 ? 0.5 :  x / (count - 1); // we have teh count - 1 for it to be sentered and not skewed to the left
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([u, v]); // we add the points to our points array
      }
    }

    return points; // we return the points
  };

  random.setSeed(10);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  console.log(points);
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // with these points we will loop through each of them
    points.forEach(([u, v]) => {
      // we now need to scale them relativly 
      const x = lerp(margin, (width - margin), u);
      const y = lerp(margin, (height - margin), v);

      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 20;
      context.stroke();
    });

  };
};

canvasSketch(sketch, settings);
