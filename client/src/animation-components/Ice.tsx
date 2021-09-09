import React, { useCallback } from "react";
import BaseAnimation from "./Base";
import perlin from "./perlin";
const ROW_SIZE = 16;
const COL_SIZE = 8;
const NOISE_SCALE = 0.1;

function random(val: number) {
  var x = Math.sin(val) * 10000;
  return x - Math.floor(x);
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(min, v), max);
}
const SPEED = 3000;
const colors = ["#75AEDC", "#94C6E3", "#9ED8F0", "#D4F1F9"];
export default function IceAnimation() {
  const render = useCallback((canvas: HTMLCanvasElement, opts) => {
    const ctx = canvas.getContext("2d")!;
    let t = opts.time / SPEED;
    if (opts.time > SPEED) {
      t = 1 - (opts.time - SPEED) / SPEED;
    }
    t = clamp(t, 0, 1);
    for (let x = 0; x < canvas.width; x += COL_SIZE) {
      for (let y = 0; y < canvas.height; y += ROW_SIZE) {
        const v =
          perlin.get(
            x / ((canvas.width * NOISE_SCALE) / 12),
            y / (canvas.width * NOISE_SCALE)
          ) /
            2 +
          0.5 -
          y / canvas.height / 2;

        let yNorm = y / canvas.height;
        if (opts.time > SPEED) yNorm = 1 - yNorm;
        const yNormPlusNoise = yNorm + v;
        ctx.globalAlpha = clamp(t * 3 + yNormPlusNoise - 2, 0, 1);
        ctx.fillStyle = colors[Math.floor(4 - v * 4)];
        ctx.fillRect(x, y, COL_SIZE, ROW_SIZE);
      }
    }
  }, []);
  return <BaseAnimation render={render} />;
}
