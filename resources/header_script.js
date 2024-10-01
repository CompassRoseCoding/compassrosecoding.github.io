// universal custom colors
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

// windows tracker
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-VKT25Q38Q1');

// opens and closes the menu
function dropDown() {
    tabs = document.getElementById("tabs_div")
    arrow = document.getElementById("menu_span")

    if (tabs.style.display == "flex") {
        arrow.style.transform = "rotate(0deg)"
        tabs.style.display = "none"
    }
    else {
        arrow.style.transform = "rotate(90deg)"
        tabs.style.display = "flex"
    }
}

// draw the compass on load
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


// create a star shape with time delay
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


// create a star shape without time delay
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


// create a half circle - two tone
function halfcircleleft(ctx, center, radius, color, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.arc(center, center, radius, Math.PI / 2, Math.PI * 3 / 2);
    ctx.stroke();
}


// create a half circle - two tone
function halfcircleright(ctx, center, radius, color, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.arc(center, center, radius, Math.PI * 3 / 2, Math.PI / 2);
    ctx.stroke();
}