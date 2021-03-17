const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = 600;
const height = 600;
ctx.canvas.width  = width;
ctx.canvas.height = height;

let row = 0;
let col = 0;
const radius = 20; // arc radius
const color = '#64ffda';
const lineWidth = 4;
const heightSize = height/(radius * 2.5);
const widthSize = width/(radius * 2.5);
const circles = new Array(heightSize).fill(new Array(1));

const createCircle = (rowIndex, columnIndex) => {
    if (row === heightSize) return; // if we reached the end of the canvas usable height, exit

    const x = 25 + columnIndex * 50; // x coordinate
    const y = 25 + rowIndex * 50; // y coordinate
    const startAngle = Math.random() * (Math.PI * 2); // Starting point on circle
    let endAngle = Math.random() * Math.PI + (Math.PI * columnIndex) / 2;
    let anticlockwise = rowIndex % 2 == 1; // Draw anticlockwise
    

    if (col < widthSize) {
        col += 1;
    } else  {
        row += 1;
        col = 0;
    }

    return {
        x,
        y,
        startAngle,
        endAngle,
        anticlockwise,
    };
};

const drawCircle = (rowIndex, colIntex) => {
    const circle = createCircle(rowIndex, colIntex);
    for(let i = 0; i <= heightSize; i++) {
        for (let j = 0; j <= widthSize; j++) {
            console.log(circle);
            ctx.beginPath();
            ctx.arc(
                circle.x, 
                circle.y, 
                radius, 
                circle.startAngle, 
                circle.endAngle, 
                circle.anticlockwise,
            );
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = lineWidth;
        
            if( Math.random() > 0.5) {
                ctx.fill();
            } else {
                ctx.stroke();
            }
        }
    }
    console.log('row', row, 'col', col);
}

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


let x = 0;
let y = 0;

let timerId = setTimeout(function run() {
    drawCircle(row, col);
    setTimeout(run, 100);

    if(row === heightSize) {
        clearTimeout(timerId);
        row = 0;
        col = 0;
        setTimeout(clearCanvas, 100);
    }
}, 100, x, y);

