function setMargin() {
    let resume = document.getElementById('resume')
    let height = resume.offsetHeight;

    let downloadArea = document.getElementById('download_area');
    downloadArea.setAttribute("style", "height: calc(" + height + "px + 10vw);");

    let left = resume.getBoundingClientRect().left;
    let top = downloadArea.getBoundingClientRect().top;

    resume.setAttribute("style", "top: calc(" + top + "px + " + left + "px);");
}

async function downloadResume() {
    let download = document.getElementById('download_area');

    download.style.display = 'flex';

    var opt = {
        margin: 0,
        scale: 2, 
        filename: 'Hannah_Robertson_Resume.pdf',
        image:        { type: 'png', quality: 1 },
        html2canvas: {
            scale: 1.5,
			dpi: 100,
            letterRendering: true,
            scrollY: 0,
            scrollX: 0,
        },
        jsPDF: { unit: 'in', format: [8.45, 11], orientation: 'portrait' }
    };

    html2pdf().set(opt).from(download).save();

    if (window.screen.width < 600) {
        download.style.display = 'none';
    }
}

window.addEventListener("load", (event) => {
    init();
});
