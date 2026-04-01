import "./index.css";
import Board from "./components/Board";
import Status from "./components/Status";
import ModeSelector from "./components/ModeSelector";
import { useGame } from "./hooks/useGame";
import MuteButton from "./components/MuteButton";
import { useSwipeBack } from "./hooks/useSwipeBack";

function App() {
  const {
    board,
    isXTurn,
    winner,
    winningLine,
    isDraw,
    handleClick,
    resetGame,
    resetAll,
    mode,
    setMode,
    setDifficulty,
    difficulty,
    score,
  } = useGame();

    const handleBack = () => {
    resetGame();
    setMode(null);
  };

  const { handlePointerDown, handlePointerMove, handlePointerUp } =
    useSwipeBack({
      mode,
      onBack: handleBack,
    });



  return (
    <>
      <div
        className="container"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <h1>Tic Tac Toe</h1>

        <h2 className="game-info">
          {mode === "single" ? (
            <>
              <span className="mode-label">🤖 Single Player</span>
              <span className={`difficulty-badge ${difficulty}`}>
                🎯 {difficulty.toUpperCase()}
              </span>
            </>
          ) : (
            <span className="mode-label">👥 Multiplayer</span>
          )}
        </h2>

        {/* 🟡 SHOW MODE SELECTOR FIRST */}
        {!mode ? (
          <ModeSelector
            setMode={setMode}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
          />
        ) : (
          <>
            <Status winner={winner} isDraw={isDraw} isXTurn={isXTurn} />
            <MuteButton />

            {/* ✅ BACK BUTTON */}
            <button
              className="back"
              onClick={() => {
                resetAll();
              }}
            >
              ⬅ Back
            </button>

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
