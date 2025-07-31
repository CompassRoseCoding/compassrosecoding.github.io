var shadeX = -1;
var shadeY = -1;

//initialize rainbow gradient 
function initGradient() {
    const canvas = document.getElementById("gradient_canvas");
    const ctx = canvas.getContext("2d");

    fillGradientCanvas(canvas, ctx)
    circle(ctx, canvas, 5, 5)
    let data = ctx.getImageData(5, 5, 1, 1).data;
    initShade(data)



    canvas.onclick = function (event) {
        coords = getCoords(canvas, event)

        x = Math.floor(coords[0])
        y = Math.floor(coords[1])

        fillGradientCanvas(canvas, ctx);
        circle(ctx, canvas, x, y)
        data = ctx.getImageData(x, y, 1, 1).data;
        shadeX = -1;
        initShade(data);
    }
}

//initialize shade gradient for saturation/value
function initShade(data) {
    const canvas = document.getElementById("shade_canvas");
    const ctx = canvas.getContext("2d");

    color = getRGB(data)

    fillShadeCanvas(canvas, ctx, color);
    if (shadeX === -1) {
        circle(ctx, canvas, 5, 5)
    }
    else {
        circle(ctx, canvas, shadeX, shadeY)
    }

    data = ctx.getImageData(5, 5, 1, 1).data;

    setOutputColor(data)
    setOutputRGB(data)
    setOutputHSL(data)
    setOutputHEX(data)

    canvas.onclick = function (event) {
        coords = getCoords(canvas, event)

        x = coords[0]
        y = coords[1]

        shadeX = x;
        shadeY = y;

        fillShadeCanvas(canvas, ctx, color);
        circle(ctx, canvas, x, y)
        data = ctx.getImageData(x, y, 1, 1).data;

        setOutputColor(data)
        setOutputRGB(data)
        setOutputHSL(data)
        setOutputHEX(data)
    }
}

//set rainbow gradient stops
function fillGradientCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const wth = canvas.width;
    const hgt = canvas.height;

    //create a gradient for the colors- cycle through RBG rainbow
    const grad0 = ctx.createLinearGradient(0, 0, wth, 0);
    grad0.addColorStop(.02, 'rgb(255, 0, 0, 1)');
    grad0.addColorStop(.17, 'rgb(255, 255, 0, 1)');
    grad0.addColorStop(.18, 'rgb(255, 255, 0, 1)');
    grad0.addColorStop(.34, 'rgb(0, 255, 0, 1)');
    grad0.addColorStop(.49, 'rgb(0, 255, 255, 1)');
    grad0.addColorStop(.5, 'rgb(0, 255, 255, 1)');
    grad0.addColorStop(.66, 'rgb(0, 0, 255 , 1)');
    grad0.addColorStop(.81, 'rgb(255, 0, 255 , 1)');
    grad0.addColorStop(.82, 'rgb(255, 0, 255 , 1)');
    grad0.addColorStop(.98, 'rgb(255, 0, 0, 1)');
    grad0.addColorStop(1, 'rgb(255, 0, 0, 1)');

    ctx.fillStyle = grad0;
    ctx.fillRect(0, 0, wth, hgt);
}

//set the two-gradient overlap for the shade canvas
function fillShadeCanvas(canvas, ctx, color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const wth = canvas.width;
    const hgt = canvas.height;

    //gradient for saturation
    const grad1 = ctx.createLinearGradient(10, 0, wth, 0)
    grad1.addColorStop(0, color);
    grad1.addColorStop(1, '#ffffff');

    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, wth, hgt);

    //gradient for brightness
    const grad2 = ctx.createLinearGradient(0, 10, 0, hgt - 5);
    grad2.addColorStop(0, 'rgb(0,0,0,0)');
    grad2.addColorStop(.9, 'rgb(25,25,25,1)');
    grad2.addColorStop(1, 'rgb(0,0,0,1)');

    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, wth, hgt);
}

//create a small circle to highlight selected color
function circle(ctx, canvas, centerX, centerY) {
    let hgt = canvas.getBoundingClientRect().height

    ctx.lineWidth = .02 * hgt;
    ctx.strokeStyle = black;

    ctx.beginPath();
    ctx.arc(centerX, centerY, .05 * hgt, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = white;

    ctx.beginPath();
    ctx.arc(centerX, centerY, .07 * hgt, 0, 2 * Math.PI);
    ctx.stroke();
}

//Convert from html-size canvas coordinates to internal pixel width
function getCoords(canvas, event) {
    let wth = canvas.getBoundingClientRect().width
    let hgt = canvas.getBoundingClientRect().height

    let left = parseInt(canvas.getBoundingClientRect().left);
    let top = parseInt(canvas.getBoundingClientRect().top);

    var canvasX = (parseInt(event.clientX) - left) * (canvas.width / wth);
    var canvasY = (parseInt(event.clientY) - top) * (canvas.height / hgt);

    return [canvasX, canvasY]
}

//find the specified color on the rainbow gradient canvas
function findColorGradient(data) {
    const canvas = document.getElementById("gradient_canvas");
    const ctx = canvas.getContext("2d");
    const wth = canvas.width;
    const hgt = canvas.height;

    const myImageData = ctx.getImageData(0, hgt / 2 - 1, wth, 1);
    const numBytes = myImageData.data.length;

    for (let i = 0; i < numBytes; i = i + 4) {
        if (parseInt(myImageData.data[i]) === parseInt(data[0]) &&
            parseInt(myImageData.data[i + 1]) === parseInt(data[1]) &&
            parseInt(myImageData.data[i + 2]) === parseInt(data[2])) {
            fillGradientCanvas(canvas, ctx);
            circle(ctx, canvas, i / 4, hgt / 2);
            return;
        }
    }
}

//find the specified color on the two shade gradient canvas
function findColorShade(base, data) {
    const canvas = document.getElementById("shade_canvas");
    const ctx = canvas.getContext("2d");

    fillShadeCanvas(canvas, ctx, getRGB(base));

    const wth = canvas.width;
    const hgt = canvas.height;

    const myImageData = ctx.getImageData(0, 0, wth, hgt);
    const numBytes = myImageData.data.length;

    for (let i = 0; i < numBytes; i = i + 4) {
        if (parseInt(myImageData.data[i]) === parseInt(data[0]) &&
            parseInt(myImageData.data[i + 1]) === parseInt(data[1]) &&
            parseInt(myImageData.data[i + 2]) === parseInt(data[2])) {
            circle(ctx, canvas, (i / 4) % wth, (i / 4) / hgt);
            return;
        }
    }

    for (let i = 0; i < numBytes; i = i + 4) {
        if (
            parseInt(myImageData.data[i]) < (parseInt(data[0]) + 10) &&
            parseInt(myImageData.data[i]) > (parseInt(data[0]) - 10) &&
            parseInt(myImageData.data[i + 1]) < (parseInt(data[1]) + 10) &&
            parseInt(myImageData.data[i + 1]) > (parseInt(data[1]) - 10) &&
            parseInt(myImageData.data[i + 2]) < (parseInt(data[2]) + 10) &&
            parseInt(myImageData.data[i + 2]) > (parseInt(data[2]) - 10)
        ) {
            circle(ctx, canvas, (i / 4) % wth, (i / 4) / hgt);
            return;
        }
    }

    if (parseInt(data[0]) < 50 &&
        parseInt(data[1]) < 50 &&
        parseInt(data[2]) < 50) {
        console.log('black')
        circle(ctx, canvas, 10, hgt - 10);
        return;
    }

    //console.log(data)
    console.log('no match')
}