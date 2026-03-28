export function isBoardFull(board) {
  return board.every(cell => cell !== null);
}