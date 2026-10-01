import React from "react";

/**
 * Custom geometric shape & pattern vector icons with hover micro-animations.
 * Engineered for minimalist, modern AI studio tools.
 */

export const EditStudioShapeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    {/* Geometric Rounded Studio Body */}
    <rect
      x="2.5"
      y="5"
      width="13"
      height="14"
      rx="3.5"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.8"
      className="transition-all duration-300 group-hover:stroke-width-[2]"
    />
    {/* Projector/Camera Lens Angle */}
    <path
      d="M15.5 9.5L20.5 6.5V17.5L15.5 14.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:translate-x-0.5 origin-center"
    />
    {/* Focal Keyframe Center Node */}
    <circle
      cx="9"
      cy="12"
      r="2.5"
      fill="currentColor"
      className="transition-transform duration-300 group-hover:scale-125 origin-[9px_12px]"
    />
  </svg>
);

export const AudioLabShapeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    {/* Rhythmic Soundwave Frequency Capsules with Equalizer Ripple */}
    <rect
      x="3"
      y="9"
      width="2.2"
      height="6"
      rx="1.1"
      fill="currentColor"
      fillOpacity="0.75"
      className="transition-transform duration-300 group-hover:scale-y-135 origin-[4.1px_12px]"
    />
    <rect
      x="7.2"
      y="5.5"
      width="2.2"
      height="13"
      rx="1.1"
      fill="currentColor"
      className="transition-transform duration-300 delay-[40ms] group-hover:scale-y-75 origin-[8.3px_12px]"
    />
    <rect
      x="11.4"
      y="3"
      width="2.2"
      height="18"
      rx="1.1"
      fill="currentColor"
      className="transition-transform duration-300 delay-[80ms] group-hover:scale-y-115 origin-[12.5px_12px]"
    />
    <rect
      x="15.6"
      y="6.5"
      width="2.2"
      height="11"
      rx="1.1"
      fill="currentColor"
      className="transition-transform duration-300 delay-[120ms] group-hover:scale-y-65 origin-[16.7px_12px]"
    />
    <rect
      x="19.8"
      y="9.5"
      width="2.2"
      height="5"
      rx="1.1"
      fill="currentColor"
      fillOpacity="0.75"
      className="transition-transform duration-300 delay-[160ms] group-hover:scale-y-150 origin-[20.9px_12px]"
    />
  </svg>
);

export const ImageGenerationShapeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    {/* Primary 4-point curved diamond star with rotation animation */}
    <path
      d="M12 2.5C12 7.75 7.75 12 2.5 12C7.75 12 12 16.25 12 21.5C12 16.25 16.25 12 21.5 12C16.25 12 12 7.75 12 2.5Z"
      fill="currentColor"
      className="transition-transform duration-500 ease-out group-hover:rotate-45 origin-center"
    />
    {/* Micro satellite sparkle node with orbit sparkle */}
    <circle
      cx="18.5"
      cy="5.5"
      r="1.8"
      fill="currentColor"
      className="transition-all duration-300 group-hover:scale-125 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 origin-[18.5px_5.5px]"
    />
  </svg>
);

export const ImageEnhancerShapeIcon = ImageGenerationShapeIcon;

export const AppBuilderShapeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    {/* Outer squircle frame */}
    <rect
      x="2.5"
      y="3.5"
      width="19"
      height="17"
      rx="4"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="currentColor"
      fillOpacity="0.12"
      className="transition-all duration-300"
    />
    {/* Command Prompt Chevron with step forward */}
    <path
      d="M7 8.5L10.5 12L7 15.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-200 group-hover:translate-x-1"
    />
    {/* Terminal Cursor Node with pulse blink */}
    <rect
      x="12.5"
      y="14"
      width="4.5"
      height="2"
      rx="1"
      fill="currentColor"
      className="transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-60"
    />
  </svg>
);

export const WebSearchShapeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    {/* Outer circle */}
    <circle
      cx="10.5"
      cy="10.5"
      r="7.5"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="currentColor"
      fillOpacity="0.12"
    />
    {/* Vertical ellipse meridian with orbital shift */}
    <ellipse
      cx="10.5"
      cy="10.5"
      rx="3.5"
      ry="7.5"
      stroke="currentColor"
      strokeWidth="1.4"
      className="transition-transform duration-400 group-hover:scale-x-75 origin-[10.5px_10.5px]"
    />
    {/* Horizontal equator line */}
    <path d="M3 10.5H18" stroke="currentColor" strokeWidth="1.4" />
    {/* Search Lens Handle with spring ray */}
    <path
      d="M16 16L21 21"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
    />
  </svg>
);

export const TextSummarizerShapeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 ${className}`}
  >
    {/* Document container */}
    <rect
      x="3.5"
      y="2.5"
      width="17"
      height="19"
      rx="3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="currentColor"
      fillOpacity="0.12"
    />
    {/* Header Pill */}
    <rect
      x="7"
      y="6.5"
      width="5"
      height="2.2"
      rx="1.1"
      fill="currentColor"
      className="transition-all duration-200 group-hover:scale-x-120 origin-left"
    />
    {/* Data summary rhythm lines with sequential expansion */}
    <rect
      x="7"
      y="11"
      width="10"
      height="1.8"
      rx="0.9"
      fill="currentColor"
      className="transition-all duration-300 delay-75 group-hover:scale-x-95 origin-left"
    />
    <rect
      x="7"
      y="14.5"
      width="7"
      height="1.8"
      rx="0.9"
      fill="currentColor"
      className="transition-all duration-300 delay-150 group-hover:scale-x-125 origin-left"
    />
  </svg>
);
