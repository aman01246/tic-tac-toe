function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square 
        ${value === "X" ? "x" : ""} 
        ${value === "O" ? "o" : ""} 
        ${isWinning ? "win" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
export default Square;