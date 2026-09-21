"use client";

import React from "react";
import { motion } from "framer-motion";

export function TacticalHeroGraphic() {
  const cx = 200;
  const cy = 200;
  const R = 150;
  const w = 51;
  const R_cap = R - w; // 99
  const r_circle = 31;
  const strokeWidth = 11;
  const color = "#FFA866";

  // Rounded 4-armed cross path
  const crossPath = `
    M ${cx + w} ${cy - w}
    L ${cx + w} ${cy - R_cap}
    A ${w} ${w} 0 0 0 ${cx - w} ${cy - R_cap}
    L ${cx - w} ${cy - w}
    L ${cx - R_cap} ${cy - w}
    A ${w} ${w} 0 0 0 ${cx - R_cap} ${cy + w}
    L ${cx - w} ${cy + w}
    L ${cx - w} ${cy + R_cap}
    A ${w} ${w} 0 0 0 ${cx + w} ${cy + R_cap}
    L ${cx + w} ${cy + w}
    L ${cx + R_cap} ${cy + w}
    A ${w} ${w} 0 0 0 ${cx + R_cap} ${cy - w}
    Z
  `.trim();

  return (
    <div className="relative w-full flex items-center justify-center select-none py-4">
      {/* Pure Logo Component - Rotates 90 degrees on hover */}
      <motion.div
        whileHover={{ rotate: 90 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="relative cursor-pointer"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[390px] lg:h-[390px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cardinal Cross (0 deg) */}
          <path
            d={crossPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />

          {/* Diagonal Cross (45 deg) */}
          <path
            d={crossPath}
            transform={`rotate(45 ${cx} ${cy})`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />

          {/* Central Circle */}
          <circle
            cx={cx}
            cy={cy}
            r={r_circle}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default TacticalHeroGraphic;
