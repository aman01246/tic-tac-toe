
import { useRef, useEffect } from "react";

export function useSwipeBack({ mode, onBack }) {

  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  // 👉 detect touch device
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

  // =========================
  // 👉 POINTER EVENTS (mobile)
  // =========================
  const handlePointerDown = (e) => {
    if (!isTouchDevice) return;

    startX.current = e.clientX;
    currentX.current = e.clientX;
    isDragging.current = true;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    currentX.current = e.clientX;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;

    const distance = startX.current - currentX.current;

    if (mode && Math.abs(distance) > 80) {
      onBack();
    }

    isDragging.current = false;
  };

  // =========================
  // 👉 KEYBOARD SUPPORT
  // =========================
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.key === "ArrowLeft" || e.key === "Escape") && mode) {
        onBack();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mode, onBack]);

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}