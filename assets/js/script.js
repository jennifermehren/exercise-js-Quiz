// ================= Variablen ===============
let rounds;
let clicks = 0;
let counterContainer = document.querySelector("#counter-container");
let upperContainer = document.querySelector(".upper-container");
let radioContainer = document.querySelector(".radio-container")
let counter = document.querySelector("#counter");
let userCounter = document.querySelector("#user-points");
let compCounter = document.querySelector("#comp-points");
let startHead = document.querySelector("#start-headline");
let result = document.querySelector("#result");
let compPoints = 0;
let userPoints = 0;
let refresh = document.getElementById("newGame");

let allGameButtons = document.querySelectorAll(".game-buttons");
let radioButtons = document.getElementsByName("value");

let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissor = document.getElementById("scissor");

let compValue = ["scissor", "rock", "paper"];

let compGameInput;
let userGameInput;

// ========== value aus RadioButtons ==========
function setRounds(i) {
  console.log(i);
  rounds = i;
  counter.innerHTML = `0 / ${i}`;
  counterContainer.style.visibility = "visible";
}

// ========== Eventlistener für RadioButtons ==========
radioButtons.forEach((val) => {
  val.addEventListener("click", () => {
    allGameButtons.forEach((btn) => {
      btn.classList.replace("disabled-buttons", "active-buttons");
      upperContainer.innerHTML = "Lets-Play";
      upperContainer.style.fontSize = "2rem";
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
      btn.style.visibility = "hidden"; 
  });
}

function visiblBtns() {
  allGameButtons.forEach((btn) => {
      btn.style.visibility = "visible"; 
  });
}

// ============ Eventlistener auf User Auswahl ========================
allGameButtons.forEach((userChoice) => {
  userChoice.addEventListener("click", () => {
    if (userChoice.classList.contains("disabled-buttons")) {
      alert("Bitte Runden auswählen");
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
      gameRes = "Unentschieden";
      
    } else if (user == "rock" && comp == "paper") {
      gameRes = "Stein verliert gegen Papier";
      
      compPoints++;
    } else if (user == "rock" && comp == "scissor") {
      gameRes = "Stein gewinnt gegen Schere";
      
      userPoints++;
    } else if (user == "paper" && comp == "rock") {
      gameRes = "Papier gewinnt gegen Stein";
      
      userPoints++;
    } else if (user == "paper" && comp == "scissor") {
      gameRes = "Papier verliert gegen Schere";
     
      compPoints++;
    } else if (user == "scissor" && comp == "rock") {
      gameRes = "Schere verliert gegen Stein";
      
      
      compPoints++;
    } else if (user == "scissor" && comp == "paper") {
      gameRes = "Schere gewinnt gegen Papier";
      
      userPoints++;
    }

    upperContainer.innerHTML = gameRes;
    userCounter.innerHTML = userPoints;
    compCounter.innerHTML = compPoints;

    if (clicks == rounds && userPoints > compPoints) {
      upperContainer.innerHTML = "You Are The Winner!";
      gameEnd();
      return;
    } else if (clicks == rounds && userPoints < compPoints) {
      upperContainer.innerHTML = "You Are The Looser!";
      gameEnd();
      return;
    } else if (clicks == rounds && userPoints == compPoints) {
      upperContainer.innerHTML = "You are not the winner, but even not the Looser.";
      gameEnd();
      return;
    }

    setTimeout(() => {
      if (clicks < rounds) {
        upperContainer.innerHTML = "MAKE YOUR MOVE";
        visiblBtns();
      }
    }, 1800);
  });
});


// =========== restart Game =================

refresh.addEventListener("click", () => {
  location.reload();
});

