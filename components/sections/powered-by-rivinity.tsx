"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

type Pt = [number, number];

// -------- Source SVG (official Rivinity brand geometry) --------
const LOGO_GRADIENT_ID = "rivinity-supernova-gradient";
const LOGO_GRADIENT_STOPS = [
  { offset: "0%", color: "#EA580C" }, // little dark orange (top-left)
  { offset: "35%", color: "#FF6B00" }, // rich vibrant brand orange
  { offset: "70%", color: "#FF8A3D" }, // warm orange
  { offset: "100%", color: "#FFA866" }, // clean light orange (bottom-right)
];

const RAW_PATHS: { d: string; tx: number; ty: number }[] = [
  {
    tx: 429.7005,
    ty: 266.52943,
    d: "M0 0C25.641-11.594 49.438-26.789 70.795-45.206 91.933-27.181 115.464-12.309 140.792-.966 122.576 29.845 98.81 56.443 70.111 78.129 41.755 56.687 18.183 30.418 0 0M-136.614 2.983C-144.579-31.64-145.776-66.907-140.174-101.908-114.401-94.709-87.733-91.061-60.87-91.061-59.846-91.061-58.821-91.067-57.798-91.076-53.24-63.636-44.813-37.02-32.73-11.897-61.709-1.795-92.038 3.324-122.918 3.324-127.462 3.324-132.063 3.209-136.614 2.983M200.2-91.958C227.655-91.958 254.936-95.788 281.324-103.345 287.168-68.367 286.207-33.089 278.458 1.581 273.298 1.872 268.075 2.02 262.913 2.02 232.38 2.02 202.292-3.004 173.452-12.916 185.372-37.963 193.676-64.537 198.15-91.963 198.834-91.96 199.518-91.958 200.2-91.958M-246.805-187.389C-230.66-219.05-208.93-246.86-182.181-270.098-166.483-247.178-147.589-226.6-125.983-208.889-140.151-184.849-150.791-159.01-157.635-132.028-190.76-144.615-220.744-163.232-246.805-187.389M266.427-210.198C287.875-228.025 306.622-248.734 322.198-271.802 349.117-248.703 371.029-221.045 387.367-189.545 361.466-165.209 331.602-146.401 298.563-133.611 291.524-160.566 280.721-186.312 266.427-210.198M-209.006-404.069C-176.337-417.974-141.827-425.326-106.374-425.936-109.057-398.225-107.781-370.312-102.577-342.905-128.821-333.621-153.569-320.652-176.194-304.329-193.49-335.218-204.525-368.756-209.006-404.069M242.124-344.083C247.123-371.523 248.215-399.446 245.375-427.147 280.774-426.746 315.317-419.616 348.111-405.94 343.901-370.789 333.095-337.132 315.984-306.022 293.235-322.161 268.404-334.957 242.124-344.083M13.135-402.826C15.867-408.672 18.829-414.395 21.937-419.839 34.639-442.46 50.552-463.126 69.256-481.306 88.028-463.362 104.092-442.799 117.026-420.155 120.118-414.815 123.124-409.118 125.962-403.215L126.798-401.477 128.551-402.284C134.441-404.993 140.39-407.474 146.236-409.659 170.622-418.86 196.113-424.491 222.036-426.405 224.892-400.578 223.99-374.478 219.353-348.793 218.272-342.612 216.916-336.329 215.324-330.107L214.845-328.233 216.711-327.728C222.944-326.036 229.113-324.112 235.046-322.012 259.634-313.415 282.773-301.359 303.855-286.168 289.498-264.568 272.064-245.159 252.009-228.447 247.126-224.346 242.03-220.384 236.853-216.665L235.281-215.534 236.391-213.948C239.981-208.805 243.482-203.371 246.795-197.795 260.115-175.443 270.115-151.335 276.528-126.108 251.681-118.848 225.988-115.167 200.131-115.167L198.882-115.171C192.555-115.202 186.119-115.453 179.75-115.92L177.83-116.062 177.652-114.144C177.085-108.012 176.278-101.797 175.186-95.142 170.921-69.553 163.059-44.769 151.816-21.452 128.049-31.935 105.999-45.733 86.252-62.483 81.057-66.875 76.418-71.094 72.071-75.384L70.689-76.748 69.31-75.378C64.489-70.59 59.873-66.34 55.198-62.389 35.19-45.211 12.907-31.119-11.071-20.475-22.468-43.824-30.452-68.674-34.807-94.366-35.861-100.555-36.714-106.947-37.34-113.368L-37.528-115.292-39.456-115.133C-45.827-114.604-52.266-114.32-58.599-114.288L-61.105-114.276C-86.277-114.276-111.304-117.784-135.531-124.705-129.296-149.888-119.451-174.071-106.254-196.611-103.23-201.829-99.877-207.123-96.001-212.802L-94.91-214.4-96.495-215.513C-101.553-219.066-106.669-222.994-111.695-227.186-131.823-243.706-149.403-262.995-163.979-284.551-142.969-299.912-119.892-312.129-95.357-320.878-89.457-323.01-83.32-324.965-77.108-326.691L-75.246-327.208-75.734-329.078C-77.405-335.469-78.802-341.753-79.888-347.756-84.705-373.435-85.79-399.538-83.121-425.376-57.116-423.613-31.586-418.147-7.206-409.12-1.491-407.026 4.317-404.654 10.556-401.866L12.316-401.08ZM-79.775-448.367C-73.201-483.209-60.13-515.995-40.897-545.877-6.886-535.517 24.3-518.991 51.851-496.732 32.006-477.206 15.056-455.012 1.429-430.703-24.667-440.404-51.969-446.344-79.775-448.367M86.639-496.847C114.048-519.323 145.125-536.061 179.058-546.629 198.353-517.083 211.691-484.316 218.564-449.39 190.84-447.185 163.584-441.053 137.485-431.151 123.755-455.34 106.664-477.422 86.639-496.847M187.61-573.147 187.37-573.086C180.878-571.432 174.184-569.472 167.472-567.255 131.354-555.352 98.3-536.941 69.203-512.519 39.935-536.745 6.745-554.948-29.467-566.63-36.126-568.753-42.839-570.662-49.427-572.302L-50.467-572.561-51.385-571.694-51.527-571.511C-55.52-565.944-59.388-560.144-63.025-554.274-83.1-521.861-96.604-486.51-103.176-449.181-141.132-448.972-178.273-441.611-213.601-427.29-220.11-424.621-226.471-421.776-232.516-418.829L-233.618-418.292V-417.066C-233.112-410.084-232.355-403.144-231.363-396.263-225.933-358.53-213.591-322.765-194.672-289.926-223.626-265.367-247.364-235.883-265.245-202.269-268.512-196.056-271.56-189.779-274.308-183.603L-274.476-183.224V-182.005L-273.915-181.402C-268.922-176.309-263.881-171.48-258.933-167.054-230.581-141.634-198.146-122.138-162.509-109.091-168.943-71.619-168.198-33.773-160.294 3.418-158.7 10.726-157.062 17.294-155.288 23.504L-155.155 23.964-154.326 24.846-153.567 24.951C-146.531 25.66-139.57 26.129-132.877 26.344-129.578 26.455-126.28 26.509-122.979 26.509-88.273 26.509-54.213 20.557-21.721 8.816-2.596 41.686 22.28 70.23 52.234 93.669 57.687 97.911 63.322 102.013 68.99 105.866L69.49 106.206H70.697L71.23 105.866C76.995 101.946 82.634 97.832 87.988 93.638 118.25 69.956 143.327 41.086 162.546 7.806 194.837 19.368 228.611 25.229 262.959 25.229 266.94 25.229 270.926 25.15 274.907 24.989 281.989 24.662 288.933 24.141 295.559 23.437L296.216 23.368 297.095 22.541 297.274 21.985C299.077 15.534 300.719 8.743 302.154 1.801 309.807-35.459 310.299-73.293 303.622-110.68 339.172-123.981 371.481-143.695 399.668-169.298 404.635-173.831 409.63-178.688 414.523-183.739L415.075-184.308V-185.531L414.897-185.952C411.902-192.501 408.8-198.757 405.679-204.544 387.656-237.947 363.738-267.264 334.574-291.706 353.273-324.719 365.374-360.582 370.548-398.323 371.454-405.062 372.157-411.998 372.638-418.948L372.702-419.873 371.803-420.72 371.492-420.883C365.198-423.889 358.802-426.681 352.483-429.185 317.224-443.232 280.081-450.356 242.101-450.356 242.099-450.356 242.03-450.354 242.03-450.354 235.17-487.66 221.415-522.927 201.131-555.199 197.437-561.026 193.515-566.791 189.472-572.34L188.884-573.147Z",
  },
  {
    tx: 462.4212,
    ty: 601.4557,
    d: "M0 0C1.081-.402 2.161-.772 3.273-1.142 4.526-1.646 5.629-2.077 6.766-2.476L7.237-2.64 7.572-3.012C10.916-6.714 14.581-10.494 18.465-14.248 19.32-15.131 20.124-15.94 20.96-16.654 26.193-21.675 31.538-26.388 36.94-30.747 42.397-26.394 47.804-21.709 53.031-16.81L55.537-14.395C59.124-10.985 62.699-7.348 66.501-3.246L66.804-2.909C67.587-2.064 68.388-1.171 69.157-.278L69.867 .55 70.944 .383C72.138 .199 73.332 .013 74.554-.107H74.688L75.006-.18C80.17-.891 85.501-1.458 90.846-1.866L94.054-2.085C99.704-2.435 105.464-2.614 111.178-2.614 112.565-2.614 113.954-2.602 115.345-2.583 116.73 4.282 117.863 11.349 118.716 18.446 118.857 19.483 118.968 20.511 119.078 21.521L119.124 21.95C119.681 27.118 120.091 32.385 120.342 37.603 120.432 39.095 120.463 40.235 120.492 41.374L120.522 42.473 121.48 43.236C122.486 43.817 123.492 44.426 124.468 45.066L124.621 45.215 124.851 45.309C129.3 48.091 133.762 51.105 138.116 54.267 139.012 54.876 139.857 55.482 140.702 56.145 146.272 60.203 151.852 64.646 157.351 69.404 153.889 75.759 150.172 81.964 146.288 87.865 145.713 88.787 145.106 89.666 144.502 90.544 141.595 94.933 138.56 99.197 135.445 103.27L135.253 103.521 135.226 103.594C134.312 104.816 133.544 105.807 132.751 106.771L132.059 107.608 133.693 112.575C135.339 117.888 136.759 122.942 137.993 127.941 138.277 128.988 138.52 129.988 138.733 131.017 140.336 137.69 141.714 144.632 142.847 151.726 136.523 154.207 129.84 156.521 122.958 158.616 121.938 158.924 120.917 159.235 119.896 159.512 115 160.973 109.896 162.308 104.68 163.49L99.369 164.649 97.476 169.35 99.133 170.472 97.321 169.719C95.313 174.554 93.138 179.367 90.856 184.027 90.339 185.094 89.904 185.992 89.44 186.862 86.393 193.005 83 199.194 79.317 205.32 72.776 203.114 66.175 200.595 59.676 197.816 58.678 197.41 57.739 197.019 56.8 196.563 52.086 194.529 47.352 192.281 42.65 189.85L42.441 189.742 42.213 189.687C41.082 189.068 39.866 188.443 38.649 187.788L37.706 187.282 36.771 187.799C35.604 188.443 34.439 189.089 33.242 189.671L33.025 189.729 32.813 189.888C28.061 192.377 23.345 194.655 18.797 196.661 17.796 197.144 16.827 197.567 15.857 197.962 9.722 200.65 3.148 203.212-3.742 205.598-7.381 199.66-10.822 193.501-13.982 187.276-14.349 186.6-14.664 185.977-14.978 185.356L-15.497 184.335C-17.886 179.493-20.073 174.713-21.977 170.156L-22.016 169.999-22.14 169.798C-22.671 168.552-23.2 167.307-23.698 166.06L-24.096 165.063-25.152 164.862C-26.446 164.615-27.739 164.337-29.032 164.031L-29.256 163.977H-29.486C-34.39 162.867-39.484 161.586-44.623 160.118L-47.762 159.229C-54.539 157.209-61.387 154.879-68.107 152.306-67.022 145.274-65.652 138.267-64.029 131.452-63.862 130.651-63.677 129.907-63.495 129.173L-63.276 128.281C-61.998 123.113-60.548 117.941-58.967 112.919L-57.428 108.037-58.084 107.227C-58.856 106.269-59.597 105.313-60.337 104.324L-60.609 103.987C-63.717 99.961-66.71 95.813-69.758 91.306-70.467 90.339-71.067 89.404-71.672 88.438-75.549 82.621-79.254 76.528-82.726 70.266-77.472 65.642-71.933 61.149-66.242 56.896-65.378 56.248-64.518 55.602-63.627 54.985-59.222 51.764-54.799 48.739-50.435 45.963L-50.147 45.782C-49.139 45.108-48.101 44.468-47.062 43.857L-46.097 43.288V42.167C-46.097 41.004-46.037 39.871-45.978 38.71L-45.966 38.501-45.995 38.199C-45.754 32.901-45.376 27.666-44.847 22.504-44.752 21.333-44.631 20.168-44.476 19.005-43.669 11.824-42.585 4.779-41.249-1.997-39.141-2.046-37.039-2.071-34.939-2.071-29.9-2.071-24.874-1.928-19.998-1.644-18.81-1.581-17.63-1.518-16.449-1.426-11.514-1.1-6.446-.6-.933 .107L-.454 .169ZM35.731-58.996C30.483-55.246 25.214-51.17 19.626-46.537 10.966-39.325 2.75-31.655-4.809-23.723-14.89-24.761-25.074-25.286-35.098-25.286L-38.289-25.269C-45.261-25.206-52.1-24.895-58.611-24.349L-60.002-24.234-60.346-22.88C-62.09-16.043-63.541-9.354-64.66-2.997-66.664 7.936-68.061 19.109-68.808 30.216-78.066 36.476-87.005 43.295-95.389 50.5-100.329 54.677-105.234 59.178-110.377 64.253L-111.369 65.232-110.772 66.491C-107.961 72.418-104.87 78.311-101.323 84.504-95.872 94.132-89.756 103.59-83.136 112.622-86.213 123.4-88.693 134.393-90.505 145.314-91.64 151.887-92.536 158.664-93.169 165.443L-93.297 166.834-92.025 167.41C-86.022 170.137-79.865 172.676-73.207 175.174-62.692 179.081-51.785 182.436-40.768 185.151-36.275 195.157-31.111 205.073-25.411 214.632-21.995 220.422-18.293 226.193-14.415 231.777L-13.619 232.923-12.276 232.547C-5.589 230.683 .941 228.592 7.135 226.331 17.66 222.576 27.963 218.213 37.76 213.362 47.651 218.171 58.005 222.472 68.553 226.153 74.941 228.408 81.477 230.457 87.974 232.237L89.321 232.605 90.113 231.453C93.945 225.862 97.616 220.06 101.019 214.207 106.679 204.55 111.779 194.592 116.188 184.605 126.903 181.888 137.596 178.537 147.985 174.638 154.335 172.245 160.647 169.61 166.749 166.811L168.02 166.226 167.884 164.835C167.205 157.88 166.297 151.076 165.188 144.611 163.327 133.655 160.838 122.736 157.79 112.142 164.379 103.065 170.509 93.458 176.017 83.571 179.269 77.844 182.415 71.762 185.364 65.51L185.962 64.244 184.96 63.267C180.064 58.499 174.977 53.891 169.838 49.572 161.268 42.324 152.279 35.578 143.109 29.509 142.298 18.408 140.842 7.237 138.773-3.715 137.575-10.132 136.083-16.796 134.337-23.518L133.985-24.878 132.584-24.982C125.93-25.476 119.085-25.742 112.239-25.773L110.651-25.777C99.94-25.777 89.223-25.175 78.787-23.985 71.193-31.885 62.902-39.515 54.135-46.673 48.929-50.988 43.497-55.141 37.999-59.005L36.861-59.804Z",
  },
];

