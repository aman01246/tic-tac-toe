 # 🎮 Tic Tac Toe (React + AI)

A modern, responsive **Tic Tac Toe game** built with React, featuring **Single Player (AI)** and **Multiplayer modes**, smooth UI, sound effects, and deployment on GitHub Pages.

---

## 🚀 Live Demo

👉 https://aman01246.github.io/tic-tac-toe/

---

## ✨ Features

* 🎯 **Single Player Mode (AI)**

  * Uses **Minimax Algorithm** for unbeatable gameplay
* 👥 **Multiplayer Mode**

  * Play with a friend on the same device
* 🔊 **Sound Effects**

  * Click, Win, and Draw sounds
  * Mute / Unmute support
* 🎨 **Modern UI**

  * Glassmorphism design
  * Smooth hover & animations
* 📱 **Responsive Design**

  * Works on mobile, tablet, and desktop
* 🏆 **Score Tracking**

  * Player vs Computer vs Draw count
* 🎬 **Animated Background**

  * Subtle neon-style motion effects

---

## 🧠 Tech Stack

* ⚛️ React (Vite)
* 🎨 CSS3 (Responsive + Glass UI)
* 🤖 Minimax Algorithm (AI logic)
* 🎞 GSAP (Background animation)
* 🔊 HTML5 Audio API
* 🌐 GitHub Pages (Deployment)

---

## 📂 Project Structure

```bash
src/
 ├── components/
 │   ├── Board.jsx
 │   ├── Square.jsx
 │   ├── Status.jsx
 │   ├── ModeSelector.jsx
 │   ├── MuteButton.jsx
 │
 ├── hooks/
 │   └── useGame.js
 │
 ├── utils/
 │   ├── checkWinner.js
 │   ├── minimax.js
 │   ├── gameHelpers.js
 │
 ├── services/
 │   └── soundService.js
 │
 ├── App.jsx
 └── main.jsx

public/
 ├── click.mp3
 ├── win.wav
 ├── draw.wav
```

---

## 🎮 How to Play

* Choose **Single Player** or **Multiplayer**
* Click on any square to place your move
* First to align 3 marks wins
* AI will respond automatically in single-player mode

---

## 🔮 Future Improvements

* 🎉 Win popup / animations
* 🧠 Difficulty levels (Easy / Medium / Hard)
* 🌐 Online multiplayer (Socket.io)
* 📲 PWA support (installable app)

---

## 👨‍💻 Author

**Aman Kumar**

* GitHub: https://github.com/aman01246

---

