import { useState } from "react";
import { toggleMute, getMuteState } from "../services/soundService";

function MuteButton() {
  const [muted, setMuted] = useState(getMuteState());

  function handleToggle() {
    toggleMute();
    setMuted(getMuteState());
  }

  return (
    <button className="mute-btn" onClick={handleToggle}>
      {muted ? "🔇 Muted" : "🔊 Sound"}
    </button>
  );
}

export default MuteButton;