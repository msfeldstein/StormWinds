import React, { useCallback } from "react";
import BaseAnimation from "./Base";
// import perlin from "./perlin";
const ROW_SIZE = 16;
const COL_SIZE = 8;

const SPEED = 1000;
const color = "yellow";
type LightningValues = {
  lightning: {
    x: number;
    y: number;
    grid: number[][];
  };
};
export default function LightningAnimation() {
  const render = useCallback(
    (canvas: HTMLCanvasElement, opts, values: LightningValues) => {
      const grid = values.lightning.grid;
      if (grid.length === 0) {
        const rows = Math.ceil(canvas.height / ROW_SIZE);
        const cols = Math.ceil(canvas.width / COL_SIZE);
        for (let y = 0; y < rows; y++) {
          const row = [];
          for (let x = 0; x < cols; x++) {
            // row.push(random(x * 23.234 + y * 392.23) / 2);
            row.push(Math.sin(Math.cos(x * 23 + y * 1) * 2));
          }
          grid.push(row);
        }
      }
      values.lightning.x += 2;
      values.lightning.y += 4;
      const ctx = canvas.getContext("2d")!;
      let t = opts.time / SPEED;
      const phase1 = t < 1;
      for (let x = 0; x < canvas.width; x += COL_SIZE) {
        for (let y = 0; y < canvas.height; y += ROW_SIZE) {
          const iy = Math.floor(y / ROW_SIZE);
          const ix = Math.floor(x / COL_SIZE);
          if (phase1) {
            if (
              x > values.lightning.x &&
              x < values.lightning.x + COL_SIZE &&
              y > values.lightning.y &&
              y < values.lightning.y + ROW_SIZE
            ) {
              grid[iy][ix] = 1;
            }
            ctx.fillStyle = grid[iy][ix] === 1 ? color : "transparent";
          } else {
            if (grid[iy][ix] === 1) {
              ctx.fillStyle = "black";
            } else {
              ctx.fillStyle = color;
            }
            ctx.globalAlpha = Math.max(2 - t, 0) * grid[iy][ix];
          }
          ctx.fillRect(x, y, COL_SIZE, ROW_SIZE);
        }
      }

      // grid.forEach((row, rowIndex) => {
      //   row.forEach((val, colIndex) => {
      //     ctx.globalAlpha = val;
      //     ctx.fillRect(
      //       colIndex * COL_SIZE,
      //       rowIndex * ROW_SIZE,
      //       COL_SIZE,
      //       ROW_SIZE
      //     );
      //   });
      // });
    },
    []
  );
  const initialValues: LightningValues = {
    lightning: {
      x: 8,
      y: 8,
      grid: [],
    },
  };
  return <BaseAnimation render={render} initialValues={initialValues} />;
}
