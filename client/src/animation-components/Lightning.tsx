import React, { useCallback, useEffect, useState } from "react";
import BaseAnimation from "./Base";
import * as core from "@theatre/core";
import { ISheetObject } from "@theatre/core";
import state from "./motion/lightning.json";
import { perlin2 } from "./perlin2";

const X_SIZE = 8;
const Y_SIZE = 16;

let seed1 = Math.random();
let seed2 = Math.random();

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

export default function LightningAnimation() {
  const [values, setValues] = useState<ISheetObject<{
    strike1: number;
    strike2: number;
    whiteout: number;
  }> | null>(null);

  useEffect(() => {
    const proj = core.getProject("lightning", { state });
    const sheet = proj.sheet("scene");

    const lightningProps = sheet.object("Lightning", {
      strike1: 0,
      strike2: 0,
      whiteout: 0,
    });

    proj.ready.then(() => {
      sheet.sequence.play({ range: [0, 2], rate: 0.7 });
    });
    setValues(lightningProps);
  }, []);
  const render = useCallback(
    (canvas: HTMLCanvasElement, opts) => {
      if (!values) return;
      const context = canvas.getContext("2d")!;
      const { width, height } = canvas;
      const { strike1, strike2, whiteout } = values.value;

      function strike(x: number, y: number, v: number, seed: number) {
        const yNorm = y / height;
        const fbmX = (x / 12 / X_SIZE) * 0.35;
        const fbmY = (y / 12 / Y_SIZE) * 0.35;
        const fbmNoise =
          1.0 -
          3 * Math.pow(Math.abs(fbm(fbmX + seed, fbmY / 3 + seed) - 0.5), 0.5);
        const fadeValue = Math.max(0, 1 - Math.abs(v - 1));
        let value = fbmNoise * Math.max(0, 1 - yNorm * 1 - 1 + fadeValue * 2);
        value = value * Math.max(0, 1 - yNorm * 2 - 1 + 1 * 2);
        const percent = value * 100;
        return Math.max(percent, 0);
      }
      for (var x = 0; x < width; x += X_SIZE) {
        for (var y = 0; y < height; y += Y_SIZE) {
          const s1 = strike(x, y, strike1, seed1);
          const s2 = strike(x, y, strike2, seed2);
          const w = Math.max(whiteout * 100 - strike(x, y, 1, seed2) / 2, 0);
          let v = Math.max(Math.max(s1, s2), w);
          v = Math.floor(v * 8) / 8;
          context.fillStyle = `hsla(60.0, 100%, ${v}%, ${v / 100})`;
          context.fillRect(x, y, X_SIZE, Y_SIZE);
        }
      }
    },
    [values]
  );
  return <BaseAnimation render={render} />;
}
