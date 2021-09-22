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
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    setStart(Date.now());
  }, [setStart]);

  const render = props.render;
  const values = useMemo(() => {
    return { ...props.initialValues };
  }, [props.initialValues]);
  const animate = useCallback(() => {
    if (finished) return;
    requestRef.current = requestAnimationFrame(animate);
    const canvas = ref.current;
    if (!canvas) return;
    canvas.width = canvas.width * 1;
    let time = Date.now() - start;

    time = Math.floor(time / 32) * 32;
    // Stop eventually so you don't burn cpu
    if (time > 20000) setFinished(true);
    render(canvas, { time: time }, values);
  }, [render, start, values, finished, setFinished]);

  React.useEffect(() => {
    const canvas = ref.current!;
    if (!canvas) return;
    requestRef.current = requestAnimationFrame(animate);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);
  if (finished) return null;
  return (
    <div className="animation-overlay">
      <canvas ref={ref}></canvas>
    </div>
  );
}
