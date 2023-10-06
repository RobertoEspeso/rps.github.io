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
let containerAllWinsUser = document.getElementById("textAllWinsUser");
let containerAllWinsCpu = document.getElementById("textAllWinsCpu");
let you = document.getElementById("you");
let computer = document.getElementById("computer");

let btnSelected;
let userValue;
let cpuValue;
let lengthImages = images.length;
let allWinsUser = 0;
let allWinsCpu = 0;
let min = 1;
let max = 3;
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
    case userValue === 1 && cpuValue === 3: //piedra vs tijera
    case userValue === 2 && cpuValue === 1: //papel vs piedra
    case userValue === 3 && cpuValue === 2: // tijera vs papel
      allWinsUser++;
      animatedNumbers(containerAllWinsUser);
      textUserResults = results[0];
      textCpuResults = results[1];
      break;

    case cpuValue === 1 && userValue === 3: //piedra vs tijera
    case cpuValue === 2 && userValue === 1: //papel vs piedra
    case cpuValue === 3 && userValue === 2: // tijera vs papel
      allWinsCpu++;
      animatedNumbers(containerAllWinsCpu);
      textUserResults = results[1];
      textCpuResults = results[0];
      break;

    case cpuValue === userValue: // Empataron
      textUserResults = results[2];
      textCpuResults = results[2];
      animatedNumbersTie(containerAllWinsCpu, containerAllWinsUser);
      break;
  }
  iconUserResults = images[userValue];
  iconCpuResults = images[cpuValue];
  writeResults(userValue, cpuValue);
}

function writeResults() {
  let classUserResults = textUserResults[0].toLowerCase();
  let classCpuResults = textCpuResults[0].toLowerCase();
  textAllWinsUser.innerText = allWinsUser;
  textAllWinsCpu.innerText = allWinsCpu;
  you.classList.remove("winner", "loser", "tie");
  computer.classList.remove("winner", "loser", "tie");
  you.classList.add(classUserResults);
  computer.classList.add(classCpuResults);
  userResults.innerHTML += `<div class="player-results ${classUserResults}"> <p>${textUserResults}</p>
  <img class="icon-results" src="${iconUserResults}" alt="" /></div>`;
  cpuResults.innerHTML += `<div class="cpu-results ${classCpuResults}"> <p>${textCpuResults}</p>
  <img class="icon-results" src="${iconCpuResults}" alt="" /></div>`;
}

function animatedNumbers(numberWinnerRound) {
  numberWinnerRound.classList.add("blur-and-movement");
  setTimeout(() => {
    numberWinnerRound.classList.remove("blur-and-movement");
  }, 500);
}

function animatedNumbersTie(containerAllWinsCpu, containerAllWinsUser) {
  containerAllWinsCpu.classList.add("shake-horizontal");
  containerAllWinsUser.classList.add("shake-horizontal");
  setTimeout(() => {
    containerAllWinsCpu.classList.remove("shake-horizontal");
    containerAllWinsUser.classList.remove("shake-horizontal");
  }, 500);
}
