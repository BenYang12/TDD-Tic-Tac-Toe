// gameController.tests.js
const { gameController } = require("./gameController");

describe("gameController: startGame", () => {
  test("initializes board, players, and state", () => {
    gameController.startGame("Ben", "John");
    const { board, currentPlayer, isOver, winner } =
      gameController.getGameState();

    expect(board).toEqual(["", "", "", "", "", "", "", "", ""]); // empty 3x3
    expect(currentPlayer.name).toBe("Ben");
    expect(currentPlayer.marker).toBe("X");
    expect(isOver).toBe(false);
    expect(winner).toBe(null);
  });
});

describe("gameController: playTurn basics", () => {
  test("places marker and switches player on a valid move", () => {
    gameController.startGame("P1", "P2");
    gameController.playTurn(0); // X placed at  0

    let { board, currentPlayer } = gameController.getGameState();
    expect(board[0]).toBe("X");
    expect(currentPlayer.marker).toBe("O"); // switched to O
  });

  test("rejects move into occupied cell and does not switch turn", () => {
    gameController.startGame("P1", "P2");
    gameController.playTurn(0); // X at 0
    const before = gameController.getGameState();

    gameController.playTurn(0); // invalid (occupied)
    const after = gameController.getGameState();

    expect(after.board).toEqual(before.board); // unchanged
    expect(after.currentPlayer.marker).toBe("O"); // still O (no switch on invalid)
  });
});

describe("gameController: win and tie detection", () => {
  test("detects a win and sets winner/current state", () => {
    // X wins top row: 0,1,2 with O playing elsewhere
    gameController.startGame("Xplayer", "Oplayer");
    gameController.playTurn(0);
    gameController.playTurn(3);
    gameController.playTurn(1);
    gameController.playTurn(4);
    gameController.playTurn(2);

    const { isOver, winner } = gameController.getGameState();
    expect(isOver).toBe(true);
    expect(winner).not.toBe(null);
    expect(winner.name).toBe("Xplayer");
    expect(winner.marker).toBe("X");
  });

  test("detects a tie (full board, no winner)", () => {
    gameController.startGame("P1", "P2");
    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    moves.forEach((i) => gameController.playTurn(i));

    const { isOver, winner } = gameController.getGameState();
    expect(isOver).toBe(true);
    expect(winner).toBe(null);
  });
});

describe("gameController: resetGame", () => {
  test("resets board and state, currentPlayer back to X", () => {
    gameController.startGame("A", "B");
    gameController.playTurn(0);
    gameController.resetGame();

    const { board, currentPlayer, isOver, winner } =
      gameController.getGameState();
    expect(board).toEqual(["", "", "", "", "", "", "", "", ""]);
    expect(currentPlayer.marker).toBe("X");
    expect(isOver).toBe(false);
    expect(winner).toBe(null);
  });
});
