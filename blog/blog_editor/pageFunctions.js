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

//populates appropriate fields with data from titles
function selectPost() {
    let select = document.getElementById("posts_select");

    if (select.value !== "") {
        let data = localStorage.getItem('post_' + select.value);

        data = JSON.parse(data)

        document.getElementById('author_input').value = data["Author"];
        document.getElementById('title_input').value = data["Title"];
        document.getElementById('published_input').value = data["Published"];
        document.getElementsByClassName('ql-editor')[0].innerHTML = data["Body"];

        let tagsList = document.getElementById('tags_list')
        let tagDiv = document.getElementById('tags_display')

        document.getElementById('tags_list').innerText = ""
        console.log(data["Tags"]);
        let tagsArr = data["Tags"].split('#');
        tagDiv.innerHTML = '';
        for (let i = 0; i < tagsArr.length; i++) {
            if (tagsArr[i].length > 0) {
                tagsList.innerText = tagsList.innerText + '#' + tagsArr[i]

                let btn = tagButton('#' + tagsArr[i]);
                tagDiv.appendChild(btn)
            }
        }
    }
    else {
        clearPage();
    }
}

//clears all input fields
function clearPage() {
    document.getElementById('author_input').value = "";
    document.getElementById('title_input').value = "";
    document.getElementById('published_input').value = "";
    document.getElementById('tags_input').value = "";

    document.getElementById('tags_list').innerText = ""
    document.getElementById('tags_display').innerHTML = ""
    document.getElementById('tags_input').value = ""

    document.getElementsByClassName('ql-editor')[0].innerHTML = "";
    document.getElementById('posts_select').innerHTML = "";
}

//create an opt to represent the blank fields
function createNewOpt() {
    let select = document.getElementById("posts_select");

    opt = document.createElement("option");
    opt.innerText = "Create New Post";
    opt.value = "";
    select.appendChild(opt);
}

//create an opt to represent the blog post
function createOpt(id, title, date) {
    let select = document.getElementById("posts_select");

    let opt = document.createElement("option");
    opt.innerText = title + ", " + date;
    opt.value = id;

    select.appendChild(opt);
}

//adds a tag to the post
async function addTag() {
    let tagsList = document.getElementById('tags_list')
    let tagDiv = document.getElementById('tags_display')
    let newTag = document.getElementById('tags_input')

    let tagText = '#' + newTag.value

    if (!tagsList.innerText.includes(tagText)) {
        tagsList.innerText = tagsList.innerText + tagText

        let tag = tagButton(tagText)
        tagDiv.appendChild(tag)
    }
    newTag.value = '';
}

//create a button for a tag
function tagButton(tagText) {
    let tag = document.createElement("button");
    tag.innerText = tagText + ' ☒';
    tag.id = tagText;
    tag.addEventListener('click', function (e) {
        removeTag(this)
    });
    return tag
}

//removes a filter tag from the system
function removeTag(tag) {
    let tagsList = document.getElementById('tags_list')

    tagsList.innerText = tagsList.innerText.replace(tag.id, '')

    let remov = document.getElementById(tag.id);
    remov.remove()
}

//draws a post on a given div 
function drawPreview() {
    let parentDiv = document.getElementById('preview_area')
    try {
        newH = document.createElement("h2");
        newH.innerText = document.getElementById('title_input').value;
        parentDiv.appendChild(newH)

        let dateH = document.createElement('h3')
        updated = new Date(document.getElementById('published_input').value);
        dateH.innerText = updated.toDateString();
        parentDiv.appendChild(dateH);

        let auth = document.createElement('h3');
        auth.innerText = document.getElementById('author_input').value;
        parentDiv.appendChild(auth);

        bodyDiv = document.createElement("div");
        bodyDiv.classList.add("entry_body");
        bodyDiv.innerHTML = document.getElementsByClassName('ql-editor')[0].innerHTML;
        parentDiv.appendChild(bodyDiv);
    }
    catch (error) {
        return;
    }
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
}