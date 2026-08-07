import type { NextPage } from "next";
import { useState, useRef, useEffect } from "react";
import DivTestimonialsSectionModule from "./testimonials-section";

export type DivuseViewModuleVOhHaViType = {
  className?: string;
};

const DivuseViewModuleVOhHaVi: NextPage<DivuseViewModuleVOhHaViType> = ({
  className = "",
}) => {
  const baseTestimonials = [
    {
      byIntegratingWithLakebaseAnd:
        "By integrating with Lakebase and Databricks\nApps, we're combining Replit's capabilities\nwith trusted enterprise data and governance,\nhelping teams move from idea to production\nfaster and more securely than ever.",
      aliGhodsi: "Ali Ghodsi",
      cEO: "CEO",
      databricks: "Databricks",
      divuseViewModuleVOhHaView: "/div-useView-module-vOh-Ha-view2@2x.png",
    },
    {
      byIntegratingWithLakebaseAnd:
        "Agent 4 unlocks true collaboration and real-\ntime learning — now our teams can design and\nbuild with our closest partners live, turn instant\nfeedback into measurable wins, and deliver\noutcomes that delight customers and partners.",
      aliGhodsi: "Doug Rodermund",
      cEO: "Principal Product Manager",
      databricks: "Zillow",
      divuseViewModuleVOhHaView: "/div-useView-module-vOh-Ha-view@2x.png",
    },
    {
      byIntegratingWithLakebaseAnd:
        "Replit Agent 4 is incredible. Its ability to take a\none-shot prompt and flesh out the\nrequirements before a full build is unmatched.\nIt requires very little guidance to take a rough\nconcept to a functional prototype.",
      aliGhodsi: "Alex Meyers",
      cEO: "Principal Product Manager",
      databricks: "Gusto",
      divuseViewModuleVOhHaView: "/div-useView-module-vOh-Ha-view5@2x.png",
    },
    {
      byIntegratingWithLakebaseAnd:
        "The parallel task execution is a game-changer\nfor us. We have multiple builders working on\nthe same codebase every day, and the ability to\nsubmit tasks simultaneously with full visibility.",
      aliGhodsi: "Barak Hirchson",
      cEO: "Co-Founder & Chief AI Officer",
      databricks: "Payouts.com",
      divuseViewModuleVOhHaView: "/div-useView-module-vOh-Ha-view4@2x.png",
    },
    {
      byIntegratingWithLakebaseAnd:
        "To deliver the world's best customer\nexperience, our internal teams need to work\nwithout limits. Replit gives our teams the\n'superpowers' to prototype and scale internal\nsolutions in hours rather than weeks.",
      aliGhodsi: "Shauna Geraghty",
      cEO: "SVP, Global People and Talent",
      databricks: "Talkdesk",
      divuseViewModuleVOhHaView: "/div-useView-module-vOh-Ha-view3@2x.png",
    },
    {
      byIntegratingWithLakebaseAnd:
        "Agent 4 is a game-changer. Multi-user vibe\ncoding via the kanban is a significant milestone\nfor enterprises. It's great for turning individual\nconcepts into team realities.",
      aliGhodsi: "Takeshi Fujiwara",
      cEO: "Director",
      databricks: "SMFL Digital Lab",
      divuseViewModuleVOhHaView: "/div-useView-module-vOh-Ha-view1@2x.png",
    },
  ];

  // Array with clones for infinite loop: [Last, ...Original, First]
  const testimonials = [
    baseTestimonials[baseTestimonials.length - 1],
    ...baseTestimonials,
    baseTestimonials[0],
  ];

  const totalOriginal = baseTestimonials.length;

  // Start at index 1 (First real card)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isAnimating = useRef(false);

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    isAnimating.current = false;

    // Last Card Clone par jaate hi silently Real 1st Card par snap
    if (currentIndex === totalOriginal + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
    // First Card Clone par jaate hi silently Real Last Card par snap
    else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalOriginal);
    }
  };

  // Transition reset ke baad animation re-enable karein
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <section
      className={`w-full bg-[#fbf8f5] flex flex-col items-center py-[84px] px-8 z-[4] font-[Inter] overflow-hidden ${className}`}
    >
      {/* Container width aligned (max-w-[1080px]) to remove right side dead space */}
      <div className="w-full max-w-[1080px] flex items-end gap-6 relative justify-center">
        
        {/* Left Control Panel */}
        <div className="w-[253px] flex flex-col gap-3 shrink-0 z-30 bg-[#fbf8f5]">
          <div className="w-[253px] h-[253px] rounded-[40px] bg-[#f7efe6] border border-[#e8e2d9] p-6 flex flex-col justify-between box-border">
            <div className="text-[28px] tracking-[-1.27px] leading-[31.8px] text-[#2b2b2b]">
              Trusted by<br />builders
            </div>
            <div className="text-[12.9px] text-[#808080]">
              Endorsed by innovators
            </div>
          </div>

          <div className="w-[253px] h-[253px] rounded-[40px] bg-[#ff9a7b] p-6 flex flex-col justify-between text-white font-medium text-[16px] box-border shrink-0 select-none">
            <button
              onClick={handleNext}
              className="flex items-center justify-between w-full bg-transparent border-none text-white cursor-pointer p-0 text-left hover:opacity-85"
            >
              <span>Next<br />Testimonial</span>
              <span className="text-xl">→</span>
            </button>
            <button
              onClick={handlePrev}
              className="flex items-center justify-between w-full bg-transparent border-none text-white cursor-pointer p-0 text-left hover:opacity-85"
            >
              <span className="text-xl">←</span>
              <span className="text-right">Previous<br />Testimonial</span>
            </button>
          </div>
        </div>

        {/* Viewport for exactly 1 item (Image + Review Card = 795px) */}
        <div className="w-[795px] overflow-hidden shrink-0 relative">
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex items-end"
            style={{
              transition: isTransitioning
                ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((item, index) => (
              <div key={index} className="w-full shrink-0 flex items-end">
                <DivTestimonialsSectionModule
                  byIntegratingWithLakebaseAnd={item.byIntegratingWithLakebaseAnd}
                  aliGhodsi={item.aliGhodsi}
                  cEO={item.cEO}
                  databricks={item.databricks}
                  divuseViewModuleVOhHaView={item.divuseViewModuleVOhHaView}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DivuseViewModuleVOhHaVi;