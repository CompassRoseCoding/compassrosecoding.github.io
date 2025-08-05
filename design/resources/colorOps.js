//https://www.rapidtables.com/convert/color/rgb-to-hsl.html
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

//quick function to make a string that allows RGB coloring of HTML objects out of data array
function getRGB(data) {
    let colString = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
    return colString
}

//quick function to make a string that allows RGB coloring of HTML objects out of data array
function getHSL(data) {
    let colString = 'hsl(' + data[0] + ',' + data[1] + '%,' + data[2] + '%)';
    return colString
}

//converts decimal to hex
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