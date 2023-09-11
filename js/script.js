var images = new Array(
  ["src/rock-battle.png"],
  ["src/rock-battle.png"],
  ["src/paper-battle.png"],
  ["src/scissors-battle.png"],
  ["src/paper-battle.png"],
  ["src/scissors-battle.png"]
);

var results = new Array(["Winner"], ["Loser"], ["Tie"]);

let index = 0;
let image = document.getElementById("cpuImage");
const btnRock = document.getElementById("btnRock");
const btnPaper = document.getElementById("btnPaper");
const btnScissors = document.getElementById("btnScissors");
const btns = document.querySelectorAll(".buttons");
const userResults = document.getElementById("userResults");
const cpuResults = document.getElementById("cpuResults");
let userImage = document.getElementById("userImage");
let textAllWinsUser = document.getElementById("textAllWinsUser");
let textAllWinsCpu = document.getElementById("textAllWinsCpu");

let btnSelected;
let userValue;
let lengthImages = images.length;
let allWinsUser = 0;
let allWinsCpu = 0;
let min = 1;
let max = 3;
let cpuValue;
let changeImages;
let textUserResults = "";
let textCpuResults = "";
let iconUserResults;
let iconCpuResults;

const btnClicked = function (e) {
  // console.log(`El texto que tiene el boton clickeado es: ${this.innerText}`);
  // console.log(`El contenido html que tiene el boton clickeado es: ${this.innerHTML}`);
  let userTextSelection = this.innerHTML;
  if (userTextSelection.includes("Rock")) {
    userImage.attributes.src.value = images[1];
    userValue = 1;
  } else if (userTextSelection.includes("Paper")) {
    userImage.attributes.src.value = images[2];
    userValue = 2;
  } else {
    userImage.attributes.src.value = images[3];
    userValue = 3;
  }
  this.classList.add("btnChosenUser");
  btnSelected = this.classList;
  //console.log(btnSelected);
  return userValue;
};

function removeBtnSelected() {
  btnSelected.remove("btnChosenUser");
}

btns.forEach((btn) => {
  btn.addEventListener("click", btnClicked);
});

function disableBtns() {
  btnRock.disabled = true;
  btnPaper.disabled = true;
  btnScissors.disabled = true;
}

function enableBtns() {
  btnRock.disabled = false;
  btnPaper.disabled = false;
  btnScissors.disabled = false;
}

function timerChangeImages() {
  disableBtns();
  changeImages = setInterval(ppt, 100);
  index = 0;
}

function ppt() {
  if (index < lengthImages) {
    image.src = images[index];
    //    console.log(images[index]);
    //    console.log(index);
    index++;
  } else {
    clearInterval(changeImages);
    cpuValue = Math.floor(Math.random() * (max - min + 1) + min);
    image.src = images[cpuValue];
    //console.log(`Este es el valor del cpu ${images[cpuValue]}`);
    //console.log(cpuValue);
    battle();
    enableBtns();
    removeBtnSelected();
  }
}

function battle() {
  switch (true) {
    case userValue === 1 && cpuValue === 3:
      //piedra vs tijera
      allWinsUser++;
      textUserResults = results[0];
      textCpuResults = results[1];
      iconUserResults = images[userValue];
      iconCpuResults = images[cpuValue];
      writeResults(userValue, cpuValue);
      break;
    case userValue === 2 && cpuValue === 1:
      //papel vs piedra
      allWinsUser++;
      textUserResults = results[0];
      textCpuResults = results[1];
      iconUserResults = images[userValue];
      iconCpuResults = images[cpuValue];
      writeResults(userValue, cpuValue);
      break;
    case userValue === 3 && cpuValue === 2:
      // tijera vs papel
      allWinsUser++;
      textUserResults = results[0];
      textCpuResults = results[1];
      iconUserResults = images[userValue];
      iconCpuResults = images[cpuValue];
      writeResults(userValue, cpuValue);
      break;

    case cpuValue === 1 && userValue === 3:
      //piedra vs tijera
      allWinsCpu++;
      textUserResults = results[1];
      textCpuResults = results[0];
      iconUserResults = images[userValue];
      iconCpuResults = images[cpuValue];
      writeResults(userValue, cpuValue);
      break;
    case cpuValue === 2 && userValue === 1:
      //papel vs piedra
      allWinsCpu++;
      textUserResults = results[1];
      textCpuResults = results[0];
      iconUserResults = images[userValue];
      iconCpuResults = images[cpuValue];
      writeResults(userValue, cpuValue);
      break;
    case cpuValue === 3 && userValue === 2:
      // tijera vs papel
      allWinsCpu++;
      textUserResults = results[1];
      textCpuResults = results[0];
      iconUserResults = images[userValue];
      iconCpuResults = images[cpuValue];
      writeResults(userValue, cpuValue);
      break;
    case cpuValue === userValue:
      textUserResults = results[2];
      textCpuResults = results[2];
      iconUserResults = images[userValue];
      iconCpuResults = images[cpuValue];
      writeResults(userValue, cpuValue);
      // Empataron
      break;
  }
}

function writeResults() {
  textAllWinsUser.innerText = allWinsUser;
  textAllWinsCpu.innerText = allWinsCpu;
  userResults.innerHTML += `<div class="player-results"> <p>${textUserResults}</p>
  <img class="icon-results" src="${iconUserResults}" alt="" /></div>`;
  cpuResults.innerHTML += `<div class="cpu-results"> <p>${textCpuResults}</p>
  <img class="icon-results" src="${iconCpuResults}" alt="" /></div>`;
}
