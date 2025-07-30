//https://www.rapidtables.com/convert/color/rgb-to-hsv.html
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
function hsv_RGB(hsv) {
    //s and v are multiplied by 100
    hsv[1] = hsv[1] / 100;
    hsv[2] = hsv[2] / 100;

    let c = hsv[1] * hsv[2];

    let x = c * (1 - Math.abs((hsv[0] / 60) % 2 - 1));

    let m = hsv[2] - c;

    let rgb_prime = [0,0,0]

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

//quick function to make a string that allows RGB coloring of HTML objects out of data array
function getRGB(data) {
    let colString = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
    return colString
}

//converts decimal to hex
function decimal_Hex(num) {
    hex = num.toString(16)

    if (hex.length === 1) {
        hex = '0' + hex
    }

    return hex;
}

//converts hex to decimal
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
function getFullSat(data) {
    hsv_data = rgb_HSV(data);
    full_sat_data = [hsv_data[0], 100, 100]
    full_sat_rgb = hsv_RGB(full_sat_data);
    return full_sat_rgb;
}