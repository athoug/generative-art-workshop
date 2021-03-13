const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;
ctx.canvas.width  = width;
ctx.canvas.height = height;

// draw shapes
for(let i = 0; i <= height; i++) {
    for (let j = 0; j <= width; j++) {
        ctx.beginPath();
        let x = 25 + j * 50; // x coordinate
        let y = 25 + i * 50; // y coordinate
        let radius = 20; // arc radius
        let startAngle = 0; // Starting point on circle
        let endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
        let anticlockwise = i % 2 == 1; // Draw anticlockwise
        
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        ctx.fillStyle = '#64ffda';
        ctx.strokeStyle = '#64ffda';
        ctx.lineWidth = 4;

        if( Math.random() > 0.5) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
        
    }
}

