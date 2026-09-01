"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "default",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "default" | "heading" | "tile";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    // If element is already rendered, keep shown
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    // If element is in viewport on mount (e.g. above-the-fold Hero), show immediately
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShown(true);
      return;
    }

    setShown(false);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "50px", threshold: 0.01 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
    };
  }, []);

  const chosen = reduce
    ? reducedVariants
    : variant === "heading"
      ? headingVariants
      : variant === "tile"
        ? tileVariants
        : variants;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={chosen}
      initial={reduce ? "show" : "hidden"}
      animate={shown ? "show" : "hidden"}
      transition={reduce ? { duration: 0 } : { delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
