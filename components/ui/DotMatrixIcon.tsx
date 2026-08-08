"use client";

import { useEffect, useRef } from "react";

export type DotIconName = "cpu" | "startup" | "globe" | "home";

const GRID_COLS = 46;
const GRID_ROWS = 62;
const DISSOLVE_DURATION = 550; // ms per dot's own grow/shrink tween
const MAX_STAGGER = 450; // ms spread across the whole grid
const IDLE_MIN = 0.5; // idle dots still twinkle faintly, matches bg pattern
const IDLE_MAX = 1.3;

// --- Procedural icon silhouettes drawn straight onto an offscreen canvas,
// then sampled down into a GRID_COLS x GRID_ROWS intensity map. Swapping in
// real SVGs later just means replacing the drawX() bodies below. ---
function drawIcon(ctx: CanvasRenderingContext2D, name: DotIconName, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = w * 0.055;
  const cx = w / 2;
  const cy = h / 2;

  const ICON_SCALE_X = 0.85; // wider = closer to 1, or even >1
  const ICON_SCALE_Y = 0.72; // keep this smaller for height
  w *= ICON_SCALE_X;
  h *= ICON_SCALE_Y;

  if (name === "cpu") {
    const outer = w * 0.34;   // half-size of outer rounded square
    const outerR = w * 0.09;  // outer corner radius
    const inner = w * 0.15;   // half-size of inner rounded square
    const innerR = w * 0.045; // inner corner radius
    const pinLen = w * 0.09;  // how far pins stick out
    const pinW = w * 0.05;    // pin thickness
    const pinR = pinW / 2;    // pin end rounding

    // outer rounded square (stroked, matches ctx.lineWidth set above)
    ctx.beginPath();
    ctx.roundRect(cx - outer, cy - outer, outer * 2, outer * 2, outerR);
    ctx.stroke();

    // inner rounded square
    ctx.beginPath();
    ctx.roundRect(cx - inner, cy - inner, inner * 2, inner * 2, innerR);
    ctx.stroke();

    // 3 pins per side
    const pinOffsets = [-outer * 0.55, 0, outer * 0.55];
    for (const off of pinOffsets) {
      // top
      ctx.beginPath();
      ctx.roundRect(cx + off - pinW / 2, cy - outer - pinLen, pinW, pinLen, pinR);
      ctx.fill();
      // bottom
      ctx.beginPath();
      ctx.roundRect(cx + off - pinW / 2, cy + outer, pinW, pinLen, pinR);
      ctx.fill();
      // left
      ctx.beginPath();
      ctx.roundRect(cx - outer - pinLen, cy + off - pinW / 2, pinLen, pinW, pinR);
      ctx.fill();
      // right
      ctx.beginPath();
      ctx.roundRect(cx + outer, cy + off - pinW / 2, pinLen, pinW, pinR);
      ctx.fill();
    }
  }

  if (name === "startup") {
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.38, cy - h * 0.05);
    ctx.lineTo(cx, cy - h * 0.34);
    ctx.lineTo(cx + w * 0.38, cy - h * 0.05);
    ctx.closePath();
    ctx.fill();
    for (let i = -2; i <= 2; i++) {
      ctx.fillRect(cx + i * w * 0.15 - w * 0.025, cy - h * 0.02, w * 0.05, h * 0.3);
    }
    ctx.fillRect(cx - w * 0.4, cy + h * 0.3, w * 0.8, h * 0.06);
  }

  if (name === "globe") {
    const rx = w * 0.38; // outer circle horizontal radius — bump this up for wider
    const ry = h * 0.38;  // outer circle vertical radius, tied to h not w

    // outer circle (as an ellipse so rx/ry can differ)
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    // vertical meridian line
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * 0.42, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    // equator line
    ctx.beginPath();
    ctx.moveTo(cx - rx, cy);
    ctx.lineTo(cx + rx, cy);
    ctx.stroke();
  }

  if (name === "home") {
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.36, cy);
    ctx.lineTo(cx, cy - h * 0.32);
    ctx.lineTo(cx + w * 0.36, cy);
    ctx.stroke();
    ctx.strokeRect(cx - w * 0.24, cy, w * 0.48, h * 0.3);
    ctx.fillRect(cx - w * 0.06, cy + h * 0.1, w * 0.12, h * 0.2);
  }
}

