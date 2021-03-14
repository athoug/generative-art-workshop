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
const heightSize = height/radius;
const widthSize = width/radius;
const circles = new Array(heightSize).fill(new Array(1));

const createCircle = (rowIndex, columnIndex) => {
    if (row === heightSize) return; // if we reached the end of the canvas usable height, exit

    const x = 25 + columnIndex * 50; // x coordinate
    const y = 25 + rowIndex * 50; // y coordinate
    const startAngle = Math.random() * (Math.PI * 2); // Starting point on circle
    let endAngle = Math.PI + (Math.PI * columnIndex) / 2;
    let anticlockwise = rowIndex % 2 == 1; // Draw anticlockwise
    
    circles[row][col] = {
        x,
        y,
        startAngle,
        endAngle,
        anticlockwise,
    };
    

    if (col < widthSize) {
        col += 1;
    } else  {
        row += 1;
        col = 0;
    }
};

const drawCircle = (rowIndex, colIntex) => {
    createCircle(rowIndex, colIntex);
    ctx.beginPath();
    ctx.arc(
        circles[rowIndex][colIntex].x, 
        circles[rowIndex][colIntex].y, 
        radius, 
        circles[rowIndex][colIntex].startAngle, 
        circles[rowIndex][colIntex].endAngle, 
        circles[rowIndex][colIntex].anticlockwise,
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

// draw shapes
const renderCircles = () => {
    for(let i = 0; i <= heightSize; i++) {
        for (let j = 0; j <= widthSize; j++) {
            
            if (i < heightSize) {
                drawCircle(i, j);
                
            } else {
                console.log('should end here');
                break;
            }
        }
        console.log('circles', circles);
    }
}


renderCircles();
