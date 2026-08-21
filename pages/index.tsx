import type { NextPage } from "next";
import HeaderuseViewModuleVOhHa from "../components/header";
import FooterBigFooterModuleJuPJh from "../components/footer";
import HomePage from "./homepage";

const WLight: NextPage = () => {
  return (
    <div className="w-full relative overflow-y-auto flex flex-col items-start gap-[0.3px] leading-normal tracking-normal">
      <HeaderuseViewModuleVOhHa />
      <div className="container">
        <HomePage/>
      </div>
      <FooterBigFooterModuleJuPJh />
    </div>
  );
};

export default WLight;