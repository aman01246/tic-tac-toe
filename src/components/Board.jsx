import Square from "./Square";

function Board({ board, onClick, winningLine }) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          isWinning={winningLine.includes(index)}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}

export default Board;