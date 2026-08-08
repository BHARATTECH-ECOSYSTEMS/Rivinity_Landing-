import type { NextPage } from "next";
import HeaderuseViewModuleVOhHa from "../components/header";
import DivuseViewModuleVOhHaVi2 from "../components/herosection";
import DivuseViewModuleVOhHaVi4 from "../components/logoslide";
import DivuseViewModuleVOhHaVi5 from "../components/column4";
import DivuseViewModuleVOhHaVi3 from "../components/poweredby";
import DivuseViewModuleVOhHaVi6 from "../components/pricing";
import FooterBigFooterModuleJuPJh from "../components/footer";
import Benchmark from "../components/benchmark";
import ResearchSection from "../components/research-section";
import TestimonialsSection from "../components/testimonials-section";
import FaqSection from "../components/faq-section";
import CtaSection from "../components/cta-section";

const WLight: NextPage = () => {
  return (
    <div className="w-full relative bg-[#faf6f1] overflow-y-auto flex flex-col items-start gap-[0.3px] leading-normal tracking-normal">
      <HeaderuseViewModuleVOhHa />
      
      <section className="self-stretch flex flex-col items-start box-border max-w-full z-1">
        <DivuseViewModuleVOhHaVi2 />
        <DivuseViewModuleVOhHaVi4 />
      </section>

      <DivuseViewModuleVOhHaVi5 />
      <Benchmark/>
      <DivuseViewModuleVOhHaVi3 />
      <ResearchSection/>
      <TestimonialsSection />
      <DivuseViewModuleVOhHaVi6 />
      <FaqSection/>
      <CtaSection/>
      <FooterBigFooterModuleJuPJh />
    </div>
  );
};

export default WLight;