let matrix_green = '#00F73F'

function retroCompass() {
    console.log('retroCompass')
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    retroCircle(ctx, centerY, centerY * .75, .02 * centerY)

    retroStar(ctx, centerY, 22.5, centerY * .5, .1, .02 * centerY, matrix_green, black)
    retroStar(ctx, centerY, 67.5, centerY * .5, .1, .02 * centerY, matrix_green, black)
    retroStar(ctx, centerY, 45, centerY * .75, .1, .02 * centerY, matrix_green, black)

    retroStar(ctx, centerY, 0, centerY, .15, .02 * centerY, black, matrix_green)
}

function retroStar(ctx, origin, offsetAngle, pointLength, cornerFrac, lineWidth, stroke, fill) {
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;

        let xBend = cornerFrac * pointLength * Math.cos(((offsetAngle - 45) + 90 * i) * Math.PI / 180) + origin
        let yBend = cornerFrac * pointLength * Math.sin(((offsetAngle - 45) + 90 * i) * Math.PI / 180) + origin

        let xPt = pointLength * Math.cos((offsetAngle + 90 * i) * Math.PI / 180) + origin
        let yPt = pointLength * Math.sin((offsetAngle + 90 * i) * Math.PI / 180) + origin

        ctx.moveTo(origin, origin)

        ctx.lineTo(xBend, yBend)
        ctx.lineTo(xPt, yPt)
        ctx.lineTo(origin, origin)
        ctx.fill()
        ctx.stroke()

        ctx.beginPath()

        xBend = cornerFrac * pointLength * Math.cos(((offsetAngle + 45) + 90 * i) * Math.PI / 180) + origin
        yBend = cornerFrac * pointLength * Math.sin(((offsetAngle + 45) + 90 * i) * Math.PI / 180) + origin

        ctx.lineTo(xBend, yBend)
        ctx.lineTo(xPt, yPt)
        ctx.lineTo(origin, origin)
        ctx.fill()
        ctx.stroke()
    }
}


function retroCircle(ctx, center, radius, width) {
    ctx.strokeStyle = matrix_green;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.stroke();
}