/** 
 * loads blog and clears clutter from localStorage
 * @param none
 * @returns none
 */
async function blogInit() {
    localStorage.clear()
    localStorage.setItem("tags", "");

    loadPosts();
}

/** 
 * loads blog
 * @param none
 * @returns none
 */
async function loadPosts() {
    scroll(0, 0)
    drawSelectedTags();

    document.getElementById("tags_content").innerHTML = '';

    let content = document.getElementById("blog_content");
    //TODO handle multiple pages
    //let postsPer = document.getElementById('postPerPage').value;
    //let pageSel = document.getElementById("pageSelect")
    //pageSel.innerHTML = '<option value="1" id="opt1">1</option>'

    let tagStorage = localStorage.getItem("tags");
    tagsArr = tagStorage.split('#');

    let response = await sendRequest();
    content.innerHTML = response['html'];

    let tagsDiv = document.getElementById('tags_content');

    for (let i = 0; i < response['tags'].length; i++) {
        let row = document.createElement("div");
        row.innerHTML = response['tags'][i][0]
        tagsDiv.appendChild(row)

        row = document.createElement("text");
        row.innerText = response['tags'][i][1];
        tagsDiv.appendChild(row);
    }

    let sideBtns = document.getElementsByTagName()
}

/** 
 * create a div for pagination
 * @param {
        "ID": INT,
        "Author": "me",
        "Title": "test3",
        "Published": "None",
        "Body": "\"test\"",
        "Tags": "test"
    } entry 
 * @returns a new div with the tags formatted nicely
 */
function drawPageDiv(pageNum) {
    let pgDiv = document.createElement('div')
    pgDiv.id = 'content' + pageNum
    pgDiv.classList.add('page_content')

    if (pageNum > 1) {
        pgDiv.style.display = 'none'
        pages.style.display = 'block';

        let newOpt = document.createElement('option')
        newOpt.value = pageNum;
        newOpt.innerText = pageNum;
        newOpt.id = 'opt' + pageNum
        pageSel.appendChild(newOpt)
    }
    return pgDiv;
}

/** 
 * the function that builds the div of currently selected tags, or hides it in case there are no selected tags
 * @param none
 * @returns none
 */
function drawSelectedTags() {
    try {
        let tags = localStorage.getItem("tags")

        let tagDiv = document.getElementById('selected_tags_div');
        tagDiv.innerHTML = '';

        if (tags === '') {
            console.log('none')
            tagDiv.style.display = "none"
            return;
        }

        tagDiv.innerHTML = ''

        tagDiv.style.display = "flex"
        tagsList = tags.split('#')

        for (let i = 0; i < tagsList.length; i++) {
            if (tags[i][0].length > 0) {
                let tag = document.createElement("button");
                tag.classList.add('active_tag_button')
                tag.innerText = '#' + tagsList[i] + ' ☒';
                tag.id = '#' + tagsList[i];
                tag.addEventListener('click', function (e) {
                    unfilterTag(this)
                });
                tagDiv.appendChild(tag)
            }
        }
    } catch (error) {
        console.log(error)
        return;
    }
}

/** 
 * create a dictionary from the tags
 * @param {string} a string containing all tags from all posts, unsorted and with duplicates
 * @returns none
 */
function drawTagSidebar(tags) {
    let tagsBar = document.getElementById("tags_content");
    for (let i = 0; i < tags.length; i++) {
        if (tags[i][0].length > 0) {
            let tag = document.createElement("button");
            tag.classList.add('tag_button')
            tag.innerText = '#' + tags[i][0]
            tag.addEventListener('click', function (e) {
                filterTag(this)
            });
            tagsBar.appendChild(tag)

            let num = document.createElement("h4");
            num.innerText = tags[i][1]
            num.classList.add('tag_button')
            tagsBar.appendChild(num)
        }
    }
}