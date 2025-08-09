//create an opt to represent the blog post
function createOpt(id, title, date) {
    let select = document.getElementById("posts_select");

    let opt = document.createElement("option");
    opt.innerText = title + date;
    opt.value = id;

    select.appendChild(opt);
}

//populates appropriate fields with data from titles
function selectPost() {
    let select = document.getElementById("posts_select");

    if (select.value !== "") {
        let process = document.getElementById(select.value);

        document.getElementById('author_input').value = process.getElementsByClassName('author')[0].innerText;
        document.getElementById('title_input').value = process.getElementsByClassName('title')[0].innerText;
        document.getElementById('published_input').value = process.getElementsByClassName('published')[0].innerText;
        document.getElementsByClassName('ql-editor')[0].innerHTML = process.getElementsByClassName('body')[0].innerHTML;
        document.getElementById('tags_display').innerHTML = process.getElementsByClassName('tags')[0].innerHTML;
    }
    else {
        clearPage();
    }
}

//make opts out of list of titles
async function getTitles(response) {
    createOpt("TEMP_ID", "Create New Post", "")

    let process = document.getElementById('processing_modal');
    process.innerHTML = response['html'];
    let responseArr = process.getElementsByClassName('preview_area')

    for (let item of responseArr) {
        console.log(process)

        let id = item.id;
        let title = item.getElementsByClassName('title')[0].innerText;
        let published = item.getElementsByClassName('published')[0].innerText;

        createOpt(id, title, ', ' + published)
    }
}

//adds a tag to the post
async function addTag() {
    let tagDiv = document.getElementById('tags_display')
    let newTag = document.getElementById('tags_input')

    let tag = tagButton('#' + newTag.value)

    if (!tagDiv.innerHTML.includes(tag.outerHTML)) {
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
    let remov = document.getElementById(tag.id);
    remov.remove()
}