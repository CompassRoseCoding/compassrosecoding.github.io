var shadeX = -1;
var shadeY = -1;

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
    }
}

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
    grad2.addColorStop(1, 'rgb(0,0,0,1)');

    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, wth, hgt);
}

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

function setOutputColor(data) {
    let rgb = getRGB(data);
    let hsv_data = rgb_HSV(data)

    let output = document.getElementById('current_color');
    output.style.backgroundColor = rgb;

    output = document.getElementById('orig_color');
    output.style.backgroundColor = getRGB(getFullSat(data));

    output = document.getElementById('rgb_out');
    output.value = data[0] + ', ' + data[1] + ', ' + data[2];

    output = document.getElementById('hsv_out');
    output.value = Math.round(hsv_data[0]) + '%, ' + Math.round(hsv_data[1]) + '%, ' + Math.round(hsv_data[2]) + '%';

    output = document.getElementById('hex_out');
    output.value = "#" + getHex(data[0]) + getHex(data[1]) + getHex(data[2]);

    output = document.getElementById('comp_color1');
    output.style.backgroundColor = getRGB([255 - data[0], 255 - data[1], 255 - data[2]]);

    output = document.getElementById('comp_color2');
    output.style.backgroundColor = getRGB([data[0], 255 - data[1], 255 - data[2]]);

    output = document.getElementById('comp_color3');
    output.style.backgroundColor = getRGB([255 - data[0], data[1], 255 - data[2]]);

    output = document.getElementById('comp_color4');
    output.style.backgroundColor = getRGB([255 - data[0], 255 - data[1], data[2]]);

    output = document.getElementById('comp_color5');
    output.style.backgroundColor = getRGB([255 - data[0], data[1], data[2]]);

    output = document.getElementById('comp_color6');
    output.style.backgroundColor = getRGB([data[0], 255 - data[1], data[2]]);

    output = document.getElementById('comp_color7');
    output.style.backgroundColor = getRGB([data[0], data[1], 255 - data[2]]);

    output = document.getElementById('comp_color8');
    output.style.backgroundColor = getRGB([0, data[1], data[2]]);

    output = document.getElementById('comp_color9');
    output.style.backgroundColor = getRGB([data[0], 0, data[2]]);

    output = document.getElementById('comp_color10');
    output.style.backgroundColor = getRGB([data[0], data[1], 0]);

    output = document.getElementById('comp_color11');
    output.style.backgroundColor = getRGB([0, 0, data[2]]);

    output = document.getElementById('comp_color12');
    output.style.backgroundColor = getRGB([data[0], 0, 0]);
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

function findColor(data) {

}