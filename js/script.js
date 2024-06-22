var images = new Array(
  ["src/rock-battle.png"],
  ["src/rock-battle.png"],
  ["src/paper-battle.png"],
  ["src/scissors-battle.png"],
  ["src/paper-battle.png"],
  ["src/scissors-battle.png"]
);
//Tabla de verdad con los valores del CPU (fila) y del USuario(columna) siendo asi matris[cpu].[usuario] y esto devuelve un resultado, por ejemplo matris.[1].[1] devuelve empata porque seria matris.[piedra].[piedra] y estos al ser iguales, sería un empate. 3 y 1
var tablePPT = [
  ["", "Rock", "Paper", "Siccsor"],
  ["Rock", "tie", "winner", "loser"],
  ["Paper", "loser", "tie", "winner"],
  ["Siccsor", "winner", "loser", "tie"],
];

let index = 0;
let image = document.getElementById("cpuImage");
const btnRock = document.getElementById("btnRock");
const btnPaper = document.getElementById("btnPaper");
const btnScissors = document.getElementById("btnScissors");
const btns = document.querySelectorAll(".choice__buttons");
const userResults = document.getElementById("userResults");
const cpuResults = document.getElementById("cpuResults");
let userImage = document.getElementById("userImage");
let textAllWinsUser = document.getElementById("textAllWinsUser");
let textAllWinsCpu = document.getElementById("textAllWinsCpu");
let containerAllWinsUser = document.getElementById("textAllWinsUser");
let containerAllWinsCpu = document.getElementById("textAllWinsCpu");
let you = document.getElementById("you");
let cpu = document.getElementById("cpu");
let popup = document.getElementById("popup");
let popupBody = document.getElementById("popupBody");
let popupFooter = document.getElementById("popupFooter");
let btnClosePopup = document.getElementById("btnClosePopup");

let btnSelected;
let userValue;
let cpuValue;
let lengthImages = images.length;
let allWinsUser = 0;
let allWinsCpu = 0;
let min = 1;
let max = 3;
let changeImages;
let textUserResults;
let textCpuResults;
let iconUserResults;
let iconCpuResults;
let wins = false;
let popupTitle = "";
let popupParagraphResults = "";
let btnRestart = `<button class="popup__buttons" type="submit" onclick="restartGame()">Restart</button>`;
let btnContinue = `<button class="popup__buttons" type="submit" onclick="closePopup()">Continue</button>`;
let lastBtnClosePopup = `<a id="btnClosePopup" onclick="closePopup()" class="popup__close">X</a>`;

const btnClicked = function (e) {
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
    index++;
  } else {
    clearInterval(changeImages);
    cpuValue = Math.floor(Math.random() * (max - min + 1) + min);
    image.src = images[cpuValue];
    resultTablePPT = tablePPT[cpuValue][userValue];
    battle(resultTablePPT);
    console.log("Lo que eligio el usuario es: " + userValue);
    console.log("Lo que eligio el CPU es: " + cpuValue);
    console.log(resultTablePPT);


    enableBtns();
    removeBtnSelected();
  }
}


function battle(resultTablePPT) {
  switch (resultTablePPT) {
    case "winner":
      allWinsUser++;
      animatedNumbers(containerAllWinsUser);
      textUserResults = tablePPT[1][2];
      textCpuResults = tablePPT[1][3];
      writeResults(userValue, cpuValue);
      break;
    case "loser":
      allWinsCpu++;
      animatedNumbers(containerAllWinsCpu);
      textUserResults = tablePPT[1][3];
      textCpuResults = tablePPT[1][2];
      writeResults(userValue, cpuValue);
      break;
    case "tie":
      animatedNumbersTie(containerAllWinsCpu, containerAllWinsUser);
      textUserResults = tablePPT[1][1];
      textCpuResults = tablePPT[1][1];
      writeResults(userValue, cpuValue);

      break;
  }
}

