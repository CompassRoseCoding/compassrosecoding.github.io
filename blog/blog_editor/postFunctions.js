var loginUrl = "https://t6gz4jxvn3.execute-api.us-east-2.amazonaws.com/login";

var postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://*',
    },
};

//logs in and receives token
async function login() {
    let user = document.getElementById('username_input').value;
    let pass = document.getElementById("password_input").value;

    localStorage.clear();

    data = {};
    data["username"] = user;
    data["password"] = pass;

    postOptions['body'] = JSON.stringify(data);

    let response = await postRequest(loginUrl, postOptions);
    if (response !== 0 && 'token' in response) {
        let token = response['token'];
        localStorage.setItem('compassrosecoding_token', token)
        localStorage.setItem('blogUrl', response['url']);

        editorInit();
    }
    else {
        document.getElementById('error_message').style.display = 'block'
    }
}

//publishes new post or edited post
async function postBlog(status) {
    let select = document.getElementById("posts_select");

    data = {};
    data["id"] = select.value;
    data["body"] = document.getElementById('post_div').outerHTML.replaceAll('id="post_div"', 'id="' + select.value + '"');

    data["token"] = localStorage.getItem('compassrosecoding_token');

    postOptions['body'] = JSON.stringify(data)

    closePreview();

    if (select.value != "") {
        let text = "Are you sure you want to overwrite the current version of this blog post?";
        if (confirm(text) != true) {
            return;
        }
    }

    let blogUrl = localStorage.getItem('blogUrl');
    let response = await postRequest(blogUrl, postOptions);

    clearPage();
    document.getElementById('posts_select').innerHTML = '';
    getTitles(response);
}


async function postRequest(blogUrl, postOptions) {
    try {
        const response = await fetch(blogUrl, postOptions);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        return 0;
    }
}