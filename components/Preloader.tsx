"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const words = [
  "Hello",        // English
  "नमस्ते",       // Hindi
  "வணக்கம்",      // Tamil
  "నమస్కారం",    // Telugu
  "你好",         // Chinese
  "こんにちは",     // Japanese
  "Guten Tag",    // German
  "Bonjour",      // French
  "Ciao",         // Italian
  "Hola",         // Spanish
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let currentIndex = 0;
    let timerId: NodeJS.Timeout;

    const showNextWord = () => {
      const isFirst = currentIndex === 0;
      const isLast = currentIndex === words.length - 1;
      const delay = isFirst ? 650 : isLast ? 350 : 500;

      timerId = setTimeout(() => {
        if (!isLast) {
          currentIndex += 1;
          setIndex(currentIndex);
          showNextWord();
        } else {
          setIsExiting(true);
        }
      }, delay);
    };

    showNextWord();

    return () => {
      clearTimeout(timerId);
      document.body.style.overflow = "";
    };
  }, []);

  const initialPath = "M0 0 L1000 0 L1000 1000 L0 1000 Z";
  const targetPath = "M0 0 L1000 0 L1000 1000 Q500 1280 0 1000 Z";

  const curveVariants: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.div
      variants={{
        initial: { y: 0 },
        exit: {
          y: "-100%",
          transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
        },
      }}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      onAnimationComplete={(definition) => {
        if (definition === "exit") {
          document.body.style.overflow = "";
          onCompleteRef.current();
        }
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#09090b] text-white cursor-wait select-none overflow-hidden [transform:translateZ(0)]"
    >
      <div className="relative z-10 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-zinc-100 font-sans"
          >
            {words[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none fill-[#09090b]"
      >
        <motion.path
          variants={curveVariants}
          initial="initial"
          animate={isExiting ? "exit" : "initial"}
        />
      </svg>
    </motion.div>
  );
}