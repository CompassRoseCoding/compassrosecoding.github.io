async function blogInit() {
    init();
    loadPosts();
}

//loads the posts from json to html
async function loadPosts() {
    scroll(0, 0)
    displaySelectedTags();

    content = document.getElementById("blog_content")

    loading = document.createElement("h2")
    loading.innerHTML = 'Loading Blog'
    content.appendChild(loading)

    postsPer = document.getElementById('postPerPage').value;

    response = await sendRequest()
    content.innerHTML = '';

    pages = document.getElementById("pagination")
    pages.style.display = 'none';
    pageSel = document.getElementById("pageSelect")
    pageSel.innerHTML = '<option value="1" id="opt1">1</option>'
    for (let i = 0; i < response.length; i++) {
        pageNum = Math.floor(i / postsPer) + 1
        let currDiv = document.getElementById('content' + pageNum)
        if (currDiv == undefined) {
            currDiv = document.createElement('div')
            currDiv.id = 'content' + pageNum
            currDiv.classList.add('page_content')

            if (pageNum > 1) {
                currDiv.style.display = 'none'
                pages.style.display = 'block';

                newOpt = document.createElement('option')
                newOpt.value = pageNum;
                newOpt.innerText = pageNum;
                newOpt.id = 'opt' + pageNum
                pageSel.appendChild(newOpt)
            }
            content.appendChild(currDiv)
        }

        currDiv.appendChild(newBlogPost(response[i]))

        currDiv.appendChild(newTagsBar(response[i]))

        //if there's going to be another entry, add a quick little compass
        if (i % postsPer < postsPer - 1 && i < response.length - 1) {
            newSpan = document.createElement("span");
            newSpan.classList.add("line_break")
            newSpan.innerHTML = '&#129517';
            currDiv.appendChild(newSpan)
        }
    }
}

//the function that builds the div of currently selected tags, or hides it in case there are no selected tags
function displaySelectedTags() {
    try {
        let tags = getTags()
        let tagDiv = document.getElementById('tag_div');
        tagDiv.innerHTML = ''
        if (tags == '') {
            tagDiv.style.visibility = "hidden"
            localStorage.setItem("tags", "");
            return;
        }
        tagDiv.style.visibility = "visible"
        tagDiv.style.display = "flex"
        tagsList = tags.split(',')

        for (let i = 0; i < tagsList.length - 1; i++) {
            tag = document.createElement("button");
            tag.classList.add('active_tag_button')
            tag.innerText = tagsList[i] + ' ☒';
            tag.id = tagsList[i];
            tag.addEventListener('click', function (e) {
                unfilterTag(this)
            });
            tagDiv.appendChild(tag)
        }
    } catch (error) {
        return;
    }
}

//format a json response into a legible blog post
function newBlogPost(entry) {
    newDiv = document.createElement("div");
    newDiv.classList.add("entry_div")
    try {
        newH = document.createElement("h2");
        newH.innerText = entry['title']
        newDiv.appendChild(newH)
    
        date = document.createElement('h3')
        updated = new Date(entry['updated'])
        date.innerText = updated.toDateString()
        newDiv.appendChild(date)
    
        auth = document.createElement('h3')
        authro = entry['author']['displayName']
        auth.innerText = authro
        newDiv.appendChild(auth)
    
        body = document.createElement("div");
        body.classList.add("entry_body")
        body.innerHTML = entry['content'].replaceAll('<div><span', '<div class="coding_div"><span').replaceAll('<span class="blog_post_text">', '').replaceAll('<span class="blog_post_text">', '').replaceAll('</span>', '').replaceAll('&nbsp;', '')
        newDiv.appendChild(body)
    
        return newDiv;
    }
    catch (error) {
        return newDiv;
    }
}

//tag bars are separate from blog posts for formatting reasons; these are the tags for each post.
function newTagsBar(entry) {
    try {
        tagDiv = document.createElement("div");
        tagDiv.classList.add("tags_div")
        for (let j = 0; j < entry['labels'].length; j++) {
            tag = document.createElement("button");
            tag.classList.add('tag_button')
            tag.innerText = '#' + entry['labels'][j]
            tag.addEventListener('click', function (e) {
                filterTag(this)
            });
            tagDiv.appendChild(tag)
        }
        return tagDiv
    }
    catch (error) {
        return document.createElement("div");
    }
}