var deleteOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://*',
    },
};

//send a get request and return json response
async function getRequest() {
    let blogUrl = localStorage.getItem('blogUrl');
    const response = await fetch(blogUrl)
    const json = await response.json()
    return json;
}

//deletes a post and reloads post list
async function deletePost() {
    data = {}
    console.log(document.getElementById("posts_select").value)
    data["id"] = document.getElementById("posts_select").value;
    data["token"] = localStorage.getItem('compassrosecoding_token');

    deleteOptions['body'] = JSON.stringify(data)

    let url = localStorage.getItem('blogUrl');

    let response = await deleteRequest(url);

    clearPage();
    document.getElementById('posts_select').innerHTML = '';
    getTitles(response);
}

//send a delete request and return json response
async function deleteRequest(blogUrl) {
    let text = "Are you sure you want to delete this blog post?";
    if (confirm(text) != true) {
        window.location.reload();
    }

    try {
        const response = await fetch(blogUrl, deleteOptions);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        return error;
    }
}