var images = new Array(
  ["src/rock-battle.png"],
  ["src/rock-battle.png"],
  ["src/paper-battle.png"],
  ["src/scissors-battle.png"],
  ["src/paper-battle.png"],
  ["src/scissors-battle.png"]
);

let index = 0;
let image = document.getElementById("cpuImage");
const btnRock = document.getElementById("btnRock");
const btnPaper = document.getElementById("btnPaper");
const btnScissors = document.getElementById("btnScissors");
const btns = document.querySelectorAll(".buttons");
const userResults = document.getElementById("userResults");
const cpuResults = document.getElementById("cpuResults");
let userImage = document.getElementById("userImage");
let textWinsUSer = document.getElementById("textWinsUSer");
let textWinsCpu = document.getElementById("textWinsCpu");

let btnSelected;
let userValue;
let lengthImages = images.length;
let winsUser = 0;
let winsCpu = 0;
let min = 1;
let max = 3;
let cpuValue;
let changeImages;

const btnClicked = function (e) {
  console.log(`El texto que tiene el boton clickeado es: ${this.innerText}`);
  console.log(
    `El contenido html que tiene el boton clickeado es: ${this.innerHTML}`
  );
  let userTextSelection = this.innerHTML;
  if (userTextSelection.includes("Rock")) {
    userImage.attributes.src.value = "src/rock-battle.png";
    userValue = 1;
  } else if (userTextSelection.includes("Paper")) {
    userImage.attributes.src.value = "src/paper-battle.png";
    userValue = 2;
  } else {
    userImage.attributes.src.value = "src/scissors-battle.png";
    userValue = 3;
  }
  this.classList.add("btnChosenUser");
  btnSelected = this.classList;
  console.log(btnSelected);
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
    console.log(`Este es el valor del cpu ${images[cpuValue]}`);
    console.log(cpuValue);
    battle();
    enableBtns();
    removeBtnSelected();
  }
}

function battle() {
  switch (true) {
    case userValue === 1 && cpuValue === 3:
      //piedra vs tijera
      winsUser++;
      writeResults(userValue, cpuValue);
      break;
    case userValue === 2 && cpuValue === 1:
      //papel vs piedra
      winsUser++;
      writeResults(userValue, cpuValue);
      alert("Ganaste papel vs piedra");
      break;
    case userValue === 3 && cpuValue === 2:
      // tijera vs papel
      winsUser++;
      writeResults(userValue, cpuValue);
      alert("Ganaste tijera vs apapel");
      break;

    case cpuValue === 1 && userValue === 3:
      //piedra vs tijera
      winsCpu++;
      writeResults(userValue, cpuValue);
      alert("perdistes piedra vs tijera");
      break;
    case cpuValue === 2 && userValue === 1:
      //papel vs piedra
      winsCpu++;
      writeResults(userValue, cpuValue);
      alert("perdistes papel vs piedra");
      break;
    case cpuValue === 3 && userValue === 2:
      // tijera vs papel
      winsCpu++;
      writeResults(userValue, cpuValue);
      alert("perdistes tijera vs apapel");
      break;
    case cpuValue === userValue:
      // Empataron
      alert("Empataron");
      break;
  }
}

function writeResults(userValue, cpuValue) {
  textWinsUSer.innerText = winsUser;
  textWinsCpu.innerText = winsCpu;
}
