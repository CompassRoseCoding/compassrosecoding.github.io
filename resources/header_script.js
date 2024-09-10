const white = '#ffffff'
const black = '#000000'
const red = '#c02a19'
const maroon = '#772e25'
const turq = '#51c8ff'
const dusk = '#13a0ec'
const orange = '#d18f4d'
const tcotta = '#774f28'
const gold = '#deae00';
const bronze = '#725900'
const bg_gray = '#EAEAEA'

async function init() {
    const canvas = document.getElementById("header_canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    halfcircleleft(ctx, centerY, centerY * .75 - (.025 * centerY), tcotta, .05 * centerY)
    halfcircleleft(ctx, centerY, centerY * .75 + (.025 * centerY), orange, .05 * centerY)

    halfcircleright(ctx, centerY, centerY * .75 - (.025 * centerY), orange, .05 * centerY)
    halfcircleright(ctx, centerY, centerY * .75 + (.025 * centerY), tcotta, .05 * centerY)
    
    star(ctx, centerY, 22.5, centerY * .5, .1, gold, bronze)
    star(ctx, centerY, 67.5, centerY * .5, .1, gold, bronze)
    star(ctx, centerY, 45, centerY * .75, .1, red, maroon)

    await animateStar(ctx, centerY, 0, centerY, .15, turq, dusk, 100)
}

async function animateStar(ctx, origin, offsetAngle, pointLength, cornerFrac, col1, col2, wait) {
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = col1;
        ctx.fillStyle = col1;

        let xBend = cornerFrac * pointLength * Math.cos(((offsetAngle - 45) + 90 * i) * Math.PI / 180) + origin
        let yBend = cornerFrac * pointLength * Math.sin(((offsetAngle - 45) + 90 * i) * Math.PI / 180) + origin

        let xPt = pointLength * Math.cos((offsetAngle + 90 * i) * Math.PI / 180) + origin
        let yPt = pointLength * Math.sin((offsetAngle + 90 * i) * Math.PI / 180) + origin

        ctx.moveTo(origin, origin)

        ctx.lineTo(xBend, yBend)
        ctx.lineTo(xPt, yPt)
        ctx.lineTo(origin, origin)
        ctx.stroke()

        await new Promise(resolve => setTimeout(resolve, wait)).then(() => { console.log('wait'); });

        const grad = ctx.createLinearGradient(origin, origin, xPt, yPt);
        grad.addColorStop(0, col1);
        grad.addColorStop(1, col2);

        ctx.fillStyle = grad;
        ctx.fill();

        await new Promise(resolve => setTimeout(resolve, wait)).then(() => { console.log('wait'); });

        ctx.beginPath()
        ctx.fillStyle = col2;

        xBend = cornerFrac * pointLength * Math.cos(((offsetAngle + 45) + 90 * i) * Math.PI / 180) + origin
        yBend = cornerFrac * pointLength * Math.sin(((offsetAngle + 45) + 90 * i) * Math.PI / 180) + origin

        ctx.lineTo(xBend, yBend)
        ctx.lineTo(xPt, yPt)
        ctx.lineTo(origin, origin)
        ctx.stroke()

        ctx.strokeStyle = col2;
        ctx.fill()

        await new Promise(resolve => setTimeout(resolve, wait / 2)).then(() => { console.log('wait'); });
    }
}


function star(ctx, origin, offsetAngle, pointLength, cornerFrac, col1, col2) {
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = tcotta;
        ctx.fillStyle = col1;

        let xBend = cornerFrac * pointLength * Math.cos(((offsetAngle - 45) + 90 * i) * Math.PI / 180) + origin
        let yBend = cornerFrac * pointLength * Math.sin(((offsetAngle - 45) + 90 * i) * Math.PI / 180) + origin

        let xPt = pointLength * Math.cos((offsetAngle + 90 * i) * Math.PI / 180) + origin
        let yPt = pointLength * Math.sin((offsetAngle + 90 * i) * Math.PI / 180) + origin

        ctx.moveTo(origin, origin)

        ctx.lineTo(xBend, yBend)
        ctx.lineTo(xPt, yPt)
        ctx.lineTo(origin, origin)
        ctx.stroke()

        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = col2;

        xBend = cornerFrac * pointLength * Math.cos(((offsetAngle + 45) + 90 * i) * Math.PI / 180) + origin
        yBend = cornerFrac * pointLength * Math.sin(((offsetAngle + 45) + 90 * i) * Math.PI / 180) + origin

        ctx.lineTo(xBend, yBend)
        ctx.lineTo(xPt, yPt)
        ctx.lineTo(origin, origin)
        ctx.stroke()

        ctx.fill()
    }
}

function circle(ctx, center, radius, col1, col2, width) {
    var grad = ctx.createLinearGradient(center - radius, center - radius, center + radius, center + radius);
    grad.addColorStop(0, col1);
    grad.addColorStop(1, col2);

    ctx.strokeStyle = grad;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function halfcircleleft(ctx, center, radius, color, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.arc(center, center, radius, Math.PI / 2, Math.PI * 3 / 2);
    ctx.stroke();
}

function halfcircleright(ctx, center, radius, color, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.arc(center, center, radius, Math.PI * 3 / 2, Math.PI / 2);
    ctx.stroke();
}