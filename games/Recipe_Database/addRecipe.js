var postUrl = 'https://56lupeibo6.execute-api.us-east-2.amazonaws.com/Initial/new';
var data = {};

var postOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

function postRecipe() {
  var modal = document.getElementById("addModal");
  modal.style.display = "none";

  data.title = document.getElementById('title').value;
  data.user = "default"
  data.ingredients = document.getElementById('ingredients').value;
  data.fulltext = document.getElementById('ingredients').value.concat("\n\n", document.getElementById('steps').value);
  data.operation = "addRecipe"

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