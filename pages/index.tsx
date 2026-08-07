import type { NextPage } from "next";
import HeaderuseViewModuleVOhHa from "../components/header";
import DivuseViewModuleVOhHaVi2 from "../components/herosection";
import DivuseViewModuleVOhHaVi4 from "../components/logoslide";
import DivuseViewModuleVOhHaVi5 from "../components/meetagent";
import DivuseViewModuleVOhHaVi3 from "../components/poweredby";
import DivuseViewModuleVOhHaVi from "../components/testimonials-component";
import DivuseViewModuleVOhHaVi6 from "../components/pricing";
import FooterBigFooterModuleJuPJh from "../components/footer";

const WLight: NextPage = () => {
  return (
    <div className="w-full relative bg-[#faf6f1] overflow-y-auto flex flex-col items-start gap-[0.3px] leading-normal tracking-normal">
      <HeaderuseViewModuleVOhHa />
      
      <section className="self-stretch flex flex-col items-start box-border max-w-full z-[1] bg-[#f6f3f1]">
        <DivuseViewModuleVOhHaVi2 />
        <DivuseViewModuleVOhHaVi4 />
      </section>

      <DivuseViewModuleVOhHaVi5 />
      <DivuseViewModuleVOhHaVi3 />
      <DivuseViewModuleVOhHaVi />
      <DivuseViewModuleVOhHaVi6 />

      <section className="self-stretch flex flex-col items-center pt-[120px] pb-[120px] pl-0 pr-0 z-[6] text-center text-[39px] text-replitcom-cod-gray font-inter mq450:pt-[78px] mq450:pb-[78px] mq450:box-border">
        <div className="flex flex-col items-center pt-0 pb-0 pl-3 pr-3 gap-10 mq450:gap-5">
          <div className="relative tracking-[-1.68px] leading-[42px] mq925:text-[31px] mq925:leading-[34px] mq450:text-[23px] mq450:leading-[25px]">
            What are you waiting for?
          </div>
          <div className="w-[306px] h-20 rounded-[90px] bg-replitcom-vermilion flex items-center justify-center pt-[29.4px] pb-[30.6px] pl-0 pr-0 box-border text-[22.1px] text-replitcom-white">
            <a
              className="relative tracking-[-0.72px] leading-[19.2px] text-inherit no-underline"
              href="https://replit.com/signup"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get started free
            </a>
          </div>
        </div>
      </section>

      <FooterBigFooterModuleJuPJh />
    </div>
  );
};

export default WLight;