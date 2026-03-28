import "./index.css";
import Board from "./components/Board";
import Status from "./components/Status";
import ModeSelector from "./components/ModeSelector";
import { useGame } from "./hooks/useGame";
import MuteButton from "./components/MuteButton";
import Background from "./components/Background";

function App() {
  const {
    board,
    isXTurn,
    winner,
    winningLine,
    isDraw,
    handleClick,
    resetGame,
    mode,
    setMode,
    score,
  } = useGame();

  return (
    <>
      {/* <Background /> */}
      <div className="container">
        <h1>Tic Tac Toe</h1>

        {/* 🟡 SHOW MODE SELECTOR FIRST */}
        {!mode ? (
          <ModeSelector setMode={setMode} />
        ) : (
          <>
            <Status winner={winner} isDraw={isDraw} isXTurn={isXTurn} />
            <MuteButton />
            <div className="scoreboard">
              <div>🧑 {score.player}</div>
              <div>🤖 {score.computer}</div>
              <div>🤝 {score.draw}</div>
            </div>
            <Board
              board={board}
              onClick={handleClick}
              winningLine={winningLine}
            />

            <button className="restart" onClick={resetGame}>
              Restart
            </button>
            <p className="credit">Created by Aman</p>
          </>
        )}
      </div>
    </>
  );
}

export default App;
