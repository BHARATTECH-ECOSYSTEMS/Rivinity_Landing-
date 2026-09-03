import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/logoslide";
import { ProblemStatement } from "@/components/sections/problem-statement";
import { BentoFeatures } from "@/components/sections/bentofeatures";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PoweredByRivinity } from "@/components/sections/powered-by-rivinity";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <div className="w-full relative overflow-x-clip flex flex-col items-start gap-[0.3px] leading-normal tracking-normal">
      <Header />
      <main className="w-full">
        <Hero />
        {/* <LogoMarquee /> */}
        {/* <ProblemStatement /> */}
        <BentoFeatures />
        <HowItWorks />
        <PoweredByRivinity />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection variant="landing" />
      </main>
      <Footer />
    </div>
  );
}
