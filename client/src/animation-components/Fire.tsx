import React, { useCallback, useContext } from "react";
import BaseAnimation from "./Base";
import { perlin2 } from "./perlin2";
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

function fbm(x: number, y: number) {
  const OCTAVES = 6;

  let normalize_factor = 0.0;
  let value = 0.0;
  let scale = 0.5;

  for (let i = 0; i < OCTAVES; i++) {
    value += perlin2(x, y) * scale;
    normalize_factor += scale;
    x *= 2.0;
    y *= 2.0;
    scale *= 0.5;
  }
  return (value / normalize_factor) * 0.5 + 0.5;
}

function overlay(base: number, top: number) {
  if (base < 0.5) {
    return 2.0 * base * top;
  } else {
    return 1.0 - 2.0 * (1 - base) * (1 - top);
  }
}

function render(canvas: HTMLCanvasElement, opts: any) {
  const ctx = canvas.getContext("2d")!;
  let t = opts.time / SPEED;
  if (opts.time > SPEED * 3) {
    t = 1 - (opts.time - SPEED * 3) / SPEED;
  }
  t = clamp(t, 0, 1);
  for (let x = 0; x < canvas.width; x += COL_SIZE) {
    for (let y = 0; y < canvas.height; y += ROW_SIZE) {
      const yNorm = y / canvas.height;
      const coordX = x / 6 / COL_SIZE;
      const coordY = y / 6 / ROW_SIZE;
      const fbmX = coordX / 6;
      const fbmY = coordY / 6;
      const fbmNoise = fbm(
        fbmX + opts.time * -0.0004,
        fbmY + opts.time * 0.0008
      );
      const fadeFbmNoise = overlay(fbmNoise, yNorm);
      let value = fadeFbmNoise;
      value = Math.floor(value * 8) / 8;
      const percent = value * 100 * t;
      ctx.fillStyle = `hsla(0.0, 100%, ${percent}%, ${(percent / 100) * 2})`;
      ctx.fillRect(x, y, COL_SIZE, ROW_SIZE);
    }
  }
}
export default function FireAnimation() {
  return <BaseAnimation render={render} />;
}
