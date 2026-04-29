"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  t: number;
}

const LIFETIME = 350;

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Drop expired points
      pointsRef.current = pointsRef.current.filter((p) => now - p.t < LIFETIME);

      const pts = pointsRef.current;
      if (pts.length >= 2) {
        // Draw outline first, then core on top
        for (let pass = 0; pass < 2; pass++) {
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i++) {
            ctx.lineTo(pts[i].x, pts[i].y);
          }
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          if (pass === 0) {
            // Black outline — fade from tail (transparent) to head (full)
            const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[pts.length - 1].x, pts[pts.length - 1].y);
            grad.addColorStop(0, "rgba(0,0,0,0)");
            grad.addColorStop(1, "rgba(0,0,0,0.9)");
            ctx.strokeStyle = grad;
            ctx.lineWidth = 3;
          } else {
            // White core
            const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[pts.length - 1].x, pts[pts.length - 1].y);
            grad.addColorStop(0, "rgba(255,255,255,0)");
            grad.addColorStop(1, "rgba(255,255,255,1)");
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
          }

          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 150 }}
    />
  );
}
