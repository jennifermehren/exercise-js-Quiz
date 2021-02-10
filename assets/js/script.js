// ================= Variablen ===============
let rounds;
let clicks = 0;
let counterContainer = document.querySelector("#counter-container");
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


let stone = document.getElementById("stone");
let paper = document.getElementById("paper");
let scissor = document.getElementById("scissor");

 

let compValue = ["scissor", "stone", "paper"];

let compGameInput;
let userGameInput;

// ========== value aus RadioButtons ==========
function setRounds(i) {
  console.log(i);
  rounds = i;
  counter.innerHTML = `0 / ${i}`;
  counterContainer.style.visibility = "visible";
};


radioButtons.forEach((val) => {
  val.addEventListener("click", () => {
    allGameButtons.forEach((btn) => {
     btn.classList.replace("disabled-buttons", "active-buttons")
    });
  })});



// =============  Computer Choice Stein schere oder papier ===========

function randCompValue(choices) {
  return choices[Math.floor(Math.random() * compValue.length)];
}

// ============ Eventlistener auf User Auswahl ========================

allGameButtons.forEach((userChoice) => {
  userChoice.addEventListener("click", () => {
    
    if (userChoice.classList.contains("disabled-buttons")){
      alert("Bitte Runden auswählen");
      return;
    } 
    clicks++;
    console.log(clicks);
    let user = userChoice.getAttribute("dataset");
    let comp = randCompValue(compValue);

    startHead.style.display = "none";
    result.style.display = "block";
    userChoice.style.border = "2px solid rgb(77, 203, 77)";
    userChoice.style.color = "rgb(77, 203, 77)";

    let gameRes = result.innerHTML;
    counter.innerHTML = `${clicks} / ${rounds}`;

  // ============   Spielergebnis für eine Runde ================

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

   
    result.innerHTML = gameRes;
    
    userCounter.innerHTML = userPoints;
    compCounter.innerHTML = compPoints;
    
    //  setTimeout(nextRound => {
      userChoice.style.border = "";
      userChoice.style.color = "";
      //  result.innerHTML = "nächste Runde"
      // }, 2500);
  });
  
});


// =========== restart Game =================

refresh.addEventListener("click", () => {
  location.reload();
})
// User Choice mit Computer Choice vergleichen

// function userValue(x) {
//   if (stone.click) {
//     console.log("stone");
//   }
// }

// if(value == compValue){
//     result.innerHTML = "unentschieden";
// }
// else if(value = )

//   stone.addEventListener("click", () => {
//       compValue();
//     if (userInput.value == compValue) {
//       alert("unentschieden");
//     } else {
//       alert("gewonnen");
//     }
//   });

// console.log(rounds);
