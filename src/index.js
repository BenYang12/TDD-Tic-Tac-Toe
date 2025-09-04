//I want to use Jest for TDD, Webpack, APIs, and the Module Pattern for this project
const { gameController } = require("./gameController");
const { DisplayController } = require("./displayController");
require("./styles.css");

//use this event listener to ensure script is deferred
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector("#startBtn");

  startBtn.addEventListener("click", () => {
    const name1 = document.querySelector("#player-one").value || "Player 1"; //take the user inputted name or have it be Player 1 or 2 by default
    const name2 = document.querySelector("#player-two").value || "Player 2";
    gameController.startGame(name1, name2);
    DisplayController.render();
  });

  const restartBtn = document.querySelector("#restartBtn");
  restartBtn.addEventListener("click", () => {
    gameController.resetGame(); //reset
    DisplayController.render(); //then immedietley render
    restartBtn.style.display = "none"; //forgot to hide restart button after
  });
});
