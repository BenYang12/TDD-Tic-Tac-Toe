//now that console logic is solid i will begin rendering the board visually
//i'm not modifying the game state, only reflecting it
const { gameBoard } = require("./gameBoard");
const { createPlayer } = require("./createPlayer");
const { gameController } = require("./gameController");

const DisplayController = (function () {
  const boardContainer = document.querySelector(".board"); //board container is essentially the board area in html document
  const restartBtn = document.querySelector("#restartBtn");
  const render = function () {
    //to fix bug of board clumping up I need to clear board everytime I render
    boardContainer.textContent = "";
    const { board, currentPlayer, winner, isOver } =
      gameController.getGameState(); //make sure to get the most updated board along with everything else

    board.forEach((cell, index) => {
      //for each "cell" in our array, this is essentially pointing to each "space" in the tic tac toe board
      const cellBtn = document.createElement("button"); //create button
      cellBtn.classList.add("cell"); //add a class to manipulate with css later
      cellBtn.textContent = cell; //add the original text of the list index to the button, at first, this will be just empty
      cellBtn.dataset.index = index;

      cellBtn.addEventListener("click", () => {
        //key part
        gameController.playTurn(index);
        render();
      });
      boardContainer.appendChild(cellBtn);
    });

    updateStatus(currentPlayer, winner, isOver);
  };

  const updateStatus = (currentPlayer, winner, isOver) => {
    const status = document.querySelector(".status");
    if (isOver) {
      restartBtn.style.display = "block"; //show restart button when game is over
      status.textContent = winner ? `${winner.name} wins!` : "It's a draw!";
    } else {
      status.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`; //case where switchplayer is called
    }
  };
  return { render };
})();

module.exports = { DisplayController };
