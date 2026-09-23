"use client";
import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LoaderGooeyBlobsProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  size?: number;
  color?: string;
  duration?: number;
}

export function LoaderGooeyBlobs({
  className,
  size = 10,
  color = "#FF5500",
  duration = 1.5,
  ...props
}: LoaderGooeyBlobsProps) {
  const filterId = React.useId().replace(/:/g, "_");

  return (
    <motion.div className={cn("flex items-center gap-2", className)} {...props}>
      <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id={`gooey-${filterId}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>
      </svg>
      <div
        style={{ filter: `url(#gooey-${filterId})` } as React.CSSProperties}
        className="flex items-center gap-1.5 py-0.5 px-1.5"
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="rounded-full shrink-0 shadow-[0_0_8px_rgba(255,85,0,0.4)]"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
            animate={{
              x: [0, 8, 0, -8, 0],
              scale: [1, 1.25, 1, 1.25, 1],
            }}
            transition={{
              duration,
              ease: "easeInOut",
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default LoaderGooeyBlobs;
