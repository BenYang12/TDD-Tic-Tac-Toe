//game controller IIFE, for controlling flow of game
const { gameBoard } = require("./gameBoard");
const { createPlayer } = require("./createPlayer");

const gameController = (function () {
  let player1;
  let player2;
  let currentPlayer;
  let isOver = false;
  let winner = null;

  const startGame = function (name1 = "Player 1", name2 = "Player 2") {
    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");
    currentPlayer = player1;
    winner = null;
    isOver = false;
    gameBoard.resetBoard();
  };

  const playTurn = function (index) {
    if (isOver || !gameBoard.placeMarker(index, currentPlayer.marker)) {
      //exit playTurn() early if game is over or if someone tries to place their marker in a taken cell
      return;
    }

    if (checkWinner()) {
      //function implemented below
      isOver = true;
      winner = currentPlayer;
    } else if (gameBoard.getBoard().every((square) => square !== "")) {
      //if entire board is filled w/ player markers
      isOver = true; //this is for tie scenario
    } else {
      switchPlayer(); //next turn, function below
      //if isOver is false, turns won't switch until current player makes a valid move
    }
  };

  const checkWinner = function () {
    //hardest part, use .some() and .every()
    const board = gameBoard.getBoard();
    const winCombinations = [
      //use index
      [0, 1, 2], // row win combos
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // column win combos
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // 2 diagonal win combos
      [2, 4, 6],
    ];
    return winCombinations.some(
      (combo) => combo.every((index) => board[index] === currentPlayer.marker), //some() checks if at least one element in an array passes some test
    );
  };

  const switchPlayer = function () {
    currentPlayer = currentPlayer === player1 ? player2 : player1; //simple
  };

  const getGameState = function () {
    return { board: gameBoard.getBoard(), currentPlayer, isOver, winner };
  };

  const resetGame = function () {
    gameBoard.resetBoard();
    currentPlayer = player1;
    winner = null;
    isOver = false;
  };
  return { playTurn, getGameState, resetGame, startGame };
})();

module.exports = { gameController };