// Coordinate Dimensions: FIT_SIZE = 340 gives 110px padding top/bottom inside 560px height
const FIT_SIZE = 340;
const V_WIDTH = 1000;
const V_HEIGHT = 560;
const CENTER_X = V_WIDTH / 2;
const CENTER_Y = V_HEIGHT / 2;

// High-definition Supernova Particle Interface
interface SupernovaParticle {
  targetX: number;
  targetY: number;
  normTargetDist: number;
  isInner: boolean;

  infallRadius: number;
  infallAngle: number;
  infallSpiralTurns: number;

  blastRadius: number;
  blastAngle: number;
  blastSpeed: number;

  x: number;
  y: number;
  prevX: number;
  prevY: number;
  size: number;
  baseColor: string;
  glowColor: string;
  alpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface CosmicDust {
  radius: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  alpha: number;
  pulsePhase: number;
}

// Color palette mapping based on relative position or angle
function getRivinityColor(
  angle: number,
  isInner?: boolean,
): { hex: string; glow: string } {
  const normalized = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const frac = normalized / (Math.PI * 2);

  if (isInner) {
    // Inner particles: clean light orange tones (strictly no yellow)
    return frac < 0.5
      ? { hex: "#FF944D", glow: "rgba(255, 148, 77, 0.75)" }
      : { hex: "#FFA866", glow: "rgba(255, 168, 102, 0.8)" };
  }

  if (frac < 0.28) {
    return { hex: "#EA580C", glow: "rgba(234, 88, 12, 0.7)" }; // Dark Orange
  } else if (frac < 0.58) {
    return { hex: "#FF6B00", glow: "rgba(255, 107, 0, 0.75)" }; // Vibrant Brand Orange
  } else if (frac < 0.82) {
    return { hex: "#FF8A3D", glow: "rgba(255, 138, 61, 0.8)" }; // Warm Orange
  } else {
    return { hex: "#FFA866", glow: "rgba(255, 168, 102, 0.85)" }; // Light Orange
  }
}

// Easing helpers
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
const easeOutBack = (x: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const t = clamp01(x);
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

interface SupernovaCanvasProps {
  scrollProgress: MotionValue<number>;
}

export const RivinitySupernovaCanvas: React.FC<SupernovaCanvasProps> = ({
  scrollProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlaySvgRef = useRef<SVGSVGElement>(null);
  const overlayGroupRef = useRef<SVGGElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  // Smooth interpolated scroll progress (prevents discrete wheel jump)
  const targetProgressRef = useRef<number>(0);
  const smoothProgressRef = useRef<number>(0);

  // Fit transform in React state for full vector rendering
  const [fit, setFit] = useState<{
    scale: number;
    tx: number;
    ty: number;
  } | null>(null);

  // Mouse interaction
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: CENTER_X,
    y: CENTER_Y,
    active: false,
  });

  // Shockwave pulses triggered on manual click
  const shockwavesRef = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }>
  >([]);

