import dynamic from "next/dynamic";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/Hero";
import { BentoFeatures } from "@/components/sections/bentofeatures";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

// Below the fold → split into separate chunks so they don't block first paint (FIX-07)
const FeatureShowcaseSlider = dynamic(
  () =>
    import("@/components/sections/feature-showcase-slider").then(
      (m) => m.FeatureShowcaseSlider
    ),
  { ssr: true }
);

const PoweredByRivinity = dynamic(
  () =>
    import("@/components/sections/powered-by-rivinity").then(
      (m) => m.PoweredByRivinity
    ),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      {/* Landing Page Content */}
      <div className="w-full relative overflow-x-clip flex flex-col items-start gap-[0.3px] leading-normal tracking-normal">
        <Header />
        <main className="w-full">
          <Hero />
          <FeatureShowcaseSlider />
          <BentoFeatures />
          <HowItWorks />
          <PoweredByRivinity />
          <TestimonialsSection />
          <FaqSection />
          <CtaSection variant="landing" />
        </main>
        <Footer />
      </div>
    </>
  );
}
