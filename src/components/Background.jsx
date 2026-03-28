import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Background() {
  const gridRef = useRef(null);

  useEffect(() => {
    const lines = gridRef.current.children;

    gsap.to(lines, {
      y: -50,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="bg">
      <div className="grid" ref={gridRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="line" />
        ))}
      </div>
    </div>
  );
}

export default Background;