
import { checkWinner } from "../utils/checkWinner";
import { isBoardFull } from "../utils/gameHelpers";
import { getBestMove, getRandomMove } from "../utils/minimax";

// =========================================================
// 🎯 AI MOVE LOGIC (pure function)
// =========================================================
export function getAIMove(board, difficulty) {

  // 🟢 Easy → completely random
  if (difficulty === "easy") {
    return getRandomMove(board);
  }

  // 🟡 Medium → mix of smart + random
  if (difficulty === "medium") {
    return Math.random() < 0.5
      ? getBestMove(board)
      : getRandomMove(board);
  }

  // 🔴 Hard → optimal (minimax)
  return getBestMove(board);
}

// =========================================================
// 🧠 GAME EVALUATION LOGIC
// =========================================================
export function evaluateGame(board, currentScore, startingPlayer) {

  // 🏆 Check winner
  const result = checkWinner(board);

  // 🤝 Check draw
  const isDraw = !result?.winner && isBoardFull(board);

  let newScore = currentScore;
  let gameOver = false;
  let nextStarter = startingPlayer;

  // 🏁 If game finished
  if (result?.winner || isDraw) {
    gameOver = true;

    // 🔁 Decide next starter
    if (result?.winner === "X") nextStarter = "X";
    else if (result?.winner === "O") nextStarter = "O";
    else nextStarter = startingPlayer === "X" ? "O" : "X";

    // 📊 Update score
    if (result?.winner === "X") {
      newScore = { ...currentScore, player: currentScore.player + 1 };
    } else if (result?.winner === "O") {
      newScore = { ...currentScore, computer: currentScore.computer + 1 };
    } else {
      newScore = { ...currentScore, draw: currentScore.draw + 1 };
    }
  }

  return {
    result,        // 🧠 full result (optional usage)
    isDraw,
    newScore,
    gameOver,
    nextStarter,
  };
}