const matrix_green = '#00F73F'
const des_cotta = '#86592d';
const des_turq = '#51c8ff'
const des_dusk = '#13a0ec'
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function init() {
    resizeHeader();
    markCurrent('design');
    initGradient();
}

/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function switchOriginal() {
    document.getElementById('header_iframe').src = "../header/header.html";
    document.getElementById('design_css').href = "header/design_style.css";
}

/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function switchModern() {
    document.getElementById('header_iframe').src = "modern/header.html";
    document.getElementById('design_css').href = "modern/modern_style.css";
}

/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function switchRetro() {
    document.getElementById('header_iframe').src = "retro/header.html";
    document.getElementById('design_css').href = "retro/retro_style.css";
}

/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function switchImage() {
    document.getElementById('header_iframe').src = "../header/header.html";
    document.getElementById('design_css').href = "image/image_style.css";
}

/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function changeFontDemo(element) {
    text = document.getElementById('font_example');
    text.style.fontFamily = element.value;
}

//set all the outputs for the color picker
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function setOutputColor(data) {
    let hsl_data = rgb_HSL(data)

    //set the color panels
    let output = document.getElementById('current_color');
    output.style.backgroundColor = getRGB(data);

    //fully saturated color
    output = document.getElementById('orig_color');
    output.style.backgroundColor = getHSL([hsl_data[0], 100, 50]);

    //set the little complimentary color squares
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

//set RGB drop downs
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function setOutputRGB(data) {
    output = document.getElementById('rgb_r');
    output.value = Math.round(data[0])

    output = document.getElementById('rgb_g');
    output.value = Math.round(data[1])

    output = document.getElementById('rgb_b');
    output.value = Math.round(data[2])
}

//set HSL drop downs
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function setOutputHSL(data) {
    let hsl_data = rgb_HSL(data)

    output = document.getElementById('hsl_h');
    output.value = Math.round(hsl_data[0]);

    output = document.getElementById('hsl_s');
    output.value = Math.round(hsl_data[1]);

    output = document.getElementById('hsl_l');
    output.value = Math.round(hsl_data[2]);
}

//set HEX output
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function setOutputHEX(data) {
    let output = document.getElementById('hex_box');
    output.value = "" + decimal_Hex(data[0]) + decimal_Hex(data[1]) + decimal_Hex(data[2]);
}

//make sure that an drop down is within specified parameters (max int is variable)
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function checkSpecMinMax(box_id, max) {
    let box = document.getElementById(box_id);
    if (isNaN(parseInt(box.value))) {
        console.log('illegitimate value');
        box.value = 0;
    }
    else if (box.value > max) {
        box.value = max;
    }
    else if (box.value < 0) {
        box.value = 1;
    }
}

//get the color input from the RGB manual input
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function getRGBInput() {
    checkSpecMinMax("rgb_r", 255)
    let r = document.getElementById("rgb_r").value;

    checkSpecMinMax("rgb_g", 255)
    let g = document.getElementById("rgb_g").value;

    checkSpecMinMax("rgb_b", 255)
    let b = document.getElementById("rgb_b").value;

    let rgb = [r, g, b];
    let hsl = rgb_HSL(rgb);
    let fullSat = getFullSat(rgb);

    setOutputColor(rgb);
    setOutputHSL(rgb);
    setOutputHEX(rgb);

    findColorGradient(fullSat);
    findColorShade(fullSat, rgb);
}

//get the color input from the HSL manual input
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function getHSLInput() {
    checkSpecMinMax("hsl_h", 360)
    let h = parseFloat(document.getElementById("hsl_h").value);

    checkSpecMinMax("hsl_s", 100)
    let s = parseFloat(document.getElementById("hsl_s").value);

    checkSpecMinMax("hsl_l", 100)
    let v = parseFloat(document.getElementById("hsl_l").value);

    let rgb = hsl_RGB([h, s, v]);
    //console.log(rgb)
    let fullSat = getFullSat(rgb);

    setOutputColor(rgb);
    setOutputRGB(rgb);
    setOutputHEX(rgb);

    findColorGradient(fullSat);
    findColorShade(fullSat, rgb);
}

//get the color input from the HEX manual input
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function getHEXInput() {
    let hex = document.getElementById("hex_box").value;

    let rgb = hex_DecimalArr(hex);
    let fullSat = getFullSat(rgb);

    setOutputColor(rgb);
    setOutputRGB(rgb);
    setOutputHSL(rgb);

    findColorGradient(fullSat);
    findColorShade(fullSat, rgb);
}


var shadeX = -1;
var shadeY = -1;

//initialize rainbow gradient 
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function initGradient() {
    const canvas = document.getElementById("gradient_canvas");
    const ctx = canvas.getContext("2d");

    fillGradientCanvas(canvas, ctx)
    circle(ctx, canvas, 5, 5)
    let data = ctx.getImageData(5, 5, 1, 1).data;
    initShade(data)

    canvas.onclick = /**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
        function (event) {
            let coords = getCoords(canvas, event)

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
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
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

    canvas.onclick = /**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
        function (event) {
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
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
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
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function fillShadeCanvas(canvas, ctx, color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const wth = canvas.width;
    const hgt = canvas.height;

    //gradient for saturation
    const grad1 = ctx.createLinearGradient(0, 0, wth, 0)
    grad1.addColorStop(.02, color);
    grad1.addColorStop(.98, '#ffffff');

    //gradient for brightness
    const grad2 = ctx.createLinearGradient(0, 10, 0, hgt - 5);
    grad2.addColorStop(.02, 'rgb(0,0,0,0)');
    grad2.addColorStop(.95, 'rgb(35,35,35,1)');
    grad2.addColorStop(.98, 'rgb(0,0,0,1)');

    //fill the canvas with both gradients
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, wth, hgt);

    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, wth, hgt);
}

//create a small circle to highlight selected color
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function circle(ctx, canvas, centerX, centerY) {
    let hgt = canvas.getBoundingClientRect().height

    ctx.lineWidth = .02 * hgt;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.arc(centerX, centerY, .05 * hgt, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = "white";

    ctx.beginPath();
    ctx.arc(centerX, centerY, .07 * hgt, 0, 2 * Math.PI);
    ctx.stroke();
}

//Convert from html-size canvas coordinates to internal pixel width
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
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
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
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
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
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


//https://www.rapidtables.com/convert/color/rgb-to-hsl.html
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function rgb_HSL(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;

    let cMax = Math.max(r, g, b);
    let cMin = Math.min(r, g, b);
    let delta = cMax - cMin;

    let h = 0;
    let s = 0;
    let l = (cMax + cMin) / 2;

    if (delta !== 0) {
        s = delta / (1 - Math.abs(2 * l - 1));
        if (cMax === r) {
            h = 60 * (((g - b) / delta) % 6);
        }
        else if (cMax === g) {
            h = 60 * (((b - r) / delta) + 2);
        }
        else if (cMax === b) {
            h = 60 * (((r - g) / delta) + 4);
        }
    }

    if (h < 0) {
        h = h + 360;
    }

    return [h, s * 100, l * 100]
}

//https://www.rapidtables.com/convert/color/hsl-to-rgb.html
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function hsl_RGB(hsl) {
    let h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - (c / 2);

    //console.log(c, x, m)

    let rgb = [];

    if (0 <= h && h < 60) {
        rgb = [c, x, 0]
    }
    else if (60 <= h && h < 120) {
        rgb = [x, c, 0]
    }
    else if (120 <= h && h < 180) {
        rgb = [0, c, x]
    }
    else if (180 <= h && h < 240) {
        rgb = [0, x, c]
    }
    else if (240 <= h && h < 300) {
        rgb = [x, 0, c]
    }
    else if (300 <= h && h < 360) {
        rgb = [c, 0, x]
    }

    return [(rgb[0] + m) * 255, (rgb[1] + m) * 255, (rgb[2] + m) * 255]
}


//https://www.rapidtables.com/convert/color/rgb-to-hsv.html
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function rgb_HSV(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;

    let cMax = Math.max(r, g, b);
    let cMin = Math.min(r, g, b);
    let delta = cMax - cMin;

    let hue = 0;

    if (cMax === cMin) {
        hue = 0;
    }
    else if (cMax === r) {
        hue = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax === g) {
        hue = 60 * (((b - r) / delta) + 2);
    }
    else if (cMax === b) {
        hue = 60 * (((r - g) / delta) + 4);
    }

    if (hue < 0) {
        hue = hue + 360;
    }

    let sat = 0;

    if (cMax != 0) {
        sat = delta / cMax * 100;
    }

    let val = cMax * 100;

    return [hue, sat, val];
}


//https://www.rapidtables.com/convert/color/rgb-to-hsv.html
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function hsv_RGB(hsv) {
    //s and v are multiplied by 100
    hsv[1] = hsv[1] / 100;
    hsv[2] = hsv[2] / 100;

    let c = hsv[1] * hsv[2];
    let x = c * (1 - Math.abs((hsv[0] / 60) % 2 - 1));
    let m = hsv[2] - c;

    let rgb_prime = [0, 0, 0]

    if (hsv[0] < 60) {
        rgb_prime = [c, x, 0];
    }
    else if (hsv[0] < 120) {
        rgb_prime = [x, c, 0];
    }
    else if (hsv[0] < 180) {
        rgb_prime = [0, c, x];
    }
    else if (hsv[0] < 240) {
        rgb_prime = [0, x, c];
    }
    else if (hsv[0] < 300) {
        rgb_prime = [x, 0, c];
    }
    else if (hsv[0] < 360) {
        rgb_prime = [c, 0, x];
    }

    let r = Math.round((rgb_prime[0] + m) * 255);
    let g = Math.round((rgb_prime[1] + m) * 255);
    let b = Math.round((rgb_prime[2] + m) * 255);

    return [r, g, b]
}


/**
 * create string that allows RGB coloring of HTML objects out of data array
 * @param none
 * @returns none
*/
function getRGB(data) {
    let colString = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
    return colString
}

/**
 * create string that allows HSV coloring of HTML objects out of data array
 * @param none
 * @returns none
*/
function getHSL(data) {
    let colString = 'hsl(' + data[0] + ',' + data[1] + '%,' + data[2] + '%)';
    return colString
}

//converts decimal to hex
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function decimal_Hex(num) {
    num = Math.round(num)
    hex = num.toString(16)
    //console.log(hex)

    if (hex.length === 1) {
        hex = '0' + hex
    }

    return hex;
}

//converts hex to decimal
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function hex_DecimalArr(num) {
    num = num.slice(0, 6);
    while (num.length < 6) {
        num = num + 1;
    }

    let r = parseInt(num[0] + num[1], 16);
    let g = parseInt(num[2] + num[3], 16);
    let b = parseInt(num[4] + num[5], 16);

    return [r, g, b]
}

//takes an RGB value, converts it to HSV, gets the full saturation/value of the color, converts back to RGB
/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function getFullSat(data) {
    hsv_data = rgb_HSV(data);
    full_sat_data = [hsv_data[0], 100, 100]
    full_sat_rgb = hsv_RGB(full_sat_data);
    return full_sat_rgb;
}


/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function modernCompass() {
    const canvas = document.getElementById("modern_header_canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    modernCircle(ctx, centerY, centerY * .75, .02 * centerY)

    modernStar(ctx, centerY, 45, centerY * .75, .1, .02 * centerY, "white", "black")

    modernStar(ctx, centerY, 0, centerY, .15, .02 * centerY, des_dusk, des_turq)
}

/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function modernStar(ctx, origin, offsetAngle, pointLength, cornerFrac, lineWidth, stroke, fill) {
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


/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function modernCircle(ctx, center, radius, width) {
    ctx.strokeStyle = des_cotta;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.stroke();
}



/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function retroCompass() {
    const canvas = document.getElementById("retro_header_canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    retroStar(ctx, centerY, 45, centerY * .85, .25, .03 * centerY, "black", matrix_green)

    retroCircle(ctx, centerY, centerY * .9, .04 * centerY)

    retroStar(ctx, centerY, 0, centerY, .25, .03 * centerY, "black", matrix_green)
    retroStar(ctx, centerY, 0, centerY * .85, .25, .03 * centerY, matrix_green, "black")
}

/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function retroStar(ctx, origin, offsetAngle, pointLength, cornerFrac, lineWidth, stroke, fill) {
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.beginPath()

        let xPt = pointLength * Math.cos((offsetAngle + 90 * i) * Math.PI / 180) + origin
        let yPt = pointLength * Math.sin((offsetAngle + 90 * i) * Math.PI / 180) + origin

        let xBend = cornerFrac * pointLength * Math.cos(((offsetAngle + 45) + 90 * i) * Math.PI / 180) + origin
        let yBend = cornerFrac * pointLength * Math.sin(((offsetAngle + 45) + 90 * i) * Math.PI / 180) + origin

        ctx.moveTo(origin, origin)

        ctx.lineTo(xBend, yBend)
        ctx.lineTo(xPt, yPt)
        ctx.lineTo(origin, origin)
        ctx.fill()
        //ctx.stroke()

        xBend = cornerFrac * pointLength * Math.cos(((offsetAngle - 45) + 90 * i) * Math.PI / 180) + origin
        yBend = cornerFrac * pointLength * Math.sin(((offsetAngle - 45) + 90 * i) * Math.PI / 180) + origin

        ctx.moveTo(origin, origin)

        ctx.lineTo(xBend, yBend)
        ctx.lineTo(xPt, yPt)
        ctx.lineTo(origin, origin)
        ctx.fill()
        ctx.stroke()
    }
}


/**
 * EXAMPLE_ME
 * @param none
 * @returns none
*/
function retroCircle(ctx, center, radius, width) {
    ctx.strokeStyle = matrix_green;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = "black";
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.arc(center, center, radius + width, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, radius - width, 0, 2 * Math.PI);
    ctx.stroke();
}