import { useReducer, useEffect } from "react";
import { checkWinner } from "../utils/checkWinner";
import { getBestMove } from "../utils/minimax";
import { isBoardFull } from "../utils/gameHelpers";
import { playClick, playWin, playDraw } from "../services/soundService";

// =========================================================
// 🎯 INITIAL STATE (single source of truth)
// =========================================================
const initialState = {
  board: Array(9).fill(null),
  isXTurn: true,
  startingPlayer: "X", // 🆕 who starts NEXT game
  mode: null,
  gameOver: false,
  score: {
    player: 0,
    computer: 0,
    draw: 0
  }
};

// =========================================================
// 🧠 REDUCER (ALL GAME LOGIC LIVES HERE)
// =========================================================
function gameReducer(state, action) {
  switch (action.type) {

    // 🎮 SET GAME MODE (single / multi)
    case "SET_MODE":
      return { ...state, mode: action.payload };

    // =====================================================
    // 🖱 PLAYER MOVE
    // =====================================================
    case "PLAYER_MOVE": {

      // ❌ Prevent invalid moves
      if (state.board[action.payload] || state.gameOver) return state;

      const newBoard = [...state.board];

      // 👥 Multiplayer OR 🤖 Single player
      newBoard[action.payload] =
        state.mode === "multi"
          ? (state.isXTurn ? "X" : "O")
          : "X";

      // 🧠 Check result after move
      const result = checkWinner(newBoard);
      const isDraw = !result?.winner && isBoardFull(newBoard);

      let newScore = state.score;
      let gameOver = false;
      let nextStarter = state.startingPlayer;

      // 🏆 If game ends → update score + next starter
      if (result?.winner || isDraw) {
        gameOver = true;

        // 🔁 Decide who starts next game
        if (result?.winner === "X") nextStarter = "X";
        else if (result?.winner === "O") nextStarter = "O";
        else nextStarter = state.startingPlayer === "X" ? "O" : "X";

        // 📊 Update score
        if (result?.winner === "X") {
          newScore = { ...state.score, player: state.score.player + 1 };
        } else if (result?.winner === "O") {
          newScore = { ...state.score, computer: state.score.computer + 1 };
        } else {
          newScore = { ...state.score, draw: state.score.draw + 1 };
        }
      }

      return {
        ...state,
        board: newBoard,
        isXTurn: state.mode === "multi" ? !state.isXTurn : false,
        startingPlayer: nextStarter, // 🔥 store for next round
        score: newScore,
        gameOver
      };
    }

    // =====================================================
    // 🤖 AI MOVE
    // =====================================================
    case "AI_MOVE": {

      const move = getBestMove(state.board);
      if (move === null) return state;

      const newBoard = [...state.board];
      newBoard[move] = "O";

      const result = checkWinner(newBoard);
      const isDraw = !result?.winner && isBoardFull(newBoard);

      let newScore = state.score;
      let gameOver = false;
      let nextStarter = state.startingPlayer;

      if (result?.winner || isDraw) {
        gameOver = true;

        // 🔁 Starter logic
        if (result?.winner === "X") nextStarter = "X";
        else if (result?.winner === "O") nextStarter = "O";
        else nextStarter = state.startingPlayer === "X" ? "O" : "X";

        // 📊 Score update
        if (result?.winner === "O") {
          newScore = { ...state.score, computer: state.score.computer + 1 };
        } else {
          newScore = { ...state.score, draw: state.score.draw + 1 };
        }
      }

      return {
        ...state,
        board: newBoard,
        isXTurn: true,
        startingPlayer: nextStarter,
        score: newScore,
        gameOver
      };
    }

    // =====================================================
    // 🔄 RESET GAME (KEEP SCORE)
    // =====================================================
    case "RESET":
      return {
        ...state,
        board: Array(9).fill(null),
        isXTurn: state.startingPlayer === "X", // 🔥 dynamic start
        gameOver: false
      };

    default:
      return state;
  }
}

// =========================================================
// ⚛️ CUSTOM HOOK
// =========================================================
export function useGame() {

  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { board, isXTurn, mode, score } = state;

  // 🧠 DERIVED STATE (calculated, not stored)
  const result = checkWinner(board);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const isDraw = !winner && isBoardFull(board);

  // =========================================================
  // 🤖 AI EFFECT (runs when it's AI turn)
  // =========================================================
  useEffect(() => {
    if (mode === "single" && !isXTurn && !winner && !isDraw) {
      const timeout = setTimeout(() => {
        dispatch({ type: "AI_MOVE" });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isXTurn, mode, winner, isDraw]);

  // =========================================================
  // 🔊 SOUND EFFECTS (SIDE EFFECT ONLY)
  // =========================================================
  useEffect(() => {
    if (winner || isDraw) {
      if (winner) playWin();
      else playDraw();
    }
  }, [winner, isDraw]);

  // =========================================================
  // 🖱 HANDLE CLICK
  // =========================================================
  function handleClick(index) {
    playClick();
    dispatch({ type: "PLAYER_MOVE", payload: index });
  }

  // =========================================================
  // 🔄 RESET
  // =========================================================
  function resetGame() {
    dispatch({ type: "RESET" });
  }

  function setMode(mode) {
    dispatch({ type: "SET_MODE", payload: mode });
  }

  // =========================================================
  // 📦 RETURN API
  // =========================================================
  return {
    board,
    isXTurn,
    winner,
    winningLine,
    isDraw,
    handleClick,
    resetGame,
    mode,
    setMode,
    score
  };
}