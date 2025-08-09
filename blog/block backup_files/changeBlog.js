const blogURL = "https://u315eql0b6.execute-api.us-east-2.amazonaws.com/blog/scratch_blog";

var requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};

//send a specified request and return json response
async function sendRequest() {
    const response = await fetch(blogURL, requestOptions)
    const json = await response.json()
    return json;
}

//adds a filter tag to the system
async function filterTag(tag) {
    let tags = localStorage.getItem("tags");
    let tagText = tag.innerText;

    if (!tags.includes(tagText)) {
        localStorage.setItem("tags", tags + tagText);
        loadPosts();
    }
}

//removes a filter tag from the system
function unfilterTag(tag) {
    let tags = localStorage.getItem("tags")
    let tagText = tag.id;

    console.log(tags, tagText)

    tags = tags.replace('#' + tagText, '');

    localStorage.setItem("tags", tags);
    loadPosts()
}

//gives the same effect to hitting enter as hitting the submit button
function handle(e) {
    if (e.keyCode === 13) {
        loadPosts();
    }
    return false;
}

function prevPage() {
    let currPg = document.getElementById('pageSelect').value

    if (currPg - 1 >= 0 && document.getElementById('prev').classList.contains('valid_arrow')) {
        document.getElementById('pageSelect').value = currPg - 1
        changePage();
    }
}

function nextPage() {
    let currPg = document.getElementById('pageSelect').value;
    let nextPg = parseInt(currPg) + 1
    
    if (document.getElementById('opt' + nextPg) !== null && document.getElementById('next').classList.contains('valid_arrow')) {
        document.getElementById('pageSelect').value = nextPg
        changePage();
    }
}

function changePage() {
    pages = document.getElementsByClassName('page_content')
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none'
    }

    destination = parseInt(document.getElementById('pageSelect').value);
    document.getElementById('content' + destination).style.display = 'block'
    
    prev = document.getElementById('prev')
    if (destination - 1 === 0) {
        prev.classList.add('invalid_arrow')
        prev.classList.remove('valid_arrow')
    }
    else {
        prev.classList.remove('invalid_arrow')
        prev.classList.add('valid_arrow')
    }
    next = document.getElementById('next')
    if (document.getElementById('opt' + (destination + 1)) === null) {
        next.classList.remove('valid_arrow')
        next.classList.add('invalid_arrow')
    }
    else {
        next.classList.remove('invalid_arrow')
        next.classList.add('valid_arrow')
    }

    scroll(0, 0)
}