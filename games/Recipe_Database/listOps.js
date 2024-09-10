const chkTemplate = "<div name=\"unchecked\ id=\"[div_id]\"><input type=\"checkbox\" id=\"[chk_id]\" onclick=\"checkOff('[div_id]')\"><label for=\"[chk_id]\">[chk_txt]</label></div>"

async function viewList() {
  itemExists("list")
  list = localStorage.getItem("list");

  //list = '<div id="list-content"><div name="check" id="1_div"><input type="checkbox" id="1" onclick="checkOff(\'1_div\')"><label for="1">1 14 oz can crushed pineapple, drained</label></div><div name="check" id="2_div"><input type="checkbox" id="2" onclick="checkOff(\'2_div\')"><label for="2">1 14 oz can fruit cocktail, drained</label></div><div name="check" id="3_div"><input type="checkbox" id="3" onclick="checkOff(\'3_div\')"><label for="3">1 pouch pistachio pudding mix</label></div><div name="check" id="4_div"><input type="checkbox" id="4" onclick="checkOff(\'4_div\')"><label for="4">1 8 oz container cool whip</label></div><div name="check" id="5_div"><input type="checkbox" id="5" onclick="checkOff(\'5_div\')"><label for="5">2 c mini marshmallows</label></div><div name="check" id="6_div"><input type="checkbox" id="6" onclick="checkOff(\'6_div\')"><label for="6">1 c chopped nuts (opt)</label></div></div>';

  var listDiv = document.getElementById("list-content");

  var list = "";

  var ingredients = localStorage.getItem("list").split("\n")
  for (i = 0; i < ingredients.length; i++) {
    if (ingredients[i].length > 2) {
      var divID = i + "_div";
      list = list + '\n' + chkTemplate.replaceAll('[chk_id]', i + "").replaceAll('[chk_txt]', ingredients[i]).replaceAll('[div_id]', divID);
    }
  }

  listDiv.innerHTML = list;
  await openModal('listModal');
}

function addToGroceryList() {
  var ingredients = document.getElementById("ingredientsText").innerText.split('\n');
  itemExists("list")
  var currList = localStorage.getItem("list")
  currList = currList + ingredients;
  localStorage.setItem("list", currList)
}

//Check the items off the list: move them to the bottom just in case you need to refer to them. 
function checkOff(id) {
  var chk = document.getElementById(id)
  var chkBox = document.getElementById(id.replace('_div', ''))
  var start = document.getElementById("list-content");
  chk.remove();
  if (chkBox.checked == false) {
    chk.setAttribute("name","unchecked")
    start.prepend(chk)
  }
  else {
    chk.setAttribute("name","checked_box")
    start.appendChild(chk)
  }

  itemExists("list")
  localStorage.setItem("list", start.innerHTML)
  console.log(chk)
}

//This allows me to make sure that any localStorage item exists before trying to call it
function itemExists(item) {
  console.log(localStorage.getItem("list"))
  if (!(item in localStorage) || localStorage.getItem(item) === null) {
    localStorage.setItem(item, "")
  }
}

function clearChecked() {
  var checks = document.getElementsByName("checked_box");
  var start = document.getElementById("list-content");
  while (checks[0] !== undefined) {
    checks[0].remove();
  }
  itemExists("list")
  localStorage.setItem("list", start.innerHTML)
  console.log(start.innerHTML)
}

function clearAll() {
  var start = document.getElementById("list-content");
  start.innerHTML = "";
  itemExists("list")
  localStorage.setItem("list", "");
  console.log(localStorage.getItem("list"))
}