const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: 'A4',
  units: 'cm',
  orientation: 'landscape',
  pixelsPerInch: 300,
};

const sketch = () => {
  return ({ context, width, height }) => {
    console.log(width, height);
    context.fillStyle = '#0a00b6';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width/2, height/2, width * 0.2, 0, Math.PI * 2, false);
    context.fillStyle = '#9d46ff';
    context.fill();
    context.strokeStyle = '#6200ea';
    context.lineWidth = width * 0.05;
    context.stroke();

  };
};

canvasSketch(sketch, settings);
