function ModeSelector({ setMode, setDifficulty, difficulty }) {
  return (
    <div className="mode-container">

      <h2>Select Game Mode</h2>

      {/* 🎮 Mode Buttons */}
      <div className="mode-buttons">
        <button onClick={() => setMode("single")}>
          🤖 Single Player
        </button>

        <button onClick={() => setMode("multi")}>
          👥 Multiplayer
        </button>
      </div>

      {/* 🎯 Difficulty */}
      <h3>Select Difficulty</h3>

      <div className="difficulty-buttons">

        <button
          className={difficulty === "easy" ? "active" : ""}
          onClick={() => setDifficulty("easy")}
        >
          🟢 Easy
        </button>

        <button
          className={difficulty === "medium" ? "active" : ""}
          onClick={() => setDifficulty("medium")}
        >
          🟡 Medium
        </button>

        <button
          className={difficulty === "hard" ? "active" : ""}
          onClick={() => setDifficulty("hard")}
        >
          🔴 Hard
        </button>

      </div>

    </div>
  );
}

export default ModeSelector;