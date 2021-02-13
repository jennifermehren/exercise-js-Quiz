// ================= Variablen ===============
let rounds;
let clicks = 0;
let compPoints = 0;
let userPoints = 0;

let counterContainer = document.querySelector("#counter-container");
let upperContainer = document.querySelector(".upper-container");
let radioContainer = document.querySelector(".radio-container");

let counter = document.querySelector("#counter");
let userCounter = document.querySelector("#user-points");
let compCounter = document.querySelector("#comp-points");
let startHead = document.querySelector("#start-headline");
let result = document.querySelector("#result");

let allGameButtons = document.querySelectorAll(".game-buttons");
let radioButtons = document.getElementsByName("value");

let compValue = ["scissor", "rock", "paper"];

let refresh = document.getElementById("newGame");


// ========== Eventlistener für RadioButtons ==========
radioButtons.forEach((val) => {
  val.addEventListener("click", () => {
    allGameButtons.forEach((btn) => {
      btn.classList.replace("disabled-buttons", "active-buttons");
      let i = val.value;
      rounds = i;
      counter.innerHTML = `0 / ${i}`;
      counterContainer.style.visibility = "visible";
      upperContainer.innerHTML = ">> Lets Play <<";
      upperContainer.style.fontSize = "1.8rem";
      upperContainer.style.border = "2px solid rgb(77, 203, 77)";
      startHead.innerHTML = "make your Move";
    });
  });
});

// =============  Computer Choice Stein Schere oder Papier ===========
function randCompValue(choices) {
  return choices[Math.floor(Math.random() * compValue.length)];
}

// =============  Game ENDE ===========
function gameEnd() {
  allGameButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      counterContainer.style.visibility = "hidden";
      alert("Restart your Game");
      location.reload();
      return;
    });
  });
}

// =========== next round ===============
function hiddenBtns() {
  allGameButtons.forEach((btn) => {
    btn.style.display = "none";
    upperContainer.style.border = "";
  });
}

function visiblBtns() {
  allGameButtons.forEach((btn) => {
    btn.style.display = "";
    upperContainer.style.border = "2px solid rgb(77, 203, 77)";
  });
}

// ============ Eventlistener auf User Auswahl ========================
allGameButtons.forEach((userChoice) => {
  userChoice.addEventListener("click", () => {
    if (userChoice.classList.contains("disabled-buttons")) {
      alert("Please select rounds.");
      return;
    }
    clicks++;
    radioContainer = "";

    let user = userChoice.getAttribute("dataset");
    let comp = randCompValue(compValue);

    startHead.style.display = "none";
    result.style.display = "block";

    let gameRes = upperContainer.innerHTML;
    counter.innerHTML = `${clicks} / ${rounds}`;
    hiddenBtns();

    // ============   Spielergebnis für eine Runde ================
    console.log(user, comp);
    if (user == comp) {
      gameRes = `It was a draw. </br> You both chose ${user}.`;
    } else if (user == "rock" && comp == "paper") {
      gameRes = "rock loses against paper";
      compPoints++;
    } else if (user == "rock" && comp == "scissor") {
      gameRes = "rock wins against scissor";
      userPoints++;
    } else if (user == "paper" && comp == "rock") {
      gameRes = "paper wins against rock";
      userPoints++;
    } else if (user == "paper" && comp == "scissor") {
      gameRes = "paper loses against scissor";
      compPoints++;
    } else if (user == "scissor" && comp == "rock") {
      gameRes = "scissor loses against rock";
      compPoints++;
    } else if (user == "scissor" && comp == "paper") {
      gameRes = "scissor wins against paper";
      userPoints++;
    }

    upperContainer.innerHTML = gameRes;
    userCounter.innerHTML = userPoints;
    compCounter.innerHTML = compPoints;

    if (clicks == rounds && userPoints > compPoints) {
      upperContainer.innerHTML = "You Are The Winner!";
      hiddenBtns();
      document.querySelector("#winGame").style.display = "block";
      gameEnd();
      return;
    } else if (clicks == rounds && userPoints < compPoints) {
      upperContainer.innerHTML = "You Are The Looser!";
      hiddenBtns();
      document.querySelector("#loseGame").style.display = "block";
      gameEnd();
      return;
    } else if (clicks == rounds && userPoints == compPoints) {
      upperContainer.innerHTML =
        "You are not the winner, </br> but are not the loser either.";
      hiddenBtns();
      document.querySelector("#drawGame").style.display = "block";
      gameEnd();
      return;
    }

    setTimeout(() => {
      if (clicks < rounds) {
        upperContainer.innerHTML = "make your move";
        visiblBtns();
      }
    }, 1800);
  });
});

// =========== restart Game =================
refresh.addEventListener("click", () => {
  location.reload();
});
