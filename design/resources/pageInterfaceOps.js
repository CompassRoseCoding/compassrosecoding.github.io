//set all the outputs for the color picker
function setOutputColor(data) {
    //set the color panels
    let output = document.getElementById('current_color');
    output.style.backgroundColor = getRGB(data);

    output = document.getElementById('orig_color');
    output.style.backgroundColor = getRGB(getFullSat(data));

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
function setOutputRGB(data) {
    output = document.getElementById('rgb_r');
    output.value = data[0]

    output = document.getElementById('rgb_g');
    output.value = data[1]

    output = document.getElementById('rgb_b');
    output.value = data[2]
}

//set HSV drop downs
function setOutputHSV(data) {
    let hsv_data = rgb_HSV(data)

    output = document.getElementById('hsv_h');
    output.value = Math.round(hsv_data[0]);

    output = document.getElementById('hsv_s');
    output.value = Math.round(hsv_data[1]);

    output = document.getElementById('hsv_v');
    output.value = Math.round(hsv_data[2]);
}

//set HEX output
function setOutputHEX(data) {
    let output = document.getElementById('hex_box');
    output.value = "" + decimal_Hex(data[0]) + decimal_Hex(data[1]) + decimal_Hex(data[2]);
}

//make sure that an drop down is within specified parameters (max int is variable)
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
function getRGBInput() {
    checkSpecMinMax("rgb_r", 255)
    let r = document.getElementById("rgb_r").value;

    checkSpecMinMax("rgb_g", 255)
    let g = document.getElementById("rgb_g").value;

    checkSpecMinMax("rgb_b", 255)
    let b = document.getElementById("rgb_b").value;

    let rgb = [r, g, b];
    let fullSat = getFullSat(rgb);

    setOutputColor(rgb);
    setOutputHSV(rgb);
    setOutputHEX(rgb);

    findColorGradient(fullSat);
    findColorShade(fullSat, rgb);
}

//get the color input from the HSV manual input
function getHSVInput() {
    checkSpecMinMax("hsv_h", 360)
    let h = document.getElementById("hsv_h").value;

    checkSpecMinMax("hsv_s", 100)
    let s = document.getElementById("hsv_s").value;

    checkSpecMinMax("hsv_v", 100)
    let v = document.getElementById("hsv_v").value;

    let rgb_ver = hsv_RGB([h, s, v]);
    let fullSat = hsv_RGB([h, 100, 100]);

    setOutputColor(rgb_ver);
    setOutputRGB(rgb_ver);
    setOutputHEX(rgb_ver);

    findColorGradient(fullSat);
    findColorShade(fullSat, rgb_ver);
}

//get the color input from the HEX manual input
function getHEXInput() {
    let hex = document.getElementById("hex_box").value;

    let rgb = hex_DecimalArr(hex);
    let fullSat = getFullSat(rgb);

    setOutputColor(rgb);
    setOutputRGB(rgb);
    setOutputHSV(rgb);

    findColorGradient(fullSat);
    findColorShade(fullSat, rgb);
}