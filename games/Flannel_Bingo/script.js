var options = "red,orange,yellow,green,blue,black or purple,brown,white,blue and green,black and red,orange and blue,red and green,rainbow,red and yellow,red and brown,blue and brown,green and yellow,white and red,blue and white,black and white,only one color,any three colors,green and black,green and yellow,any four colors,non plaid pattern"

function loadCard() {
  init();
  if (localStorage.getItem("order") == null || localStorage.getItem("order").includes("undefined")) {
    newCard()
  }
  else {
    readCard()
  }
}

function readCard() {
  order = localStorage.getItem("order").substring(1).split(",")
  selection = localStorage.getItem("selection").substring(1).split(",")
  localStorage.setItem("selection", "")
  console.log(selection)

  table = document.getElementById("bingotable")

  for (i = 0; i < 5; i++) {
    tr = document.createElement("tr")
    for (j = 0; j < 5; j++) {
      td = document.createElement("td")
      btn = newBtn(order[i * 5 + j], selection[i * 5 + j])
      td.appendChild(btn)
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  check()
}

function newCard() {
  localStorage.setItem("order", "")
  localStorage.setItem("selection", "")
  localOptions = options.split(",")
  table = document.getElementById("bingotable")
  table.appendChild(newTr(localOptions))
  table.appendChild(newTr(localOptions))
  table.appendChild(centerTr(localOptions))
  table.appendChild(newTr(localOptions))
  table.appendChild(newTr(localOptions))
}



function newTr(localOptions) {
  tr = document.createElement("tr")
  for (i = 0; i < 5; i++) {
    td = document.createElement("td")
    btn = newBtn(randomizeFlannel(localOptions), "btn regBtn")
    td.appendChild(btn)
    tr.appendChild(td)
  }
  tr.className = "bingoRow"
  return tr
}

function centerTr(localOptions) {
  tr = document.createElement("tr")
  for (i = 0; i < 2; i++) {
    td = document.createElement("td")
    btn = newBtn(randomizeFlannel(localOptions), "btn regBtn")
    td.appendChild(btn)
    tr.appendChild(td)
  }

  td = document.createElement("td")
  btn = newBtn("Any Flannel", "btn freeBtn")
  td.appendChild(btn)
  tr.appendChild(td)

  for (i = 0; i < 2; i++) {
    td = document.createElement("td")
    btn = newBtn(randomizeFlannel(localOptions), "btn regBtn")
    td.appendChild(btn)
    tr.appendChild(td)
  }

  tr.className = "bingoRow"
  return tr
}
function randomizeFlannel(localOptions) {
  idx = Math.floor(Math.random() * localOptions.length)
  val = localOptions[idx]
  localOptions.splice(idx, 1)
  return val
}

function newBtn(label, classes) {
  btn = document.createElement("button")
  btn.innerHTML = label
  btn.className = classes
  btn.onclick = clickReg.bind(btn, btn)

  localStorage.setItem("order", localStorage.getItem("order") + "," + label)
  localStorage.setItem("selection", localStorage.getItem("selection") + "," + btn.className)

  return btn
}

function clickReg(btn) {
  btn.className = "btn selBtn"
  btn.onclick = clickSel.bind(btn, btn)
  check()
}

function clickSel(btn) {
  btn.className = "btn regBtn"
  btn.onclick = clickReg.bind(btn, btn)
}

function clearCard() {
  localStorage.clear();

  location.reload();
}

