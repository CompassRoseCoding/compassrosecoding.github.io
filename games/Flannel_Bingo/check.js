/**
 * EXAMPLE_ME
 * @param
 * @returns
*/
function check() {
  checkH()
  checkV()
  checkD1()
  checkD2()
  updateSelection()
}

/**
 * EXAMPLE_ME
 * @param
 * @returns
*/
function updateSelection() {
  btns = document.getElementsByClassName("btn")
  localStorage.setItem("selection", "")
  for (i = 0; i < btns.length; i++) {
    localStorage.setItem("selection", localStorage.getItem("selection") + "," + btns[i].className)
  }
}

/**
 * EXAMPLE_ME
 * @param
 * @returns
*/
function checkH() {
  btns = document.getElementsByClassName("btn")
  for (i = 0; i < 5; i++) {
    row = true;
    for (j = 0; j < 5; j++) {
      if (btns[i * 5 + j].className.includes("regBtn")) {
        row = false;
      }
    }
    if (row) {
      for (j = 0; j < 5; j++) {
        btns[i * 5 + j].className = "btn winBtn"
      }
      resetWindow();
      return
    }
  }
}

/**
 * EXAMPLE_ME
 * @param
 * @returns
*/
function checkV() {
  btns = document.getElementsByClassName("btn")
  for (i = 0; i < 5; i++) {
    row = true;
    for (j = 0; j < 5; j++) {
      if (btns[j * 5 + i].className.includes("regBtn")) {
        row = false;
      }
    }
    if (row) {
      for (j = 0; j < 5; j++) {
        btns[j * 5 + i].className = "btn winBtn"
      }
      resetWindow();
      return
    }
  }
}

/**
 * EXAMPLE_ME
 * @param
 * @returns
*/
function checkD1() {
  btns = document.getElementsByClassName("btn")
  row = true;
  for (i = 0; i < 25; i = i + 6) {
    if (btns[i].className.includes("regBtn")) {
      row = false;
    }
  }
  if (row) {
    for (i = 0; i < 25; i = i + 6) {
      btns[i].className = "btn winBtn"
    }
    resetWindow();
  }
}

/**
 * EXAMPLE_ME
 * @param
 * @returns
*/
function checkD2() {
  btns = document.getElementsByClassName("btn")
  row = true;
  for (i = 4; i < 23; i = i + 4) {
    if (btns[i].className.includes("regBtn")) {
      row = false;
    }
  }
  if (row) {
    for (i = 4; i < 23; i = i + 4) {
      btns[i].className = "btn winBtn"
    }
    resetWindow();
  }
}

/**
 * EXAMPLE_ME
 * @param
 * @returns
*/
async function resetWindow() {
  await new Promise(r => setTimeout(r, 500));
  if (confirm("You've won! New card?")) {
    clearCard()
  }
}