import React, { useCallback, useRef } from "react";

const ROW_HEIGHT = 16;

function random(val: number) {
  var x = Math.sin(val) * 10000;
  return x - Math.floor(x);
}

export default function SandAnimation() {
  const ref = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
    const canvas = ref.current;
    if (!canvas) return;
    canvas.width = canvas.width;
    const ctx = canvas.getContext("2d")!;

    for (var y = 0; y < canvas.height; y += ROW_HEIGHT) {
      ctx.fillStyle = "#E9CB97";
      const x =
        -canvas.width -
        canvas.width * random(y) +
        (Date.now() % (canvas.width * 3)) / 1;

      ctx.fillRect(x, y, canvas.width, ROW_HEIGHT);
    }
  }, []);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    ref.current!.width = window.innerWidth;
    ref.current!.height = window.innerHeight;
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);
  return (
    <div className="animation-overlay">
      <canvas ref={ref}></canvas>
    </div>
  );
}
