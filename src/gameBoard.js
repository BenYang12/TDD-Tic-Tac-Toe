//Gameboard Module
//Store gameboard as array inside gameboard object
//I only need a single instance of Gameboard => wrap its factory inside an IIFE
//Intuitively, gameboard factory should have methods to get, update, and reset the board
//Closures will make this possible
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""]; // 3x3 board, private variable

  //get method
  const getBoard = () => [...board];

  //reset method
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  //update board
  const placeMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    } else {
      return false; //If space isn't open, return false so we can use in GameController
    }
  };

  return { getBoard, resetBoard, placeMarker };
})();

module.exports = { gameBoard };
