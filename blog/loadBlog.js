/** 
 * loads blog and clears clutter from localStorage
 * @param none
 * @returns none
 */
async function blogInit() {
    localStorage.clear()
    localStorage.setItem("tags", "");

    init();

    loadPosts();

    let search = document.getElementById('search_bar');
    search.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            searchBlog();
        }
    });
}

/** 
 * loads blog
 * @param none
 * @returns none
 */
async function loadPosts() {
    scroll(0, 0)

    document.getElementById("tags_content").innerHTML = '';

    let content = document.getElementById("blog_content");
    let response = await sendRequest();
    content.innerHTML = response['html'];

    filterBlog();
    drawTagBar(response);
}

/** 
 * create a most used tags list
 * @param {
        "body": "\"test\"",
        "tags": "test"
    } response 
 * @returns none
 */
function drawTagBar(response) {
    let tagsDiv = document.getElementById('tags_content');

    for (let i = 0; i < response['tags'].length; i++) {
        let row = document.createElement("div");
        row.innerHTML = response['tags'][i][0];
        tagsDiv.appendChild(row)

        row = document.createElement("text");
        row.innerText = response['tags'][i][1];
        tagsDiv.appendChild(row);
    }
}
