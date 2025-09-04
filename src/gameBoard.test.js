const { gameBoard } = require("./gameBoard");
beforeEach(() => gameBoard.resetBoard());

describe("test gameboard creation", () => {
  test("default", () => {
    expect(gameBoard.getBoard()).toEqual(["", "", "", "", "", "", "", "", ""]);
  });
});

describe("test placeMarker", () => {
  test("correct placement", () => {
    gameBoard.placeMarker(0, "X");
    expect(gameBoard.getBoard()).toEqual(["X", "", "", "", "", "", "", "", ""]);
  });
});
