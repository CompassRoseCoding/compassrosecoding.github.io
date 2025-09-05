var apiUrl = 'https://56lupeibo6.execute-api.us-east-2.amazonaws.com/Initial/';
var data = {};
const recipeBtnHtml = '<button onclick="getFullRecipe([id])">[title]</button>'

/**
 * EXAMPLE_ME
 * @param
 * @returns
*/
async function getAllRecipes() {
	myUrl = apiUrl.concat('recipes/default')
	titles = await await (await fetch(myUrl)).json();
	start = document.getElementById('controlBtns');
	for (i = 0; i < titles.length; i++) {
		start.innerHTML = start.innerHTML + recipeBtnHtml.replace('[id]', (i + 1) + "").replace('[title]', titles[i]['Title']);
	}
}

/**
 * EXAMPLE_ME
 * @param
 * @returns
*/
async function getFullRecipe(id) {
	myUrl = apiUrl.concat('recipes/default/', id);
	recipe = await await (await fetch(myUrl)).json();

	openModal('fullModal');
	document.getElementById('titleText').textContent = recipe['Title']
	document.getElementById('recipeText').textContent = recipe['Fullrecipe']
	document.getElementById('ingredientsText').textContent = recipe['Ingredients']

	var addToList = document.getElementById("addToListBtn");
	addToList.onclick = /**
 * EXAMPLE_ME
 * @param
 * @returns
*/
function() {
		itemExists("list")
		localStorage.setItem("list", localStorage.getItem("list") + "\n" + document.getElementById("ingredientsText").innerHTML);
	}
}
