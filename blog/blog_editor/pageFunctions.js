let inactiveTimeout = null

//initializes the editor upon login; hides login panel, etc
async function editorInit() {
    document.getElementById('tags_input').addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTag()
        }
    });

    let login_modal = document.getElementById('login_modal');
    login_modal.style.display = 'none';

    let editor_modal = document.getElementById('editor_modal');
    editor_modal.style.display = 'block';

    const activity_events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];

    activity_events.forEach(event => {
        document.addEventListener(event, resetTimer(), true);
    });

    let response = await getRequest();
    getTitles(response);

    resetTimer();

    //sets the logout timer to two hours
    inactiveTimeout = setTimeout(() => {
        localStorage.setItem('compassrosecoding_token', '')
        window.location.reload();
    }, 1000 * 60 * 60 * 2);
}

//sets the logout timer- 15 mins of no activity auto logs you out.
function resetTimer() {
    clearTimeout(inactiveTimeout)
    inactiveTimeout = setTimeout(() => {
        localStorage.setItem('compassrosecoding_token', '')
        window.location.reload();
    }, 1000 * 60 * 15);
}

//clears all input fields
function clearPage() {
    document.getElementById('author_input').value = '';
    document.getElementById('title_input').value = '';
    document.getElementById('subtitle_input').value = '';
    document.getElementById('published_input').value = '';
            document.getElementById('editor').getElementsByClassName('ql-editor')[0].innerHTML = '';
    document.getElementById('tags_display').innerHTML = '';
    document.getElementById('tags_input').value = ""
}

async function openPreview() {
    let preview_modal = document.getElementById('preview_modal');
    preview_modal.style.display = 'block';
    document.getElementById('post_div').innerHTML = '';
    drawPreview()
}

async function closePreview() {
    let preview_modal = document.getElementById('preview_modal');
    preview_modal.style.display = 'none';
    document.getElementById('post_div').innerHTML = '';
}

//draws a post on a given div 
function drawPreview() {
    let parentDiv = document.getElementById('post_div')

    let postDiv = document.createElement("div");
    postDiv.id = document.getElementById('posts_select').value

    let title = document.createElement("h2");
    title.classList.add("title");
    title.innerText = document.getElementById('title_input').value;
    parentDiv.appendChild(title)

    let subtitle = document.createElement("h3");
    subtitle.classList.add("subtitle");
    subtitle.innerText = document.getElementById('subtitle_input').value;
    parentDiv.appendChild(subtitle)

    let dateH = document.createElement('h3')
    dateH.classList.add("published");
    if (!document.getElementById('published_input').value) {
        dateH.innerText = 'DRAFT';
    }
    else {
        dateH.innerText = document.getElementById('published_input').value;
    }

    parentDiv.appendChild(dateH);

    let auth = document.createElement('h3');
    auth.classList.add("author");
    auth.innerText = document.getElementById('author_input').value;
    parentDiv.appendChild(auth);

    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("body");
    let body = document.getElementById('editor').getElementsByClassName('ql-editor')[0];
    let selects = body.getElementsByClassName('ql-ui');
    for (let i = 0; i < selects.length; i++) {
        selects[i].remove()
    }
    bodyDiv.innerHTML = body.innerHTML;
    parentDiv.appendChild(bodyDiv);

    let tagsDiv = document.createElement("div");
    tagsDiv.classList.add("tags");
    tagsDiv.innerHTML = document.getElementById('tags_display').innerHTML.replaceAll('">', '" onclick="filterTag(this)">');
    parentDiv.appendChild(tagsDiv);
}