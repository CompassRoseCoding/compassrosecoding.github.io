const postUrl = "https://u315eql0b6.execute-api.us-east-2.amazonaws.com/blog/scratch_blog";
var data = {};

var postOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

function publish() {
  console.log(document.getElementById('published_input').value)

  let pub = document.getElementById('published_input').value;

  if (!document.getElementById('published_input').value) {
    console.log('empty date')
    const date = new Date();
    pub = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
  }

  let select = document.getElementById("posts_select");

  data = {};
  data["id"] = select.value;
  data["author"] = document.getElementById('author_input').value;
  data["title"] = document.getElementById('title_input').value;
  data["published"] = pub;
  data["tags"] = document.getElementById('tags_input').value;
  data["body"] = document.getElementsByClassName('ql-editor')[0].innerHTML;

  postOptions['body'] = JSON.stringify(data)

  fetch(postUrl, postOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      returnable = JSON.stringify(data, null, 2);
      location.reload()
    })
    .catch(error => {
      console.error
        ('Error:', error);
    });
}