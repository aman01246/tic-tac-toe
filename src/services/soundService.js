const clickSound = new Audio("/click.mp3");
const winSound = new Audio("/win.wav");
const drawSound = new Audio("/draw.wav");

let isMuted = false; // 🔇 global control

// 🎛 Toggle mute
export function toggleMute() {
  isMuted = !isMuted;
}

// 📊 Get current state
export function getMuteState() {
  return isMuted;
}

// 🔊 Play sounds safely
export function playClick() {
  if (isMuted) return;
 clickSound.play();
}

export function playWin() {
  if (isMuted) return;
  winSound.play();
}

export function playDraw() {
  if (isMuted) return;
  drawSound.play();
}