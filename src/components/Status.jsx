function Status({ winner, isDraw, isXTurn }) {
  return (
    <h2 className="status">
      {winner
        ? `Winner: ${winner}`
        : isDraw
        ? "It's a Draw 🤝"
        : `Turn: ${isXTurn ? "X" : "O"}`}
    </h2>
  );
}

export default Status;