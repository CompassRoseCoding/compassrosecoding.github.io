async function editorInit() {
    getTitles();
}

async function getTitles() {
    let response = await sendRequest();

    for (var key in response) {
        createSelect(response[key]['ID'], response[key]['Title'], response[key]['Published'])
        localStorage.setItem('post_' + key, JSON.stringify(response[key]))
    }
}

function createSelect(id, title, date) {
    let select = document.getElementById("posts_select");

    opt = document.createElement("option");
    opt.innerText = id + '. ' + title + ", " + date;
    opt.value = id;
    select.appendChild(opt);
}

function selectPost() {
    let select = document.getElementById("posts_select");

    if (select.value !== "") {
        let data = localStorage.getItem('post_' + select.value);

        data = JSON.parse(data)

        document.getElementById('author_input').value = data["Author"];
        document.getElementById('title_input').value = data["Title"];
        document.getElementById('published_input').value = data["Published"];
        document.getElementById('tags_input').value = data["Tags"];
        document.getElementsByClassName('ql-editor')[0].innerHTML = (data["Body"]);
    }
    else {
        document.getElementById('author_input').value = "";
        document.getElementById('title_input').value = "";
        document.getElementById('published_input').value = "";
        document.getElementById('tag_input').value = "";
        document.getElementsByClassName('ql-editor')[0].innerHTML = "";
    }
}