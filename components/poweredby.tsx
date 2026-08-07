import type { NextPage } from "next";
import Image from "next/image";

export type DivuseViewModuleVOhHaVi3Type = {
  className?: string;
};

const DivuseViewModuleVOhHaVi3: NextPage<DivuseViewModuleVOhHaVi3Type> = ({
  className = "",
}) => {
  return (
    <section
      className={`self-stretch flex flex-col items-start !pt-0 !pb-0 px-6 md:px-[135px] lg:px-[270px] z-[3] text-center text-[45px] text-replitcom-mine-shaft1 font-[Inter] ${className}`}
    >
      <div className="w-full overflow-y-auto flex flex-col items-start p-4 md:p-8 box-border max-w-[1380px] mx-auto">
        <div className="self-stretch flex flex-col items-center pt-[51px] md:pt-[78px] lg:pt-[120px] pb-0 px-0 gap-12">
          
          {/* Section Heading */}
          <h2 className="relative tracking-[-2.88px] text-[27px] leading-[29px] md:text-4xl md:leading-[38px] lg:text-[45px] lg:leading-[48px] font-semibold">
            Powered by the Replit platform
          </h2>
          
          {/* 4-Column Grid layout matching the exact design image */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Agent Chat */}
            <article className="h-auto lg:h-[604px] rounded-[24px] bg-replitcom-white overflow-hidden flex flex-col items-center justify-between p-6 box-border text-left text-[17.4px] text-replitcom-mine-shaft1 font-[Inter] shadow-sm">
              <div className="self-stretch flex flex-col items-start">
                <div className="flex flex-col items-start gap-4">
                  <span className="text-sm font-medium tracking-[-0.72px] leading-[18px] text-gray-500 uppercase">
                    Agent Chat
                  </span>
                  <h3 className="self-stretch flex flex-col items-start text-[25px] lg:text-[30.8px] font-bold">
                    <span className="relative tracking-[-1.28px] leading-[26px] lg:leading-8 capitalize">
                      Describe It.<br />
                      Publish It.
                    </span>
                  </h3>
                </div>
              </div>

              <div className="self-stretch flex-1 flex items-center justify-center py-4 text-[9.8px] text-replitcom-cod-gray">
                <div className="h-[243.9px] flex-1 flex flex-col items-start relative isolate gap-[31px] lg:gap-[62px] max-w-[290px]">
                  <div className="w-[250px] h-[250px] absolute top-[3px] left-[20px] rounded-[125px] border-replitcom-vermilion border-dashed border-[1px] box-border shrink-0 opacity-60" />
                  <div className="flex items-start px-5 lg:px-[45px] shrink-0 box-border">
                    <div className="h-[50px] w-[162px] backdrop-blur-[17px] rounded-[10px] bg-white/90 border-replitcom-cod-gray/20 border-solid border-[1px] box-border flex items-center p-2.5 gap-1 shadow-sm">
                      <div className="relative tracking-[-0.31px] font-medium text-xs">
                        Make my idea come true |
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-[26px] lg:gap-[52.9px] shrink-0 text-center text-[10.2px] text-replitcom-white">
                    <div className="w-[272px] flex items-start justify-end">
                      <div className="h-[38px] w-[89px] backdrop-blur-[17px] rounded-[8px] bg-replitcom-vermilion flex items-center justify-center px-3 box-border gap-1 shadow-md">
                        <div className="h-4 w-4 relative overflow-hidden shrink-0">
                          <Image
                            className="absolute inset-[6.25%] max-w-full overflow-hidden max-h-full"
                            width={14}
                            height={14}
                            alt="Publish icon"
                            src="/Publish-Icon-Part-One.svg"
                          />
                        </div>
                        <div className="relative tracking-[-0.31px] font-medium">
                          Publish
                        </div>
                      </div>
                    </div>
                    <div className="w-[88px] h-[41px] backdrop-blur-[7px] rounded-lg bg-white border-replitcom-cod-gray/20 border-solid border-[1px] box-border flex items-center justify-center px-2 gap-1 text-replitcom-cod-gray shadow-sm">
                      <div className="relative tracking-[-0.31px] font-medium">Agent</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="self-stretch text-[14.8px] text-gray-600 tracking-[-0.32px] leading-[17.6px]">
                Describe and publish your project. The Agent writes production-ready code, evolves it, and stays out of your way.
              </p>
            </article>

            {/* Card 2: Full Stack Infrastructure */}
            <article className="h-auto lg:h-[604px] rounded-[24px] bg-replitcom-westar1 overflow-hidden flex flex-col items-center justify-between p-6 box-border text-left text-[17.4px] text-replitcom-mine-shaft1 font-[Inter] shadow-sm">
              <div className="self-stretch flex flex-col items-start">
                <div className="flex flex-col items-start gap-4">
                  <span className="text-sm font-medium tracking-[-0.72px] leading-[18px] text-gray-600 uppercase">
                    Full Stack Infrastructure
                  </span>
                  <h3 className="self-stretch flex flex-col items-start text-2xl lg:text-[29.9px] font-bold">
                    <span className="relative tracking-[-1.28px] leading-[26px] lg:leading-8 capitalize">
                      Build & Scale Your Apps Easily.
                    </span>
                  </h3>
                </div>
              </div>

              <div className="self-stretch flex-1 flex items-center justify-center py-4 text-center text-[11.7px] text-replitcom-cod-gray">
                <div className="h-[213px] w-[150px] overflow-hidden shrink-0 flex flex-col items-center justify-center p-4 box-border relative isolate bg-white/60 rounded-2xl backdrop-blur-sm border border-black/5 shadow-inner">
                  <div className="w-full flex flex-col items-center gap-3 z-[3] font-medium text-xs">
                    <div className="w-full py-2.5 bg-white rounded-lg shadow-sm border border-black/5">Authentication</div>
                    <div className="w-full py-2.5 bg-white rounded-lg shadow-sm border border-black/5">Database</div>
                    <div className="w-full py-2.5 bg-white rounded-lg shadow-sm border border-black/5">Hosting</div>
                    <div className="w-full py-2.5 bg-white rounded-lg shadow-sm border border-black/5">Monitoring</div>
                  </div>
                </div>
              </div>

              <p className="self-stretch text-[14.8px] text-gray-700 tracking-[-0.32px] leading-[17.6px]">
                Built-in services with zero setup-Authentication, Database, Hosting, and Monitoring, enabling you to build fully scalable apps easily and securely from day one.
              </p>
            </article>

            {/* Card 3: Integrations */}
            <article className="h-auto lg:h-[604px] rounded-[24px] bg-replitcom-mona-lisa overflow-hidden flex flex-col items-center justify-between p-6 box-border text-left text-[17.6px] text-replitcom-mine-shaft1 font-[Inter] shadow-sm">
              <div className="self-stretch flex flex-col items-start">
                <div className="flex flex-col items-start gap-4">
                  <span className="text-sm font-medium tracking-[-0.72px] leading-[18px] text-gray-700 uppercase">
                    Integrations
                  </span>
                  <h3 className="self-stretch flex flex-col items-start text-lg lg:text-3xl font-bold">
                    <span className="relative tracking-[-1.28px] leading-[19px] lg:leading-8 capitalize">
                      Connect To AI & Services.
                    </span>
                  </h3>
                </div>
              </div>

              <div className="self-stretch flex-1 flex items-center justify-center py-4">
                <div className="h-[210px] w-full flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-replitcom-vermilion rounded-xl flex items-center justify-center shadow-md z-10 text-white font-bold">⚡</div>
                  </div>
                  {/* Floating integration nodes mimicking the visual */}
                  <div className="absolute top-4 left-6 w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-xs font-bold border border-black/5">S</div>
                  <div className="absolute top-4 right-6 w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-xs font-bold border border-black/5">🤖</div>
                  <div className="absolute bottom-4 right-8 w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-xs font-bold border border-black/5">N</div>
                </div>
              </div>

              <p className="self-stretch text-[14.9px] text-gray-700 tracking-[-0.32px] leading-[17.6px]">
                Enhance your apps with AI and 100+ integrations. Connect to OpenAI, Stripe, Google Workspace, and more in minutes.
              </p>
            </article>

            {/* Card 4: Enterprise Control */}
            <article className="h-auto lg:h-[604px] rounded-[24px] bg-replitcom-coral1 overflow-hidden flex flex-col items-center justify-between p-6 box-border text-left text-[17.6px] text-replitcom-mine-shaft1 font-[Inter] shadow-sm">
              <div className="self-stretch flex flex-col items-start">
                <div className="flex flex-col items-start gap-4">
                  <span className="text-sm font-medium tracking-[-0.72px] leading-[18px] text-gray-700 uppercase">
                    Enterprise Control
                  </span>
                  <h3 className="self-stretch flex flex-col items-start text-2xl lg:text-[29.9px] font-bold">
                    <span className="relative tracking-[-1.28px] leading-[26px] lg:leading-8 capitalize">
                      Secure Your Apps As They Scale.
                    </span>
                  </h3>
                </div>
              </div>

              <div className="self-stretch flex-1 flex items-center justify-center py-4">
                <div className="h-[188px] w-full flex items-center justify-center">
                  <div className="w-24 h-28 border-2 border-white/80 rounded-b-full flex items-center justify-center relative shadow-sm bg-white/10 backdrop-blur-xs">
                    <div className="text-white text-2xl font-bold">✓</div>
                  </div>
                </div>
              </div>

              <p className="self-stretch text-[15.3px] text-gray-700 tracking-[-0.32px] leading-[17.6px]">
                Security controls: SSO/SAML, SOC 2, and admin controls. Screening and secure services keep apps safe.
              </p>
            </article>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DivuseViewModuleVOhHaVi3;