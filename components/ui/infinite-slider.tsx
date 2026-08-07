'use client';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  direction = 'horizontal',
  reverse = false,
  className,
  pauseOnHover = true,
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const translation = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const [key, setKey] = useState(0);

  // Measure content size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      setSize(direction === 'horizontal' ? el.offsetWidth : el.offsetHeight);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [direction]);

  useEffect(() => {
    if (isPaused || size === 0) return;

    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    // Resume from current position, keeping consistent speed
    const current = translation.get();
    const remainingRatio = Math.abs((current - to) / contentSize);
    const resumeDuration = duration * (remainingRatio || 1);

    const controls = animate(translation, [current, to], {
      ease: 'linear',
      duration: resumeDuration,
      onComplete: () => {
        translation.set(from);
        setKey((prevKey) => prevKey + 1); // restart full loop
      },
    });

    return () => controls.stop();
  }, [key, isPaused, size, gap, duration, direction, reverse, translation]);

  const hoverProps = pauseOnHover
    ? {
        onHoverStart: () => setIsPaused(true),
        onHoverEnd: () => setIsPaused(false),
      }
    : {};

  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={containerRef}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}