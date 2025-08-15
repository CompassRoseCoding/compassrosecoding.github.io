/** 
 * re-paginate blog
 * @param none
 * @returns none
 */
function searchBlog() {
    let search = document.getElementById('search_bar').value;
    if (search === '') {
        let blog = document.getElementById('blog_content');
        blog.innerHTML = blog.innerHTML.replaceAll('<span class="search_highlight">', '').replaceAll('</span  >', '')
        filterBlog();
        return;
    }
    document.getElementsByClassName('selected_tags_div').innerHTML = '';
    let posts = document.getElementsByClassName('post_div');
    let pgSelect = document.getElementById('pageSelect');
    let postsPer = document.getElementById('postPerPage');
    let currentPg = parseInt(pgSelect.value);

    pgSelect.innerHTML = '';
    pgSelect.appendChild(createPgOption(1));

    let filteredCount = 0;
    for (let i = 0; i < posts.length; i++) {
        let pageNum = parseInt(parseInt(filteredCount) / parseInt(postsPer.value)) + 1;
        posts[i].innerHTML = posts[i].innerHTML.replaceAll('<span class="search_highlight">', '').replaceAll('</span  >', '')

        if (!document.getElementById('pg' + pageNum)) {
            pgSelect.appendChild(createPgOption(pageNum));
        }

        if (posts[i].innerText.indexOf(search) >= 0 && pageNum === currentPg) {
            posts[i].style.display = 'block';
            filteredCount = filteredCount + 1;
            posts[i].innerHTML = posts[i].innerHTML.replaceAll(search, '<span class="search_highlight">' + search + '</span  >')
        }
        else if (pageNum !== currentPg) {
            posts[i].style.display = 'none';
            filteredCount = filteredCount + 1;
        }
        else {
            posts[i].style.display = 'none';
        }
    }
    pgSelect.value = currentPg;
}


/** 
 * re-paginate blog
 * @param none
 * @returns none
 */
function filterBlog() {
    document.getElementsByClassName('search_bar').value = '';

    let posts = document.getElementsByClassName('post_div')
    let tags = document.getElementsByClassName('filterButton')

    let pgSelect = document.getElementById('pageSelect')
    let postsPer = document.getElementById('postPerPage')
    let currentPg = parseInt(pgSelect.value);

    pgSelect.innerHTML = '';
    pgSelect.appendChild(createPgOption(1));

    let filteredCount = 0;
    for (let i = 0; i < posts.length; i++) {
        let add = true;
        let tagsDiv = posts[i].getElementsByClassName('tags')[0]

        let dateDiv = posts[i].getElementsByClassName('published')[0]
        if (dateDiv.innerText === 'DRAFT') {
            posts[i].remove();
        }

        for (let j = 0; j < tags.length; j++) {
            if (!tagsDiv.innerHTML.includes(tags[j].id)) {
                add = false;
            }
        }

        let pageNum = parseInt(filteredCount / parseInt(postsPer.value)) + 1;

        if (!document.getElementById('pg' + pageNum)) {
            pgSelect.appendChild(createPgOption(pageNum));
        }

        if (add && pageNum === currentPg) {
            posts[i].style.display = 'block';
            filteredCount = filteredCount + 1;
        }
        else if (!add) {
            posts[i].style.display = 'none';
        }
        else {
            posts[i].style.display = 'none';
            filteredCount = filteredCount + 1;
        }
    }
    pgSelect.value = currentPg;
}

function clearSearch() {
    document.getElementById('search_bar').value = '';
    let blog = document.getElementById('blog_content');
    blog.innerHTML = blog.innerHTML.replaceAll('<span class="search_highlight">', '').replaceAll('</span  >', '')
    filterBlog();
}