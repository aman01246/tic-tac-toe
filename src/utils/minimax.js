import { checkWinner } from "./checkWinner";

export function getBestMove(board) {
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

// 🎲 EASY / MEDIUM SUPPORT
export function getRandomMove(board) {
  const emptyCells = board
    .map((val, i) => (val === null ? i : null))
    .filter(i => i !== null);

  if (emptyCells.length === 0) return null;

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// 🧠 MINIMAX
function minimax(board, depth, isMaximizing) {
  const result = checkWinner(board);

  if (result?.winner === "O") return 10 - depth;
  if (result?.winner === "X") return depth - 10;
  if (board.every(cell => cell !== null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore;
  }
}