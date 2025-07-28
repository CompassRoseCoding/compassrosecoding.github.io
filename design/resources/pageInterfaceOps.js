//set all the outputs for the color picker
function setOutputColor(data) {
    let rgb = getRGB(data);
    let hsv_data = rgb_HSV(data)

    //set the color panels
    let output = document.getElementById('current_color');
    output.style.backgroundColor = rgb;

    output = document.getElementById('orig_color');
    output.style.backgroundColor = getRGB(getFullSat(data));

    //set RGB drop downs
    output = document.getElementById('rgb_r');
    output.value = data[0]

    output = document.getElementById('rgb_g');
    output.value = data[1]

    output = document.getElementById('rgb_b');
    output.value = data[2]

    //set HSV drop downs
    output = document.getElementById('hsv_h');
    output.value = Math.round(hsv_data[0]);

    output = document.getElementById('hsv_s');
    output.value = Math.round(hsv_data[1]);

    output = document.getElementById('hsv_v');
    output.value = Math.round(hsv_data[2]);

    //set HEX output
    output = document.getElementById('hex_out');
    output.value = decimalToHex(data[0]) + decimalToHex(data[1]) + decimalToHex(data[2]);

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

//make sure that an RGB drop down is within specified parameters
function checkRGBMinMax(box_id) {
    let box = document.getElementById(box_id);
    if (!box.value) {
        box.value = 0;
    }
    else if (box.value > 255) {
        box.value = 255;
    }
    else if (box.value < 0) {
        box.value = 1;
    }
}

//get the color input from the RGB input
function getRGBInput() {
    checkRGBMinMax("rgb_r")
    let r = document.getElementById("rgb_r");

    checkRGBMinMax("rgb_g")
    let g = document.getElementById("rgb_g");

    checkRGBMinMax("rgb_b")
    let b = document.getElementById("rgb_b");

    setOutputColor([r.value, g.value, b.value])
    let fullSat = getFullSat([r.value, g.value, b.value]);
    findColorGradient(fullSat);
    findColorShade(fullSat, [r.value, g.value, b.value]);
}

//get the color input from the RGB input
function getHSVInput() {
    checkRGBMinMax("rgb_r");
    let r = document.getElementById("rgb_r");

    checkRGBMinMax("rgb_g");
    let g = document.getElementById("rgb_g");

    checkRGBMinMax("rgb_b");
    let b = document.getElementById("rgb_b");

    setOutputColor([r.value, g.value, b.value]);

}