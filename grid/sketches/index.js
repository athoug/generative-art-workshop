const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const createGrid = () => {
    const points = [];
    const grid = 5;

    for (let x = 0; x < grid; x++) {
      for (let y = 0; y < grid; y++) {
        const u = grid <= 1 ? 0.5 : x / (grid - 1);
        const v = grid <= 1 ? 0.5 : y / (grid - 1);
        
        points.push([u,v]);
      }
    }

    return points;
  };

  const points = createGrid();
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = '#212121';
    context.fillRect(0, 0, width, height);

    points.forEach(([u,v]) => {
      const x = lerp(margin, (width - margin), u);
      const y = lerp(margin, (height - margin), v);

      context.beginPath();
      context.arc(x, y, width * .025, 0, Math.PI * 2, false);
      context.strokeStyle = '#F5F5F6';
      context.lineWidth = width * .01;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
