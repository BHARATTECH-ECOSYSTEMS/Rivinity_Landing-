"use client";

import type { NextPage } from "next";
import { useRef, useState } from "react";

export type BenchmarkType = {
  className?: string;
};

const MIN_PERCENT = 0;
const MAX_PERCENT = 100;
// How long the "snap back to center" animation takes once the cursor
// leaves the track. Live hover-tracking always uses 0ms (instant), so
// this only kicks in for the return-to-center motion.
const RETURN_DURATION_MS = 500;

const Benchmark: NextPage<BenchmarkType> = ({ className = "" }) => {
  // Percentage of the card width revealed for the "Rivinity automation"
  // panel (front layer, left side). 50 = centered.
  const [percent, setPercent] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const clamp = (value: number) =>
    Math.min(MAX_PERCENT, Math.max(MIN_PERCENT, value));

  // Shared transition style: 0ms while actively hovering (so live tracking
  // stays instant and lag-free), RETURN_DURATION_MS once the cursor leaves
  // (so the snap-back to center is visibly animated). Applied via inline
  // style rather than a toggled className so it always wins over any other
  // transition classes already on these elements.
  const returnTransition = (property: string) => ({
    transitionProperty: property,
    transitionDuration: isHovering ? "0ms" : `${RETURN_DURATION_MS}ms`,
    transitionTimingFunction: "ease-out",
  });

  // Works for both mouse and touch (pointer events cover both).
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsHovering(true);
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = ((e.clientX - rect.left) / rect.width) * 100;
    setPercent(clamp(ratio));
  };

  // Once the cursor/touch leaves, animate back to center.
  const handlePointerLeave = () => {
    setIsHovering(false);
    setPercent(50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPercent((p) => clamp(p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPercent((p) => clamp(p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPercent(MIN_PERCENT);
    } else if (e.key === "End") {
      e.preventDefault();
      setPercent(MAX_PERCENT);
    }
  };

  return (
    <section
      className={`grid px-4 sm:px-6 overflow-x-clip py-12 sm:py-16 lg:py-20 gap-8 sm:gap-12 grid-cols-12 text-[#181818] ${className} mx-auto w-full max-w-350 mt-6 sm:mt-10`}
    >
      <div className="relative col-start-1 -col-end-1">
        <div className="hidden sm:block absolute top-0 bg-[#d6d6d6] -left-3 sm:-left-6 h-full transition-colors duration-400" />
        <div>
          <div>
            <div className="flex relative flex-col lg:flex-row items-start gap-y-8 gap-x-12 justify-center">
              <div className="flex flex-col gap-1.5 flex-none w-full lg:w-82 transition duration-600 ease-[cubic-bezier(0.3,0.7,0.2,1)]">
                <h3 className="text-balance text-xl sm:text-2xl lg:text-[1.625rem] font-medium leading-7 sm:leading-8 transition-colors duration-400">
                  Ship faster with less manual setup
                </h3>
                <p className="font-medium text-[#858483] text-sm sm:text-base tracking-[0.01rem] transition-colors duration-400">
                  Rivinity wires up the infrastructure your product needs the
                  moment you start building. Authentication, databases,
                  deployment pipelines, and monitoring are provisioned
                  automatically, so your team spends time on the product, not
                  the plumbing underneath it.
                </p>
                <div className="flex gap-2 pt-2 mt-2.5">
                  <a
                    className="font-[ftSystemMono,monospace] rounded border px-4 py-2 inline-block ease-out cursor-pointer motion-safe:active:scale-[0.98] border-[#d6d6d6] bg-white text-[0.813rem] tracking-[0.01rem] uppercase leading-4 transition duration-400 hover:transition-colors hover:ease-[cubic-bezier(.6,0,.2,1)] hover:text-[#858483]"
                    href="#"
                  >
                    <span className="flex items-center gap-2">View Dashboard</span>
                  </a>
                </div>
              </div>

              <div className="basis-auto lg:basis-175 w-full lg:w-175 max-w-full shrink-0 overflow-auto transition-[flex-grow] duration-300 ease-[cubic-bezier(0.3,0.7,0.2,1)] scrollbar-none">
                <div className="flex relative justify-center items-center py-5 px-3 sm:px-8 lg:px-20 w-full min-h-88 sm:min-h-96 lg:h-[27.344rem] lg:aspect-752/470 overflow-hidden rounded bg-[#ebe9e3] transition duration-800 ease-[cubic-bezier(0.3,0.7,0.2,1)]">
                  <div className="flex flex-col gap-2 w-full max-w-full lg:max-w-135">
                    <div className="flex flex-col gap-3 py-4 px-4 sm:px-5 border border-[#eeeeee] rounded-md bg-white shadow-[0_0.094rem_0.047rem_0_rgb(0_0_0/0.03),0_0.188rem_0.031rem_0_rgb(0_0_0/0.02),0_0.313rem_0.031rem_0_rgb(0_0_0/0.01)]">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex shrink-0 mt-[0.188rem]">
                          <svg
                            className="block w-4.5 h-4.5"
                            fill="none"
                            height="18"
                            viewBox="0 0 18 18"
                            width="18"
                          >
                            <path
                              className="text-[#5c5b59]"
                              d="M15.7499 15.7501L12.4949 12.4951M14.25 8.25C14.25 11.5637 11.5637 14.25 8.25 14.25C4.93629 14.25 2.25 11.5637 2.25 8.25C2.25 4.93629 4.93629 2.25 8.25 2.25C11.5637 2.25 14.25 4.93629 14.25 8.25Z"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.4"
                            />
                          </svg>
                        </span>
                        <p className="text-base sm:text-lg leading-6 sm:leading-[1.519rem]">
                          <span>
                            What do I need to set up before I can ship this
                            feature?
                          </span>
                        </p>
                      </div>
                    </div>

                    <div
                      ref={trackRef}
                      onPointerMove={handlePointerMove}
                      onPointerLeave={handlePointerLeave}
                      className="grid relative rounded-md touch-pan-y select-none"
                    >
                      {/* Manual setup panel — back layer, ALWAYS full width, never clipped */}
                      <div className="flex flex-col justify-start gap-4 sm:gap-5 col-start-1 row-start-1 px-4 sm:px-5 pt-4 pb-5 overflow-hidden border border-[#eeeeee] rounded-md bg-white/40">
                        <div className="flex flex-col gap-6 sm:gap-8">
                          <span className="inline-flex items-center self-end p-2 rounded bg-[#d6d6d6] text-[0.688rem] sm:text-xs font-medium tracking-[-0.02em] uppercase leading-normal font-[ftSystemMono,monospace] whitespace-nowrap">
                            Manual setup
                          </span>
                          <div className="flex flex-col gap-3 sm:gap-4">
                            <span className="block text-[#858483] text-[0.688rem] sm:text-xs font-medium tracking-[0.04em] uppercase leading-[0.9rem] font-[ftSystemMono,monospace]">
                              Your team
                            </span>
                            <p className="text-sm sm:text-base leading-[1.35rem] sm:leading-[1.4rem]">
                              <span>
                                Someone provisions an auth provider by hand,
                                spins up a database, writes the CI/CD config
                                from scratch, and wires up logging and
                                monitoring one service at a time. Most of the
                                first sprint goes to infrastructure before any
                                feature code ships.
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Rivinity automation panel — front layer, clipped by drag position */}
                      <div
                        className="flex z-1 flex-col justify-start gap-4 sm:gap-5 col-start-1 row-start-1 px-4 sm:px-5 pt-4 pb-5 overflow-hidden border border-[#eeeeee] rounded-md bg-white"
                        style={{
                          clipPath: `inset(0 ${100 - percent}% 0 0)`,
                          ...returnTransition("clip-path"),
                        }}
                      >
                        <div className="flex flex-col gap-6 sm:gap-8">
                          <span className="inline-flex items-center self-start p-2 rounded text-white bg-[#fb631b] text-[0.688rem] sm:text-xs font-medium tracking-[-0.02em] uppercase leading-normal font-[ftSystemMono,monospace] whitespace-nowrap">
                            With Rivinity automation
                          </span>
                          <div className="flex flex-col gap-3 sm:gap-4">
                            <span className="block text-[#858483] text-[0.688rem] sm:text-xs font-medium tracking-[0.04em] uppercase leading-[0.9rem] font-[ftSystemMono,monospace]">
                              Your team
                            </span>
                            <p className="text-sm sm:text-base leading-[1.35rem] sm:leading-[1.4rem]">
                              <span>Auth, database, and monitoring are </span>
                              <span className="text-[#fb631b]">
                                wired up automatically in under 5 minutes
                              </span>
                              <span>, with a </span>
                              <span className="text-[#fb631b]">
                                zero-config CI/CD pipeline
                              </span>
                              <span> ready on first commit. Your team starts on </span>
                              <span className="text-[#fb631b]">
                                feature code, not scaffolding
                              </span>
                              <span>.</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 shrink-0 transition duration-660 ease-[cubic-bezier(0.3,0.7,0.2,1)] delay-80">
                          <span className="inline-flex items-center gap-1.5 px-2 h-6.5 border border-transparent rounded text-[#00ae4c] bg-[#c5efd0] text-[0.688rem] sm:text-xs font-medium tracking-[-0.02em] uppercase leading-normal font-[ftSystemMono,monospace] whitespace-nowrap">
                            <span
                              className="inline-flex justify-center items-center rounded w-3.5 h-3.5"
                              aria-hidden="true"
                            >
                              <svg
                                className="block w-2.7 h-2.7"
                                fill="none"
                                height="10.92"
                                viewBox="0 0 14 14"
                                width="10.92"
                              >
                                <path
                                  className="text-[#00ae4c]"
                                  d="M11.25 5.16699L5.40625 10.8337L2.75 8.2579"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.4"
                                />
                              </svg>
                            </span>
                            Production ready
                          </span>
                        </div>
                      </div>

                      {/* Divider line — instant while hovering, eases back to center on leave */}
                      <div
                        className="absolute z-2 top-0 bottom-0 bg-neutral-200 -translate-x-1/2 pointer-events-none"
                        style={{
                          left: `${percent}%`,
                          ...returnTransition("left"),
                        }}
                        aria-hidden="true"
                      />

                      {/* Handle (contains the <> arrows) — same transition rule as the
                          divider so both move in sync, whether tracking the cursor or
                          animating back to center. */}
                      <button
                        className="inline-flex absolute z-3 top-1/2 justify-center items-center w-8 h-8 border border-[#eeeeee] rounded-md bg-white/80 shadow-[0_0.125rem_0.25rem_0_rgb(0_0_0/0.08),0.063rem_0.125rem_0.125rem_0_rgb(0_0_0/0.02),0.125rem_0.313rem_0.125rem_0_rgb(0_0_0/0.01)] -translate-x-1/2 -translate-y-1/2 pointer-events-none touch-pan-y"
                        style={{
                          left: `${percent}%`,
                          ...returnTransition("left"),
                        }}
                        onKeyDown={handleKeyDown}
                        aria-label="Compare manual setup and Rivinity automation"
                        aria-orientation="horizontal"
                        aria-valuemax={100}
                        aria-valuemin={0}
                        aria-valuenow={Math.round(percent)}
                        role="slider"
                        type="button"
                        tabIndex={0}
                      >
                        <svg
                          className="block w-5.5 h-4"
                          fill="none"
                          height="16"
                          viewBox="0 0 22 16"
                          width="22"
                        >
                          <path
                            className="text-[#5c5b59]"
                            d="M8 4 4 8l4 4M14 4 18 8l-4 4"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block absolute top-0 bg-[#d6d6d6] -right-3 sm:-right-6 h-full transition-colors duration-400" />
      </div>
    </section>
  );
};

export default Benchmark;