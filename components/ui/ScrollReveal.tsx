"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
