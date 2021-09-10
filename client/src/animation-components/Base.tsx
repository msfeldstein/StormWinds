import { render } from "@testing-library/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type AnimationCallback = (
  canvas: HTMLCanvasElement,
  opts: { time: number },
  values?: any
) => void;

export default function BaseAnimation(props: {
  initialValues?: any;
  render: AnimationCallback;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [start, setStart] = useState(Date.now());
  useEffect(() => {
    setStart(Date.now());
  }, [setStart]);

  const render = props.render;
  const values = useMemo(() => {
    return { ...props.initialValues };
  }, [props.initialValues]);
  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
    const canvas = ref.current;
    if (!canvas) return;
    canvas.width = canvas.width * 1;
    let time = Date.now() - start;
    time = Math.floor(time / 32) * 32;
    render(canvas, { time: time }, values);
  }, [render, start, values]);

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
