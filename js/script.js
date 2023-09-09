var images = new Array(
  ["src/rock-battle.png"],
  ["src/paper-battle.png"],
  ["src/scissors-battle.png"],
  ["src/rock-battle.png"],
  ["src/paper-battle.png"],
  ["src/scissors-battle.png"]
);

let index = 0;
let image = document.getElementById("cpuImage");
const btnRock = document.getElementById("btnRock");
const btnPaper = document.getElementById("btnPaper");
const btnScissors = document.getElementById("btnScissors");
const btns = document.querySelectorAll(".buttons");
let userImage = document.getElementById("userImage");
let btnSelected;
let userSelection;
let lengthImages = images.length;
let min = 1;
let max = 3;
let cpuValue = 0;
let changeImages;

const btnClicked = function (e) {
  console.log(`El texto que tiene es: ${this.innerText}`);
  console.log(`El contenido html que tiene es: ${this.innerHTML}`);
  let userTextSelection = this.innerHTML;
  if (userTextSelection.includes("Rock")) {
    userImage.attributes.src.value = "src/rock-battle.png";
  } else if (userTextSelection.includes("Paper")) {
    userImage.attributes.src.value = "src/paper-battle.png";
  } else {
    userImage.attributes.src.value = "src/scissors-battle.png";
  }
  this.classList.add("btnChosenUser");
  btnSelected = this.classList;
  console.log(btnSelected);
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
    cpuValue = Math.floor(Math.random() * (max - min + 1) + min);
    image.src = images[cpuValue];
    console.log(`Este es el valor del cpu ${images[cpuValue]}`);
    console.log(cpuValue);
    enableBtns();
    removeBtnSelected();
    clearInterval(changeImages);
  }
}
