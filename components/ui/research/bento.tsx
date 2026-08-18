"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";

export default function ResearchBentoGrid() {
  return (
    <section className="w-full bg-transparent px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1680px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
          
          {/* Card 1 */}
          <BentoCard
            eyebrow="Insight"
            title="Get perfect clarity"
            description="We explore autonomous systems that reason, adapt, and operate across complex digital environments."
            graphic={
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url(https://framerusercontent.com/images/ghyfFEStl6BNusZl0ZQd5r7JpM.png)",
                }}
              />
            }
            className="lg:col-span-3 lg:rounded-tl-[28px]"
          />

          {/* Card 2 */}
          <BentoCard
            eyebrow="Analysis"
            title="Undercut your competitors"
            description="With our advanced data mining, you’ll know which companies your leads are talking to and exactly how much they’re being charged."
            graphic={
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url(https://framerusercontent.com/images/7CJtT0Pu3w1vNADktNltoMFC9J4.png)",
                }}
              />
            }
            className="lg:col-span-3 lg:rounded-tr-[28px]"
          />

          {/* Card 3 */}
          <BentoCard
            eyebrow="Speed"
            title="Built for power users"
            description="It’s never been faster to cold email your entire contact list using our streamlined keyboard shortcuts."
            graphic={
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url(https://framerusercontent.com/images/gR21e8Wh6l3pU6CciDrqt8wjHM.png)",
                }}
              />
            }
            className="lg:col-span-2 lg:rounded-bl-[28px]"
          />

          {/* Card 4 */}
          <BentoCard
            eyebrow="Source"
            title="Get the furthest reach"
            description="Bypass those inconvenient privacy laws to source leads from the most unexpected places."
            graphic={
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url(https://framerusercontent.com/images/gR21e8Wh6l3pU6CciDrqt8wjHM.png)",
                }}
              />
            }
            className="lg:col-span-2"
          />

          {/* Card 5 */}
          <BentoCard
            eyebrow="Limitless"
            title="Sell globally"
            description="PerkAI helps you sell in locations currently under international embargo."
            graphic={
              <div
                className="absolute -left-40 -top-36 h-[150%] w-[150%] bg-contain bg-left-top bg-no-repeat"
                style={{
                  backgroundImage:
                    "url(https://framerusercontent.com/images/h496iPSwtSnGZwpJyErl6cLWdtE.png)",
                }}
              />
            }
            className="lg:col-span-2 lg:rounded-br-[28px]"
          />
        </div>
      </div>
    </section>
  );
}

export function BentoCard({
  className = "",
  eyebrow,
  title,
  description,
  graphic,
}: {
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{
        idle: {},
        active: {},
      }}
      className={clsx(
        className,
        "group relative flex min-h-[31rem] flex-col overflow-hidden rounded-[22px]",
        "border border-black/[0.08]",
        "bg-[#F1EFEB]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.035)]",
        "transition-all duration-500",
        "hover:-translate-y-[2px]",
        "hover:border-black/[0.14]",
        "hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
      )}
    >
      {/* Graphic */}
      <div className="relative min-h-[22rem] flex-1 overflow-hidden">
        <motion.div
          variants={{
            idle: {
              scale: 1,
            },
            active: {
              scale: 1.035,
            },
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          {graphic}
        </motion.div>

        {/* Soft transition from graphic to card */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            h-40
            bg-gradient-to-t
            from-[#F1EFEB]
            via-[#F1EFEB]/75
            to-transparent
          "
        />

        {/* Very subtle top glass effect */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-b
            from-black/[0.015]
            via-transparent
            to-transparent
          "
        />
      </div>

      {/* Content */}
      <div className="relative z-20 -mt-16 px-7 pb-8 sm:px-8">
        <span
          className="
            block
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-black/45
          "
        >
          {eyebrow}
        </span>

        <p
          className="
            mt-3
            max-w-[560px]
            text-[1.65rem]
            font-semibold
            leading-[1.12]
            tracking-[-0.025em]
            text-[#161616]
            sm:text-[1.75rem]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-3
            max-w-[600px]
            text-[0.94rem]
            leading-6
            text-black/55
          "
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}