function writeResults() {
  iconUserResults = images[userValue];
  iconCpuResults = images[cpuValue];
  textAllWinsUser.innerText = allWinsUser;
  textAllWinsCpu.innerText = allWinsCpu;
  you.classList.remove("winner", "loser", "tie");
  cpu.classList.remove("winner", "loser", "tie");
  you.classList.add(`${textUserResults}`);
  cpu.classList.add(`${textCpuResults}`);
  userResults.innerHTML += `<div class="results ${textUserResults}"> <p class="results__text">${textUserResults}</p>
  <img class="results__icon" src="${iconUserResults}" alt="" /></div>`;
  cpuResults.innerHTML += `<div class="results ${textCpuResults}"> <p class="results__text">${textCpuResults}</p>
  <img class="results__icon" src="${iconCpuResults}" alt="" /></div>`;
  popupExportResults();
}

function animatedNumbers(numberWinnerRound) {
  numberWinnerRound.classList.add("blur-and-movement");
  setTimeout(() => {
    numberWinnerRound.classList.remove("blur-and-movement");
  }, 550);
}

function animatedNumbersTie(containerAllWinsCpu, containerAllWinsUser) {
  containerAllWinsCpu.classList.add("shake-horizontal");
  containerAllWinsUser.classList.add("shake-horizontal");
  setTimeout(() => {
    containerAllWinsCpu.classList.remove("shake-horizontal");
    containerAllWinsUser.classList.remove("shake-horizontal");
  }, 500);
}

function popupExportResults() {
  switch (popupResults()) {
    case "User win 3":
      confetiWin3();
      completePopup("¡Congrats, you are awesome!", "win");
      break;
    case "User win 5":
      confetiWin5();
      completePopup("¡Wow you got it!", "win");
      break;
    case "Cpu win 3":
      confetiLose();
      completePopup("¡Oh no :(!", "lose");
      break;
    case "Cpu win 5":
      confetiLose();
      completePopup("Well...¿who is hungry?", "lose");
      break;
  }
}

function popupResults() {
  if (allWinsUser == 3 && allWinsCpu < 3 && wins == false) {
    popupFooter.innerHTML = btnContinue;
    return "User win 3";
  }
  if (allWinsUser == 5 && allWinsCpu < 5 && wins == true) {
    return "User win 5";
  }
  if (allWinsCpu == 3 && allWinsUser < 3 && wins == false) {
    return "Cpu win 3";
  }
  if (allWinsCpu == 5 && allWinsUser < 5 && wins == true) {
    return "Cpu win 5";
  }
}

function completePopup(popupTitle, popupParagraphResults) {
  wins = !wins;
  openPopup();
  popupBody.innerHTML = `<h2 class="popup__title">${popupTitle}</h2>
  <p class="popup__paragraph">
    You ${popupParagraphResults} with ${allWinsUser} victories and ${allWinsCpu} defeats</p>`;
  if (allWinsUser == 5 || allWinsCpu == 5) {
    popupFooter.innerHTML = btnRestart;
    btnClosePopup.setAttribute("onclick", "restartGame()");
  } else {
    popupFooter.innerHTML = btnRestart + btnContinue;
  }
}

function restartGame() {
  location.reload();
  enableBtns();
}

function openPopup() {
  popup.classList.add("open-popup");
  setTimeout(() => {
    disableBtns();
  }, 500);
}
function closePopup() {
  popup.classList.remove("open-popup");
  enableBtns();
}

/*Confeti Winner best of 5 */

function confetiWin3() {
  let count = 200;
  let defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/*Confeti winner 5 times */

function confetiWin5() {
  let duration = 15 * 1000;
  let animationEnd = Date.now() + duration;
  let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

/*confeti loser */

function confetiLose() {
  let scalar = 3;
  let sad = confetti.shapeFromText({ text: "😢", scalar });

  let defaults = {
    spread: 500,
    ticks: 60,
    gravity: 0,
    decay: 1,
    startVelocity: 6,
    shapes: [sad],
    scalar,
  };
  confetti({
    ...defaults,
    particleCount: 30,
  });

  confetti({
    ...defaults,
    particleCount: 5,
    flat: true,
  });

  confetti({
    ...defaults,
    particleCount: 15,
    scalar: scalar / 2,
  });
}