function sampleIconToGrid(name: DotIconName): Float32Array {
  const sampleSize = 300;
  const off = document.createElement("canvas");
  off.width = sampleSize;
  off.height = sampleSize;
  const ctx = off.getContext("2d")!;
  drawIcon(ctx, name, sampleSize, sampleSize);
  const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize);

  const grid = new Float32Array(GRID_COLS * GRID_ROWS);
  const cellW = sampleSize / GRID_COLS;
  const cellH = sampleSize / GRID_ROWS;

  for (let gy = 0; gy < GRID_ROWS; gy++) {
    for (let gx = 0; gx < GRID_COLS; gx++) {
      let sum = 0;
      let count = 0;
      const x0 = Math.floor(gx * cellW);
      const x1 = Math.floor((gx + 1) * cellW);
      const y0 = Math.floor(gy * cellH);
      const y1 = Math.floor((gy + 1) * cellH);
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const alpha = data[(y * sampleSize + x) * 4 + 3];
          sum += alpha;
          count++;
        }
      }
      grid[gy * GRID_COLS + gx] = count ? sum / count / 255 : 0;
    }
  }
  return grid;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type DotState = {
  from: number;
  to: number;
  delay: number;
  start: number;
  idlePhase: number;
};

export function DotMatrixIcon({
  icon,
  className = "",
  colorLow = "#ffc48a",
  colorHigh = "#ff8c28",
  idleColor = "rgb(207, 208, 216)",
}: {
  icon: DotIconName;
  className?: string;
  colorLow?: string;
  colorHigh?: string;
  idleColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<DotState[]>([]);
  const rafRef = useRef<number>(0);
  const targetGridRef = useRef<Float32Array>(new Float32Array(GRID_COLS * GRID_ROWS));

  // Init dot state once
  useEffect(() => {
    dotsRef.current = new Array(GRID_COLS * GRID_ROWS).fill(0).map(() => ({
      from: 0,
      to: 0,
      delay: 0,
      start: performance.now(),
      idlePhase: Math.random() * Math.PI * 2,
    }));
    targetGridRef.current = sampleIconToGrid(icon);
    dotsRef.current.forEach((d, i) => {
      d.to = targetGridRef.current[i];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On icon change: snapshot current radii as "from", compute new "to",
  // stagger delays by distance from a random-ish diagonal wave so it reads
  // as a dissolve rather than a uniform fade.
  useEffect(() => {
    const newGrid = sampleIconToGrid(icon);
    const now = performance.now();
    for (let gy = 0; gy < GRID_ROWS; gy++) {
      for (let gx = 0; gx < GRID_COLS; gx++) {
        const i = gy * GRID_COLS + gx;
        const dot = dotsRef.current[i];
        if (!dot) continue;
        const wave = (gx / GRID_COLS + gy / GRID_ROWS) / 2;
        dot.from = currentRadiusOf(dot, now);
        dot.to = newGrid[i];
        dot.delay = wave * MAX_STAGGER + Math.random() * 120;
        dot.start = now;
      }
    }
    targetGridRef.current = newGrid;
    if (!rafRef.current) tick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icon]);

  function currentRadiusOf(dot: DotState, now: number) {
    const elapsed = now - dot.start - dot.delay;
    const t = Math.min(Math.max(elapsed / DISSOLVE_DURATION, 0), 1);
    const eased = easeInOutCubic(t);
    return dot.from + (dot.to - dot.from) * eased;
  }

  function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const cellW = rect.width / GRID_COLS;
    const cellH = rect.height / GRID_ROWS;
    const now = performance.now();
    let stillAnimating = false;

    for (let gy = 0; gy < GRID_ROWS; gy++) {
      for (let gx = 0; gx < GRID_COLS; gx++) {
        const i = gy * GRID_COLS + gx;
        const dot = dotsRef.current[i];
        if (!dot) continue;

        const elapsed = now - dot.start - dot.delay;
        if (elapsed < DISSOLVE_DURATION) stillAnimating = true;
        const intensity = currentRadiusOf(dot, now);

        const px = gx * cellW + cellW / 2;
        const py = gy * cellH + cellH / 2;

        if (intensity < 0.06) {
          // idle background twinkle, matches the faint base dot grid
          const idle =
            IDLE_MIN + ((Math.sin(now / 900 + dot.idlePhase) + 1) / 2) * (IDLE_MAX - IDLE_MIN);
          ctx.beginPath();
          ctx.fillStyle = idleColor;
          ctx.globalAlpha = 0.5;
          ctx.arc(px, py, idle * 0.6, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        const radius = 0.8 + intensity * (cellW * 0.42 - 0.8);
        const t = Math.min(intensity, 1);
        ctx.beginPath();
        ctx.fillStyle = lerpColor(colorLow, colorHigh, t);
        ctx.globalAlpha = 0.4 + t * 0.6;
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    rafRef.current = stillAnimating ? requestAnimationFrame(tick) : 0;
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ width: "100%", height: "100%" }} />;
}

function lerpColor(a: string, b: string, t: number) {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  const r = Math.round(pa.r + (pb.r - pa.r) * t);
  const g = Math.round(pa.g + (pb.g - pa.g) * t);
  const bch = Math.round(pa.b + (pb.b - pa.b) * t);
  return `rgb(${r}, ${g}, ${bch})`;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}