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

    let content = document.getElementById("blog_content")
    let postsPer = document.getElementById('postPerPage').value;
    let pageSel = document.getElementById("pageSelect")
    pageSel.innerHTML = '<option value="1" id="opt1">1</option>'

    let tagStorage = localStorage.getItem("tags")
    tagsArr = tagStorage.split('#');

    response = await sendRequest()
    content.innerHTML = '';

    let i = -1;
    let pageNum = Math.floor(i / postsPer) + 1;
    let currDiv = document.getElementById('content' + pageNum);
    let allTags = ""
    for (var key in response) {
        if (key === 'tagsBar') {
            drawTagSidebar(response[key]);
        }
        else {
            allTags = allTags + '#' + response[key]["Tags"];

            let includeTags = true;
            for (let i = 0; i < tagsArr.length; i++) {
                if (!response[key]["Tags"].includes(tagsArr[i])) {
                    includeTags = false;
                }
            }

            if (includeTags) {
                i++;
                if (i % postsPer === 0) {
                    currDiv = drawPageDiv();
                    content.appendChild(currDiv);
                }

                currDiv.appendChild(drawBlogPost(response[key]));
                currDiv.appendChild(drawPostTagBar(response[key]));
            }
        }
    }
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
 * format a json response into a legible blog post
 * @param {dict} entry the dict object returned by the API to represent a post
 * {
        "ID": INT,
        "Author": "me",
        "Title": "test3",
        "Published": "None",
        "Body": "\"test\"",
        "Tags": "test"
    }
 *  @returns none
 */
function drawBlogPost(entry) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("entry_div")
    try {
        let newH = document.createElement("h2");
        newH.innerText = entry['Title']
        newDiv.appendChild(newH)

        let date = document.createElement('h3')
        updated = new Date(entry['Published'])
        date.innerText = updated.toDateString()
        newDiv.appendChild(date)

        let auth = document.createElement('h3');
        auth.innerText = entry['Title'];
        newDiv.appendChild(auth)

        let body = document.createElement("div");
        body.classList.add("entry_body")
        body.innerHTML = entry['Body']
        newDiv.appendChild(body)

        return newDiv;
    }
    catch (error) {
        return newDiv;
    }
}

/** 
 * tag bars are separate from blog posts for formatting reasons; these are the tags for each post
 * @param {dict} entry the dict object returned by the API to represent a post
 * {
        "ID": INT,
        "Author": "me",
        "Title": "test3",
        "Published": "None",
        "Body": "\"test\"",
        "Tags": "test"
    }
 *  @returns none
 */
function drawPostTagBar(entry) {
    try {
        let tagDiv = document.createElement("div");
        tagDiv.classList.add("tags_div")
        let tagsArr = entry['Tags'].split(",")
        for (let i = 0; i < tagsArr.length; i++) {
            if (tagsArr[i].length > 1) {
                let tag = document.createElement("button");
                tag.classList.add('tag_button')
                tag.innerText = '#' + tagsArr[i]
                tag.addEventListener('click', function (e) {
                    filterTag(this)
                });
                tagDiv.appendChild(tag)
            }
        }
        return tagDiv
    }
    catch (error) {
        console.log(error)
        return document.createElement("div");
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