  // Particles state ref
  const particlesRef = useRef<SupernovaParticle[]>([]);
  const dustRef = useRef<CosmicDust[]>([]);
  const fitRef = useRef<{ scale: number; tx: number; ty: number }>({
    scale: 1,
    tx: 0,
    ty: 0,
  });

  // Update target progress when user scrolls
  useMotionValueEvent(scrollProgress, "change", (latest) => {
    targetProgressRef.current = clamp01(latest);
  });

  // Sample SVG Logo Points once on mount
  useEffect(() => {
    if (typeof document === "undefined") return;

    const svgNS = "http://www.w3.org/2000/svg";
    const holder = document.createElementNS(svgNS, "svg");
    holder.setAttribute("width", "0");
    holder.setAttribute("height", "0");
    holder.style.position = "absolute";
    holder.style.visibility = "hidden";
    document.body.appendChild(holder);

    const outerSamples = 760;
    const innerSamples = 400;
    const sampleConfigs = [
      { pathIndex: 0, count: outerSamples, isInner: false },
      { pathIndex: 1, count: innerSamples, isInner: true },
    ];

    const rawSubs: { pt: Pt; isInner: boolean }[] = [];

    sampleConfigs.forEach(({ pathIndex, count, isInner }) => {
      const rp = RAW_PATHS[pathIndex];
      const p = document.createElementNS(svgNS, "path");
      p.setAttribute("d", rp.d);
      holder.appendChild(p);
      const totalLen = p.getTotalLength();

      for (let i = 0; i < count; i++) {
        const len = (i / count) * totalLen;
        const pt = p.getPointAtLength(len);
        rawSubs.push({
          pt: [pt.x + rp.tx, rp.ty - pt.y],
          isInner,
        });
      }
    });

    document.body.removeChild(holder);

    // Compute bounding box
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    for (const item of rawSubs) {
      const [x, y] = item.pt;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }

    const w = maxX - minX;
    const h = maxY - minY;
    const scale = FIT_SIZE / Math.max(w, h);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const tx = CENTER_X - cx * scale;
    const ty = CENTER_Y - cy * scale;

    const fitData = { scale, tx, ty };
    fitRef.current = fitData;
    setFit(fitData);

    if (overlayGroupRef.current) {
      overlayGroupRef.current.setAttribute(
        "transform",
        `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(5)})`,
      );
    }

    // Build Supernova Particles
    const particles: SupernovaParticle[] = rawSubs.map(({ pt, isInner }) => {
      const targetX = pt[0] * scale + tx;
      const targetY = pt[1] * scale + ty;

      const dx = targetX - CENTER_X;
      const dy = targetY - CENTER_Y;
      const targetDist = Math.sqrt(dx * dx + dy * dy);
      const targetAngle = Math.atan2(dy, dx);

      // Infall initial properties: spiral in from outer cosmos (260px - 650px)
      const infallRadius = 280 + Math.random() * 400 + (isInner ? 50 : 0);
      const infallAngle = targetAngle + (Math.random() - 0.5) * 2.5;
      const infallSpiralTurns = 1.8 + Math.random() * 2.2;

      // Supernova explosion blast properties (shoot outward 180px - 480px)
      const blastRadius = 160 + Math.random() * 340;
      const blastAngle = targetAngle + (Math.random() - 0.5) * 0.9;
      const blastSpeed = 0.8 + Math.random() * 0.8;

      const colors = getRivinityColor(targetAngle, isInner);

      return {
        targetX,
        targetY,
        normTargetDist: targetDist / (FIT_SIZE / 2),
        isInner,

        infallRadius,
        infallAngle,
        infallSpiralTurns,

        blastRadius,
        blastAngle,
        blastSpeed,

        x: CENTER_X + Math.cos(infallAngle) * infallRadius,
        y: CENTER_Y + Math.sin(infallAngle) * infallRadius,
        prevX: CENTER_X + Math.cos(infallAngle) * infallRadius,
        prevY: CENTER_Y + Math.sin(infallAngle) * infallRadius,
        size: isInner ? 1.4 + Math.random() * 1.0 : 1.8 + Math.random() * 1.5,
        baseColor: colors.hex,
        glowColor: colors.glow,
        alpha: 0.85 + Math.random() * 0.15,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.04 + Math.random() * 0.06,
      };
    });

    particlesRef.current = particles;

    // Ambient floating space dust
    const dustParticles: CosmicDust[] = [];
    for (let i = 0; i < 90; i++) {
      const radius = 60 + Math.random() * 450;
      const angle = Math.random() * Math.PI * 2;
      dustParticles.push({
        radius,
        angle,
        speed: (Math.random() - 0.5) * 0.003,
        size: 0.8 + Math.random() * 1.6,
        color: i % 2 === 0 ? "#FF6B00" : i % 3 === 0 ? "#EA580C" : "#FFA866",
        alpha: 0.2 + Math.random() * 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    dustRef.current = dustParticles;
  }, []);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animFrameId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Smooth exponential lerp toward current scroll target
      const targetP = targetProgressRef.current;
      smoothProgressRef.current += (targetP - smoothProgressRef.current) * 0.12;
      const p = clamp01(smoothProgressRef.current);

      // Cross-fade:
      // When p reaches 0.65 -> 0.85:
      // - The proper vector logo smoothly cross-fades in to 100%
      // - The particle dots smoothly fade out to 0%
      // Once p >= 0.85, ALL DOTS ARE COMPLETELY REMOVED, leaving only the clean proper logo!
      const logoOpacity = clamp01((p - 0.65) / 0.18);
      const particleAlpha = Math.max(0, 1 - logoOpacity);

      if (overlaySvgRef.current) {
        overlaySvgRef.current.style.opacity = `${logoOpacity}`;
      }
      if (auraRef.current) {
        auraRef.current.style.opacity = `${0.2 + logoOpacity * 0.7}`;
      }

      // Handle Canvas Sizing with Retina / High-DPI support
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (
        canvas.width !== rect.width * dpr ||
        canvas.height !== rect.height * dpr
      ) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale((rect.width * dpr) / V_WIDTH, (rect.height * dpr) / V_HEIGHT);

      // Clear canvas
      ctx.clearRect(0, 0, V_WIDTH, V_HEIGHT);

      // -----------------------------------------------------------------
      // LAYER 1: Deep Cosmic Nebula & Singularity Back-Glow
      // -----------------------------------------------------------------
      ctx.globalCompositeOperation = "source-over";

      // Soft elliptical cosmic nebula aura (safely bounded so it terminates well within canvas boundaries)
      ctx.save();
      ctx.translate(CENTER_X, CENTER_Y);
      ctx.scale(1.2, 0.65); // Elliptical scaling keeps vertical reach ~195px, well clear of the 280px top/bottom canvas edge

      const nebulaGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 300);

      if (p >= 0.22 && p < 0.45) {
        // Flash aura during detonation
        const flashIntensity = 1 - (p - 0.22) / 0.23;
        nebulaGrad.addColorStop(
          0,
          `rgba(255, 255, 255, ${0.35 * flashIntensity})`,
        );
        nebulaGrad.addColorStop(
          0.2,
          `rgba(255, 148, 77, ${0.25 * flashIntensity})`,
        );
        nebulaGrad.addColorStop(
          0.5,
          `rgba(245, 169, 208, ${0.14 * flashIntensity})`,
        );
        nebulaGrad.addColorStop(
          0.75,
          `rgba(139, 92, 246, ${0.07 * flashIntensity})`,
        );
        nebulaGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
      } else if (p >= 0.65) {
        // Soft ethereal corona behind the formed logo
        const settleOp = clamp01((p - 0.65) / 0.35);
        const pulse = 1 + Math.sin(time * 0.002) * 0.03;
        nebulaGrad.addColorStop(
          0,
          `rgba(255, 148, 77, ${0.07 * settleOp * pulse})`,
        );
        nebulaGrad.addColorStop(
          0.35,
          `rgba(245, 169, 208, ${0.055 * settleOp})`,
        );
        nebulaGrad.addColorStop(0.7, `rgba(139, 92, 246, ${0.03 * settleOp})`);
        nebulaGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
      } else {
        // Infall singularity core
        const coreIntensity = p / 0.22;
        nebulaGrad.addColorStop(
          0,
          `rgba(255, 148, 77, ${0.2 + coreIntensity * 0.35})`,
        );
        nebulaGrad.addColorStop(
          0.4,
          `rgba(216, 165, 242, ${0.1 + coreIntensity * 0.2})`,
        );
        nebulaGrad.addColorStop(1, "rgba(216, 165, 242, 0)");
      }

      ctx.fillStyle = nebulaGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 300, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // -----------------------------------------------------------------
      // LAYER 2: Detonation Shockwave Rings & Diffraction Star Spikes
      // -----------------------------------------------------------------
      ctx.globalCompositeOperation = "lighter";

      // Active detonation flash & star spikes scrubbable directly by scroll (p: 0.22 -> 0.45)
      if (p >= 0.22 && p < 0.45) {
        const blastT = (p - 0.22) / 0.23; // 0..1
        const flashRadius = blastT * 420;
        const flashAlpha = Math.max(0, 1 - blastT * 1.2);

        // Expanding supersonic shockwave ring 1 (light orange)
        ctx.beginPath();
        ctx.arc(CENTER_X, CENTER_Y, flashRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 148, 77, ${flashAlpha * 0.9})`;
        ctx.lineWidth = Math.max(1, 14 * (1 - blastT));
        ctx.stroke();

        // Expanding shockwave ring 2 (chromatic lag)
        if (blastT > 0.08) {
          const r2 = (blastT - 0.08) * 380;
          ctx.beginPath();
          ctx.arc(CENTER_X, CENTER_Y, r2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(245, 169, 208, ${flashAlpha * 0.8})`;
          ctx.lineWidth = Math.max(1, 8 * (1 - blastT));
          ctx.stroke();
        }

        // Expanding shockwave ring 3 (violet aura)
        if (blastT > 0.16) {
          const r3 = (blastT - 0.16) * 350;
          ctx.beginPath();
          ctx.arc(CENTER_X, CENTER_Y, r3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(139, 92, 246, ${flashAlpha * 0.7})`;
          ctx.lineWidth = Math.max(1, 6 * (1 - blastT));
          ctx.stroke();
        }

        // Diffraction spikes (8-point starburst rays)
        const rayLen = (1 - blastT) * 440;
        if (rayLen > 10) {
          for (let i = 0; i < 8; i++) {
            const rayAngle = (i * Math.PI) / 4 + blastT * 0.4;
            const rx = Math.cos(rayAngle) * rayLen;
            const ry = Math.sin(rayAngle) * rayLen;

            const rayGrad = ctx.createLinearGradient(
              CENTER_X - rx,
              CENTER_Y - ry,
              CENTER_X + rx,
              CENTER_Y + ry,
            );
            rayGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
            rayGrad.addColorStop(
              0.5,
              `rgba(255, 255, 255, ${flashAlpha * 0.9})`,
            );
            rayGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

            ctx.beginPath();
            ctx.moveTo(CENTER_X - rx, CENTER_Y - ry);
            ctx.lineTo(CENTER_X + rx, CENTER_Y + ry);
            ctx.strokeStyle = rayGrad;
            ctx.lineWidth = Math.max(0.5, 4 * (1 - blastT));
            ctx.stroke();
          }
        }
      }

      // Manual interactive shockwaves
      if (shockwavesRef.current.length > 0) {
        shockwavesRef.current.forEach((sw) => {
          sw.radius += dt * 420;
          sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

          if (sw.alpha > 0.01) {
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 148, 77, ${sw.alpha * 0.6})`;
            ctx.lineWidth = Math.max(1, 4 * sw.alpha);
            ctx.stroke();
          }
        });
        shockwavesRef.current = shockwavesRef.current.filter(
          (sw) => sw.alpha > 0.02,
        );
      }

