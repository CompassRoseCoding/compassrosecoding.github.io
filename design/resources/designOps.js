function designInit() {
    init();
    initGradient();
}

function switchOriginal() {
    document.getElementById('header_css').href = "../resources/header_style.css";
    document.getElementById('design_css').href = "resources/design_style.css";
    init();
}

function switchModern() {
    document.getElementById('header_css').href = "modern/header_style.css";
    document.getElementById('design_css').href = "modern/modern_style.css";
    modernCompass();
}

function switchRetro() {
    document.getElementById('header_css').href = "retro/header_style.css";
    document.getElementById('design_css').href = "retro/retro_style.css";
    retroCompass();
}

function switchImage() {
    document.getElementById('header_css').href = "../resources/header_style.css";
    document.getElementById('design_css').href = "image/image_style.css";
    init();
}

function changeFontDemo(element) {
    text = document.getElementById('font_example');
    text.style.fontFamily = element.value;
}