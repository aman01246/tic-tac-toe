
import { useReducer, useEffect } from "react";
import { gameReducer, initialState } from "./gameReducer";
import { checkWinner } from "../utils/checkWinner";
import { isBoardFull } from "../utils/gameHelpers";
import { playClick, playWin, playDraw } from "../services/soundService";

export function useGame() {
  // =========================================================
  // ⚛️ STATE MANAGEMENT (Reducer handles all logic)
  // =========================================================
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // 📦 Extract required state
  const { board, isXTurn, mode, score, difficulty } = state;

  // =========================================================
  // 🧠 DERIVED STATE (calculated every render)
  // =========================================================
  const result = checkWinner(board);       // 🏆 winner + winning line
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const isDraw = !winner && isBoardFull(board); // 🤝 no winner + board full
  
  // =========================================================
  // 🤖 AI EFFECT (runs when it's AI turn in single mode)
  // =========================================================
  useEffect(() => {
    if (mode === "single" && !isXTurn && !winner && !isDraw) {
      // ⏱ Add delay to simulate "thinking"
      const timeout = setTimeout(() => {
        dispatch({ type: "AI_MOVE" });
      }, 500);

      // 🧹 Cleanup timeout
      return () => clearTimeout(timeout);
    }
  }, [isXTurn, mode, winner, isDraw]);

  // =========================================================
  // 🔊 SOUND EFFECTS (side effects only)
  // =========================================================
  useEffect(() => {
    if (winner || isDraw) {
      winner ? playWin() : playDraw();
    }
  }, [winner, isDraw]);

  // =========================================================
  // 🎮 ACTIONS (UI triggers these)
  // =========================================================

  // 🖱 Player click handler
  const handleClick = (index) => {
    playClick(); // 🔊 click sound
    dispatch({ type: "PLAYER_MOVE", payload: index });
  };

  // 🔄 Reset game (keep score)
  const resetGame = () => dispatch({ type: "RESET" });

  const resetAll = () => dispatch({ type: "RESET_ALL" });

  // 🎮 Set game mode (single / multi)
  const setMode = (mode) =>
    dispatch({ type: "SET_MODE", payload: mode });

  // 🎯 Set AI difficulty
  const setDifficulty = (level) =>
    dispatch({ type: "SET_DIFFICULTY", payload: level });

  // =========================================================
  // 📦 EXPOSE API TO COMPONENTS
  // =========================================================
  return {
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
    difficulty,
    setDifficulty,
    score,
  };
}