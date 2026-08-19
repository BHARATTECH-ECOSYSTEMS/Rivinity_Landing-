"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  type Variants,
} from "framer-motion";
import { Check } from "lucide-react";
import HeroWorkflow from "./ui/HeroWorkflow";

// ==========================================
// 1. Container Scroll Components
// ==========================================

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 0.98] : [1.05, 1];
  };

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [10, 0] : [20, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, -20] : [0, -60]
  );

  return (
    <div
      className="min-h-[38rem] sm:min-h-[50rem] md:min-h-[60rem] lg:min-h-[66rem] flex items-center justify-center relative px-2 sm:px-6 md:px-12 pt-10 sm:pt-16 md:pt-24 pb-12 sm:pb-20 overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      ref={containerRef}
    >
      <div
        className="py-6 sm:py-12 md:py-20 w-full relative"
        style={{
          perspective: isMobile ? "600px" : "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center mb-4 sm:mb-8 px-2"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-6xl -mt-4 sm:-mt-8 md:-mt-12 mx-auto min-h-[14rem] sm:min-h-[20rem] md:min-h-[24rem] w-full border-2 sm:border-4 border-[#6C6C6C]/20 p-1 sm:p-2.5 md:p-3 bg-[#222222] rounded-[20px] sm:rounded-[26px] md:rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-[14px] sm:rounded-[20px] md:rounded-[22px] bg-[#FCFCFD] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </motion.div>
  );
};

// ==========================================
// 2. Integrated WhatWillYouBuild Hero Section
// ==========================================

const shellVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const blobVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 2.5, ease: "easeOut" },
  },
};

export default function WhatWillYouBuild() {
  return (
    <motion.div
      className="relative w-full flex flex-col items-center justify-center overflow-hidden px-3 sm:px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={shellVariants}
    >
      {/* Background Blurs */}
      <motion.div
        variants={blobVariants}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-1/4 -left-1/4 w-[90%] sm:w-[70%] h-[70%] rounded-full opacity-60 blur-[80px] sm:blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, #C9A8F5 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/3 w-[90%] sm:w-[80%] h-[75%] rounded-full opacity-60 blur-[90px] sm:blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, #F5A8CB 0%, transparent 22%)",
          }}
        />
        <div
          className="absolute top-[10%] right-[-10%] w-[70%] sm:w-[55%] h-[55%] rounded-full opacity-100 blur-[80px] sm:blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, #FAC28E 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Container Scroll Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mt-12">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center text-center px-2">
              <h1 className="text-[clamp(28px,7vw,66px)] font-semibold leading-[1.05] sm:leading-[0.95] md:leading-[0.85] tracking-[-0.02em] sm:tracking-[-0.03em] md:tracking-[-0.04em] text-[#2D2E33]">
                What will you build?
              </h1>
              <p className="mt-2 sm:mt-3 text-[clamp(13px,2vw,18px)] font-normal text-[#2D2E33]/80 max-w-xl mx-auto">
                Turn ideas into apps in minutes — no coding needed
              </p>
            </div>
          }
        >
          <HeroWorkflow />
        </ContainerScroll>
      </div>
    </motion.div>
  );
}