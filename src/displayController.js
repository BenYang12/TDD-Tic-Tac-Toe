//now that console logic is solid i will begin rendering the board visually
//i'm not modifying the game state, only reflecting it
const { gameBoard } = require("./gameBoard");
const { gameController } = require("./gameController");

const DisplayController = (function () {
  const boardContainer = document.querySelector(".board"); //board container is essentially the board area in html document
  const restartBtn = document.querySelector("#restartBtn");
  const gif = document.querySelector(".result-gif img");

  if (gif) {
    gif.style.display = "none"; //only happens if the gif exists
  }

  async function getGif() {
    if (!gif) {
      return;
    }
    try {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=m4FUqTwXivpShrj2Q37nS94hYiiQsRxD&q=celebration&limit=1&offset=0&rating=pg&lang=en&bundle=messaging_non_clips",
        { mode: "cors" },
      );
      const data = await response.json();
      const url =
        data?.data?.[0]?.images?.downsized_medium?.url ||
        data?.data?.[0]?.images?.original?.url;
      if (url) {
        gif.src = url;
        gif.alt = "celebration gif";
        gif.style.display = "block";
      } else {
        gif.style.display = "none";
      }
    } catch (error) {
      console.log("Failed to fetch GIF", error);
      gif.style.display = "none";
    }
  }

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
      if (winner) {
        status.textContent = `${winner.name} wins!`;
        // Only show a GIF on a WIN
        getGif();
      } else {
        status.textContent = "It's a draw!";
        if (gif) gif.style.display = "none"; // hide on draw
      }
    } else {
      status.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`; //case where switchplayer is called
      if (gif) gif.style.display = "none"; // hide during normal play
    }
  };

  return { render };
})();

module.exports = { DisplayController };