      // -----------------------------------------------------------------
      // LAYER 3: Ambient Cosmic Dust (Fades out when logo forms)
      // -----------------------------------------------------------------
      if (particleAlpha > 0.01) {
        dustRef.current.forEach((dust) => {
          dust.angle += dust.speed;
          const dx = Math.cos(dust.angle) * dust.radius;
          const dy = Math.sin(dust.angle) * dust.radius;
          const px = CENTER_X + dx;
          const py = CENTER_Y + dy;

          const pulse = 0.6 + 0.4 * Math.sin(time * 0.002 + dust.pulsePhase);
          ctx.fillStyle = dust.color;
          ctx.globalAlpha = dust.alpha * pulse * particleAlpha * 0.35;
          ctx.beginPath();
          ctx.arc(px, py, dust.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // -----------------------------------------------------------------
      // LAYER 4: Supernova Particles (Fades out completely once proper logo is made)
      // -----------------------------------------------------------------
      if (particleAlpha > 0.005) {
        ctx.globalCompositeOperation = "source-over"; // Reset to source-over so overlapping particles keep their light orange color without turning yellow
        const particles = particlesRef.current;

        for (let i = 0; i < particles.length; i++) {
          const pt = particles[i];
          pt.prevX = pt.x;
          pt.prevY = pt.y;

          if (p < 0.22) {
            // PHASE 0: Singularity Accretion (Cosmic Infall)
            const tInfall = p / 0.22; // 0..1
            const currentRadius = pt.infallRadius * Math.pow(1 - tInfall, 1.8);
            const currentAngle =
              pt.infallAngle +
              pt.infallSpiralTurns * Math.PI * 2 * Math.pow(tInfall, 1.4);

            const jitter =
              tInfall > 0.7 ? (Math.random() - 0.5) * 8 * (tInfall - 0.7) : 0;
            pt.x = CENTER_X + Math.cos(currentAngle) * currentRadius + jitter;
            pt.y = CENTER_Y + Math.sin(currentAngle) * currentRadius + jitter;
          } else if (p < 0.45) {
            // PHASE 1: Supernova Detonation (Violent Blast Outward)
            const tBlast = (p - 0.22) / 0.23; // 0..1
            const blastDist =
              pt.blastRadius * easeOutCubic(tBlast) * pt.blastSpeed;
            const currentAngle = pt.blastAngle;

            pt.x = CENTER_X + Math.cos(currentAngle) * blastDist;
            pt.y = CENTER_Y + Math.sin(currentAngle) * blastDist;
          } else {
            // PHASE 2 & 3: Magnetic Coalescence & Locking (Curving to Target)
            const tMorph = (p - 0.45) / 0.45; // 0..1
            const easedMorph = easeOutBack(Math.min(1, tMorph));

            const blastX =
              CENTER_X +
              Math.cos(pt.blastAngle) * (pt.blastRadius * pt.blastSpeed);
            const blastY =
              CENTER_Y +
              Math.sin(pt.blastAngle) * (pt.blastRadius * pt.blastSpeed);

            const controlRadius = pt.blastRadius * 0.6;
            const arcAngle =
              (pt.blastAngle +
                Math.atan2(pt.targetY - CENTER_Y, pt.targetX - CENTER_X)) /
                2 +
              0.4;
            const ctrlX = CENTER_X + Math.cos(arcAngle) * controlRadius;
            const ctrlY = CENTER_Y + Math.sin(arcAngle) * controlRadius;

            const mt = 1 - easedMorph;
            const targetCurX =
              mt * mt * blastX +
              2 * mt * easedMorph * ctrlX +
              easedMorph * easedMorph * pt.targetX;
            const targetCurY =
              mt * mt * blastY +
              2 * mt * easedMorph * ctrlY +
              easedMorph * easedMorph * pt.targetY;

            pt.x = targetCurX;
            pt.y = targetCurY;
          }

          // Draw particle dot with smooth cross-fade out
          const twinkle =
            0.7 + 0.3 * Math.sin(time * pt.twinkleSpeed + pt.twinklePhase);
          ctx.globalAlpha = pt.alpha * twinkle * particleAlpha;

          ctx.fillStyle = pt.baseColor;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();

          // Speed trail during detonation & locking
          if (
            p >= 0.22 &&
            p < 0.7 &&
            (Math.abs(pt.x - pt.prevX) > 1.5 || Math.abs(pt.y - pt.prevY) > 1.5)
          ) {
            ctx.beginPath();
            ctx.moveTo(pt.prevX, pt.prevY);
            ctx.lineTo(pt.x, pt.y);
            ctx.strokeStyle = pt.glowColor;
            ctx.lineWidth = pt.size * 0.8 * particleAlpha;
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Handle canvas mouse move for interactive deflection
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * V_WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * V_HEIGHT;
    mouseRef.current = { x, y, active: true };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  // Click on canvas triggers a shockwave pulse
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * V_WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * V_HEIGHT;

    shockwavesRef.current.push({
      x,
      y,
      radius: 5,
      maxRadius: 360,
      alpha: 1.0,
    });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex-1 min-h-[260px] sm:min-h-[340px] md:min-h-[400px] max-h-[55vh] flex items-center justify-center select-none my-auto">
      {/* Canvas for High-Performance 120fps Particle Supernova */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full cursor-crosshair z-10"
        style={{
          willChange: "transform",
          touchAction: "none",
          WebkitMaskImage:
            "radial-gradient(ellipse 92% 76% at 50% 50%, black 45%, black 68%, transparent 98%)",
          maskImage:
            "radial-gradient(ellipse 92% 76% at 50% 50%, black 45%, black 68%, transparent 98%)",
        }}
      />

      {/* Crisp Vector SVG Logo (cross-fades in smoothly as particles crystallize) */}
      <svg
        ref={overlaySvgRef}
        viewBox={`0 0 ${V_WIDTH} ${V_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-200 ease-out"
        style={{
          opacity: 0,
          filter:
            "drop-shadow(0 0 18px rgba(255, 107, 0, 0.32)) drop-shadow(0 0 36px rgba(255, 163, 89, 0.20))",
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={LOGO_GRADIENT_ID}
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            {LOGO_GRADIENT_STOPS.map((s) => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>

        <g
          ref={overlayGroupRef}
          transform={
            fit
              ? `translate(${fit.tx.toFixed(2)} ${fit.ty.toFixed(2)}) scale(${fit.scale.toFixed(5)})`
              : undefined
          }
        >
          {RAW_PATHS.map((rp, i) => (
            <path
              key={i}
              d={rp.d}
              transform={`matrix(1,0,0,-1,${rp.tx},${rp.ty})`}
              fill={`url(#${LOGO_GRADIENT_ID})`}
            />
          ))}
        </g>
      </svg>

      {/* Ambient cosmic aura ring behind the logo */}
      <div
        ref={auraRef}
        className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full pointer-events-none transition-opacity duration-500 blur-3xl z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 0, 0.16) 0%, rgba(255, 163, 89, 0.10) 40%, rgba(255, 230, 210, 0.05) 70%, transparent 100%)",
          opacity: 0.25,
        }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Scroll-Driven Section Component                                    */
/* ------------------------------------------------------------------ */
export function PoweredByRivinity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[125vh] sm:h-[145vh] md:h-[175vh] lg:h-[195vh] bg-white border-b border-gray-100/60"
      id="powered-by-rivinity"
    >
      {/* Sticky Fullscreen Stage - Naturally positioned with top clearance below fixed header */}
      <div className="sticky top-0 h-dvh min-h-[480px] w-full flex flex-col items-center justify-between pt-20 pb-5 sm:pt-22 sm:pb-7 md:pt-24 md:pb-8 px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-1.5 sm:space-y-2 shrink-0">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight">
            Born from a supernova, unified as Rivinity
          </h2>

          <p className="text-xs sm:text-sm md:text-base font-normal text-slate-500 max-w-xl mx-auto leading-relaxed px-2">
            Scroll to detonate cosmic energy into a radiant supernova
            crystallizing into the unified Rivinity identity.
          </p>
        </div>

        {/* Supernova Particle Canvas & Logo Fusion */}
        <RivinitySupernovaCanvas scrollProgress={scrollYProgress} />

        {/* Scroll Indicator Prompt */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="flex flex-col items-center gap-0.5 sm:gap-1 text-slate-400 text-xs shrink-0 pointer-events-none select-none"
        >
          <span className="font-medium tracking-wider uppercase text-[10px] text-slate-400">
            Scroll to trigger supernova
          </span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

export default PoweredByRivinity;
