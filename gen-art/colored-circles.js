const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [2048, 2048],
};

const sketch = () => {
    const createGrid = () => {
        const points = [];
        const grid = 40;

        for (let x = 0; x < grid; x++) {
            for (let y = 0; y < grid; y++) {
                const u = grid <= 1 ? 0.5 : x / (grid - 1);
                const v = grid <= 1 ? 0.5 : y / (grid - 1);
                
                points.push([u, v]);
            }
        }

        return points;
    };

    const points = createGrid().filter(() => random.value() > 0.5);
    const margin = 300;

    return ({context, width, height}) => {
        context.fillStyle = '#C28482';
        context.fillRect(0, 0, width, height);

        points.forEach(([u, v]) => {
            const x = lerp(margin, (width - margin), u);
            const y = lerp(margin, (height - margin), v);

            context.beginPath();
            context.fillStyle = 'white';
            context.arc(x, y, 7, 0, Math.PI * 2, false);
            context.fill();
        });
    };
};

canvasSketch(sketch, settings);
