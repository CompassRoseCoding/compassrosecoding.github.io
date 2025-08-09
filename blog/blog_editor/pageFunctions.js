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
    document.getElementById('published_input').value = '';
    document.getElementsByClassName('ql-editor')[0].innerHTML = '';
    document.getElementById('tags_display').innerHTML = '';
    document.getElementById('tags_input').value = ""
}

async function openPreview() {
    let preview_modal = document.getElementById('preview_modal');
    preview_modal.style.display = 'block';
    document.getElementById('preview_area').innerHTML = '';
    drawPreview()
}

async function closePreview() {
    let preview_modal = document.getElementById('preview_modal');
    preview_modal.style.display = 'none';
    document.getElementById('preview_area').innerHTML = '';
}

//draws a post on a given div 
function drawPreview() {
    let parentDiv = document.getElementById('preview_area')

    let postDiv = document.createElement("div");
    postDiv.id = document.getElementById('posts_select').value

    newH = document.createElement("h2");
    newH.classList.add("title");
    newH.innerText = document.getElementById('title_input').value;
    parentDiv.appendChild(newH)

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
    bodyDiv.innerHTML = document.getElementsByClassName('ql-editor')[0].innerHTML;
    parentDiv.appendChild(bodyDiv);

    let tagsDiv = document.createElement("div");
    tagsDiv.classList.add("tags");
    tagsDiv.innerHTML = document.getElementById('tags_display').innerHTML
    parentDiv.appendChild(tagsDiv);
}