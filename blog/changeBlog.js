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
const filterTag = function (param) {
    let filters = document.getElementById('selected_tags_div');

    if (!filters.innerHTML.includes(param.innerText)) {
        let clone = param.cloneNode(true);
        filters.appendChild(clone)
        clone.outerHTML = clone.outerHTML.replace('filter', 'unfilter').replace('tagButton', 'filterButton');
        filterBlog();
    }
};

//removes a filter tag from the system
const unfilterTag = function (param) {
    param.remove();
    filterBlog();
}

//gives the same effect to hitting enter as hitting the submit button
function handle(e) {
    if (e.keyCode === 13) {
        loadPosts();
    }
    return false;
}

function prevPage() {
    let pgSelect = document.getElementById('pageSelect')

    if (pgSelect.value > 1) {
        pgSelect.value = pgSelect.value - 1;
        filterBlog();
    }
}

function nextPage() {
    let pgSelect = document.getElementById('pageSelect')

    if (document.getElementById('pg' + (parseInt(pgSelect.value) + 1))) {
        pgSelect.value = (parseInt(pgSelect.value) + 1);
        console.log(pgSelect.value)
        filterBlog();
    }
}

function createPgOption(pgNum) {
    let pgBtn = document.createElement("option");
    pgBtn.innerText = pgNum;
    pgBtn.value = pgNum;
    pgBtn.id = 'pg' + pgNum;
    return pgBtn;
}