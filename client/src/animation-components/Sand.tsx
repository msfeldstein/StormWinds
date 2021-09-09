import React, { useCallback } from "react";
import BaseAnimation from "./Base";

const ROW_HEIGHT = 16;

function random(val: number) {
  var x = Math.sin(val) * 10000;
  return x - Math.floor(x);
}

export default function SandAnimation() {
  const render = useCallback((canvas: HTMLCanvasElement, opts) => {
    const ctx = canvas.getContext("2d")!;

    for (var y = 0; y < canvas.height; y += ROW_HEIGHT) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#E9CB97";
      const speed = random(y * 2) + 1;
      let x = -canvas.width * 3 - canvas.width * random(y) + opts.time * speed;
      x = Math.floor(x / 8) * 8;
      ctx.fillRect(x, y, canvas.width * 2, ROW_HEIGHT);
      ctx.globalAlpha = 0.8;
      ctx.fillRect(x - 80, y, 80, ROW_HEIGHT);
      ctx.globalAlpha = 0.4;
      ctx.fillRect(x - 2 * 80, y, 80, ROW_HEIGHT);
      ctx.globalAlpha = 0.2;
      ctx.fillRect(x - 3 * 80, y, 80, ROW_HEIGHT);
    }
  }, []);
  return <BaseAnimation render={render} />;
}
