const base = import.meta.env.BASE_URL;

function createSound(file) {
  try {
    return new Audio(base + file);
  } catch {
    return null;
  }
}

const clickSound = createSound("click.mp3");
const winSound = createSound("win.wav");
const drawSound = createSound("draw.wav");

let isMuted = false;

// 🔇 toggle
export function toggleMute() {
  isMuted = !isMuted;
}

export function getMuteState() {
  return isMuted;
}

// 🔊 SAFE PLAY
function safePlay(sound) {
  if (isMuted || !sound) return;

  try {
    sound.currentTime = 0;
    sound.play().catch(() => {}); // prevent crash
  } catch {console.log("Sound error")}
}

export function playClick() {
  safePlay(clickSound);
}

export function playWin() {
  safePlay(winSound);
}

export function playDraw() {
  safePlay(drawSound);
}