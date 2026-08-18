"use client";

import * as React from "react";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Bot,
  CloudCog,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import type {
  EmblaCarouselType,
  EmblaOptionsType,
} from "embla-carousel";

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* =========================================================
   TYPES
========================================================= */

type CarouselApi = EmblaCarouselType | undefined;

type CarouselProps = {
  opts?: EmblaOptionsType;
  plugins?: Parameters<typeof useEmblaCarousel>[1];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

/* =========================================================
   CAROUSEL CONTEXT
========================================================= */

const CarouselContext =
  React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error(
      "useCarousel must be used within a <Carousel />",
    );
  }

  return context;
}

/* =========================================================
   CAROUSEL
========================================================= */

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );

    const [canScrollPrev, setCanScrollPrev] =
      React.useState(false);

    const [canScrollNext, setCanScrollNext] =
      React.useState(false);

    const onSelect = React.useCallback(
      (api: CarouselApi) => {
        if (!api) return;

        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
      },
      [],
    );

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) return;

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;

      onSelect(api);

      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api.off("select", onSelect);
        api.off("reInit", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);

Carousel.displayName = "Carousel";

/* =========================================================
   CAROUSEL CONTENT
========================================================= */

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
    >
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "-ml-4"
            : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});

CarouselContent.displayName = "CarouselContent";

/* =========================================================
   CAROUSEL ITEM
========================================================= */

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal"
          ? "pl-4"
          : "pt-4",
        className,
      )}
      {...props}
    />
  );
});

CarouselItem.displayName = "CarouselItem";

/* =========================================================
   NEXT BUTTON
========================================================= */

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } =
    useCarousel();

  return (
    <button
      ref={ref}
      type="button"
      onClick={scrollNext}
      disabled={!canScrollNext}
      aria-label="Next research area"
      className={cn(
        "absolute right-3 top-1/2 z-20",
        "flex h-11 w-11 -translate-y-1/2",
        "items-center justify-center",
        "rounded-full",
        "border border-[#D5D0C8]",
        "bg-white/90",
        "text-[#1F2937]",
        "shadow-sm",
        "backdrop-blur-md",
        "transition-all duration-200",
        "hover:bg-[#F97316]",
        "hover:text-white",
        "disabled:pointer-events-none",
        "disabled:opacity-30",
        className,
      )}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
    </button>
  );
});

CarouselNext.displayName = "CarouselNext";

/* =========================================================
   SERVICE TYPE
========================================================= */

export interface Service {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

/* =========================================================
   SERVICE CARD
========================================================= */

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "group relative flex h-[400px]",
        "w-full flex-col justify-between",
        "overflow-hidden rounded-[28px]",
        "border border-white/10",
        "bg-gradient-to-br p-7",
        service.gradient,
      )}
    >
      {/* Soft overlay */}
      <div
        className="
          absolute inset-0
          bg-black/5
          transition-colors duration-300
          group-hover:bg-black/0
        "
      />

      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute -right-20 -top-20
          h-56 w-56
          rounded-full
          bg-white/10
          blur-3xl
          transition-transform duration-700
          group-hover:scale-150
        "
      />

      {/* Top */}
      <div className="relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest text-white/60">
            {service.number}
          </span>

          <div
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-full
              border border-white/20
              bg-white/10
              backdrop-blur-md
            "
          >
            <service.icon className="h-5 w-5 text-white" />
          </div>
        </div>

        <h3
          className="
            max-w-[280px]
            text-2xl
            font-semibold
            tracking-tight
            text-white
          "
        >
          {service.title}
        </h3>
      </div>

      {/* Bottom */}
      <div className="relative z-10">
        <div className="mb-5 h-px w-full bg-white/20" />

        <p
          className="
            max-w-[320px]
            text-sm
            leading-6
            text-white/80
          "
        >
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

/* =========================================================
   MAIN SERVICE CAROUSEL
========================================================= */

export const ServiceCarousel = ({
  services,
}: {
  services: Service[];
}) => {
  const ref = React.useRef<HTMLDivElement | null>(
    null,
  );

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <div
      ref={ref}
      className="w-full"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative"
      >
        <motion.div
          initial="hidden"
          animate={
            isInView
              ? "visible"
              : "hidden"
          }
        >
          <CarouselContent>
            {services.map(
              (service, index) => (
                <CarouselItem
                  key={service.number}
                  className="
                    md:basis-1/2
                    lg:basis-1/3
                  "
                >
                  <div className="h-full p-1">
                    <ServiceCard
                      service={service}
                      index={index}
                    />
                  </div>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
        </motion.div>

        <CarouselNext />
      </Carousel>
    </div>
  );
};

/* =========================================================
   DEFAULT RESEARCH DATA
========================================================= */

export const defaultResearchServices: Service[] = [
  {
    number: "01",
    title: "Autonomous Agents",
    description:
      "Multi-agent orchestration, reliable tool use, and long-horizon planning for production AI systems.",
    icon: Bot,
    gradient:
      "from-[#34398A] via-[#514FA4] to-[#7066C8]",
  },

  {
    number: "02",
    title: "AI Security",
    description:
      "Adversarial robustness, model provenance, and threat detection for AI systems in regulated environments.",
    icon: ShieldCheck,
    gradient:
      "from-[#71324C] via-[#97405A] to-[#C9666C]",
  },

  {
    number: "03",
    title: "Media Forensics",
    description:
      "Generative-artifact fingerprinting and deepfake detection designed for real-world compressed media.",
    icon: ScanSearch,
    gradient:
      "from-[#285555] via-[#347A72] to-[#58B59F]",
  },

  {
    number: "04",
    title: "Cloud Intelligence",
    description:
      "Compliance-aware inference scheduling and intelligent workload placement across distributed infrastructure.",
    icon: CloudCog,
    gradient:
      "from-[#453783] via-[#6252A5] to-[#8067C7]",
  },
];