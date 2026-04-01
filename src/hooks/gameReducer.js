import { getAIMove, evaluateGame } from "./gameActions";

// =========================================================
// 🎯 INITIAL STATE (single source of truth)
// =========================================================
export const initialState = {
  board: Array(9).fill(null), // 🧩 game board
  isXTurn: true, // 🔄 turn tracker
  startingPlayer: "X", // 🔁 next game starter
  mode: null, // 🎮 game mode
  difficulty: "hard", // 🎯 AI difficulty
  gameOver: false, // 🛑 block moves after end
  score: {
    player: 0,
    computer: 0,
    draw: 0,
  },
};

// =========================================================
// 🧠 REDUCER (pure state transitions only)
// =========================================================
export function gameReducer(state, action) {
  switch (action.type) {
    // 🎮 Set game mode
    case "SET_MODE":
      return { ...state, mode: action.payload };

    // 🎯 Set difficulty
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };

    // =====================================================
    // 🖱 PLAYER MOVE
    // =====================================================
    case "PLAYER_MOVE": {
      // ❌ Ignore invalid move
      if (state.board[action.payload] || state.gameOver) return state;

      const newBoard = [...state.board];

      // 👇 Assign symbol based on mode
      newBoard[action.payload] =
        state.mode === "multi" ? (state.isXTurn ? "X" : "O") : "X";

      // 🧠 Evaluate game state
      const { newScore, gameOver, nextStarter } = evaluateGame(
        newBoard,
        state.score,
        state.startingPlayer,
      );

      return {
        ...state,
        board: newBoard,
        isXTurn: state.mode === "multi" ? !state.isXTurn : false, // 🤖 AI turn next
        startingPlayer: nextStarter,
        score: newScore,
        gameOver,
      };
    }

    // =====================================================
    // 🤖 AI MOVE
    // =====================================================
    case "AI_MOVE": {
      // 🎯 Get move based on difficulty
      const move = getAIMove(state.board, state.difficulty);

      // ❌ No move available
      if (move === null) return state;

      const newBoard = [...state.board];
      newBoard[move] = "O";

      // 🧠 Evaluate after AI move
      const { newScore, gameOver, nextStarter } = evaluateGame(
        newBoard,
        state.score,
        state.startingPlayer,
      );

      return {
        ...state,
        board: newBoard,
        isXTurn: true, // 👤 back to player
        startingPlayer: nextStarter,
        score: newScore,
        gameOver,
      };
    }

    case "RESET_ALL":
      return {
        ...initialState, // full reset
      };

    // =====================================================
    // 🔄 RESET GAME (keep score)
    // =====================================================
    case "RESET":
      return {
        ...state,
        board: Array(9).fill(null),
        isXTurn: state.startingPlayer === "X", // 🔁 dynamic starter
        gameOver: false,
      };

    default:
      return state;
  }
}
