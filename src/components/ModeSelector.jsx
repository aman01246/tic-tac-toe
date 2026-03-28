
function ModeSelector({ setMode }) {
  return (
   <div className="mode">
      <button className="mode-btn" onClick={() => setMode("single")}>
        🤖 Single Player
      </button>
      <button className="mode-btn" onClick={() => setMode("multi")}>
        👥 Multiplayer
      </button>
    </div>
  );
}

export default ModeSelector;