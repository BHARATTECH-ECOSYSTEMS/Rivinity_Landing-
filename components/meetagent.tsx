import type { NextPage } from "next";
import { useCallback } from "react";
import Image from "next/image";

export type DivuseViewModuleVOhHaVi5Type = {
  className?: string;
};

const DivuseViewModuleVOhHaVi5: NextPage<DivuseViewModuleVOhHaVi5Type> = ({
  className = "",
}) => {
  const onAHeroBentoGridModuleWCfISGContainerClick = useCallback(() => {
    window.open("https://replit.com/agent4");
  }, []);

  return (
    <main
      className={`w-full flex flex-col items-center py-8 px-4 gap-6 font-[Inter] text-replitcom-mine-shaft1 ${className}`}
    >
      {/* Title Header */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="!m-0 text-[44px] tracking-[-2.8px] leading-[48px] font-normal">
          <span>{`Meet `}</span>
          <span className="text-replitcom-vermilion">
            Agent 4
          </span>
        </h1>
        <div className="text-[19px] tracking-[-0.6px] text-replitcom-dusty-gray">
          Creativity runs on Replit
        </div>
      </div>

      {/* Bento Grid Container (Max Width 1040px) */}
      <div className="w-full max-w-[1040px] flex flex-col gap-4">
        
        {/* Row 1: Design Freely & Move Faster */}
        <div className="w-full h-[320px] grid grid-cols-[1.38fr_1fr] gap-4">
          
          {/* Top Left - Design Freely */}
          <section className="h-[320px] rounded-[160px] bg-replitcom-mona-lisa overflow-hidden relative flex items-center p-8 box-border text-left text-replitcom-mine-shaft">
            <div className="w-[260px] flex flex-col gap-1 z-10 shrink-0">
              <span className="opacity-70 text-[12px] tracking-[-0.3px]">
                Infinite Canvas
              </span>
              <h2 className="!m-0 text-[40px] font-normal tracking-[-2px] leading-[40px]">
                Design<br />Freely
              </h2>
              <p className="!m-0 opacity-70 text-[12.5px] tracking-[-0.3px] leading-[17px] mt-1">
                Introducing a new space that allows you to explore and tweak designs visually, and then apply them directly to your app.
              </p>
            </div>

            {/* Graphic Illustration (Scale & Y-Offset Adjusted to show Product Cards) */}
            <div className="absolute right-[0px] top-1/2 -translate-y-1/2 w-[340px] h-[320px] pointer-events-none flex items-center justify-center overflow-hidden">
              <div className="w-[482px] h-[686px] relative scale-[0.52] origin-center translate-y-[25px]">
                <div className="absolute h-[46.72%] w-[46.54%] top-[26.31%] right-[26.89%] left-[26.58%]">
                  <Image
                    className="absolute h-[11.17%] w-full top-0 left-0 max-w-full overflow-hidden"
                    width={224.3}
                    height={35.8}
                    alt=""
                    src="/Graphic-Component-A.svg"
                  />
                  <div className="absolute top-[3.84%] left-[16.18%] text-[8.5px]">Menu</div>
                  <Image
                    className="absolute h-[11.17%] w-[48.82%] top-[16.82%] left-[0.04%] max-w-full overflow-hidden"
                    width={109.5}
                    height={35.8}
                    alt=""
                    src="/Graphic-Component-F.svg"
                  />
                  <div className="absolute h-[4.46%] w-[34.51%] top-[20.19%] left-[9.76%] text-[10px]">
                    <div className="absolute top-[0%] left-[27.52%]">Store finder</div>
                  </div>
                  <Image
                    className="absolute h-[66.37%] w-[99.91%] top-[33.63%] left-[0.04%] max-w-full overflow-hidden"
                    width={224.1}
                    height={212.7}
                    alt=""
                    src="/Item-Divider-One.svg"
                  />
                  {/* Eau de parfum card */}
                  <div className="absolute h-[18.5%] w-[calc(100%_-_21.9px)] top-[37.19%] left-[11px] text-[8px]">
                    <div className="absolute top-[8%] left-[30%]">Eau de parfum</div>
                    <b className="absolute top-[26%] left-[30%]">$165.00</b>
                  </div>
                  {/* La nuit de l'homme card */}
                  <div className="absolute h-[18.5%] w-[calc(100%_-_21.9px)] top-[59.44%] left-[11px] text-[8px]">
                    <div className="absolute top-[8%] left-[30%]">La nuit de l'homme</div>
                    <b className="absolute top-[26%] left-[30%]">$145.00</b>
                  </div>
                </div>
                {/* Add to Cart Button */}
                <div className="absolute h-[5.38%] w-[22.95%] top-[34.08%] left-[50.31%] text-[10px] text-replitcom-white">
                  <Image
                    className="absolute h-full w-full top-0 left-0 max-w-full overflow-hidden"
                    width={110.6}
                    height={36.9}
                    alt=""
                    src="/Vector49.svg"
                  />
                  <div className="absolute top-[30.62%] left-[40.14%]">Add to cart</div>
                </div>
              </div>
            </div>
          </section>

          {/* Top Right - Move Faster */}
          <section className="h-[320px] rounded-[30px] bg-replitcom-westar overflow-hidden relative flex flex-col justify-between p-7 box-border text-left text-replitcom-mine-shaft">
            
            {/* Flowchart Graphic (Full Diagram: Main Task -> Subtasks -> Agents -> Merged result) */}
            <div className="w-full h-[160px] relative pointer-events-none overflow-hidden">
              <div className="w-[225.3px] h-[210px] absolute top-[5px] right-[5px] scale-[0.72] origin-top-right">
                {/* Main Task */}
                <div className="absolute h-[12.62%] w-[48.2%] top-[0.14%] left-[26.41%] text-[9.4px]">
                  <Image
                    className="absolute h-full w-full top-0 left-0 max-w-full overflow-hidden"
                    width={108.6}
                    height={26.5}
                    alt=""
                    src="/Support-For-Teams.svg"
                  />
                  <b className="absolute top-[27.92%] left-[29.28%]">Main task</b>
                </div>
                <Image
                  className="absolute h-[12.33%] w-[72.3%] top-[14.76%] left-[13.89%] max-w-full overflow-hidden"
                  width={162.9}
                  height={25.9}
                  alt=""
                  src="/Group3.svg"
                />
                {/* Subtasks */}
                <div className="absolute h-[10.95%] w-full top-[29.14%] left-[0.31%] text-[8px]">
                  <div className="absolute h-full w-[30.39%] left-0">
                    <Image className="absolute h-full w-full" width={68.1} height={23} alt="" src="/Subtask-Icon.svg" />
                    <div className="absolute top-[24%] left-[25%]">Subtask</div>
                  </div>
                  <div className="absolute h-full w-[30.39%] left-[34.8%]">
                    <Image className="absolute h-full w-full" width={68.1} height={23} alt="" src="/Subtask-Icon.svg" />
                    <div className="absolute top-[24%] left-[25%]">Subtask</div>
                  </div>
                  <div className="absolute h-full w-[30.39%] left-[69.6%]">
                    <Image className="absolute h-full w-full" width={68.1} height={23} alt="" src="/Subtask-Icon.svg" />
                    <div className="absolute top-[24%] left-[25%]">Subtask</div>
                  </div>
                </div>
                <Image
                  className="absolute h-[10.52%] w-[72.3%] top-[42.1%] left-[13.89%] max-w-full overflow-hidden"
                  width={162.9}
                  height={22.1}
                  alt=""
                  src="/Group4.svg"
                />
                {/* Agents */}
                <div className="absolute h-[11.33%] w-full top-[54.62%] left-[0.31%] text-[8px]">
                  <div className="absolute h-full w-[30.39%] left-0">
                    <Image className="absolute h-full w-full" width={68.1} height={23.8} alt="" src="/Agent-Icon.svg" />
                    <div className="absolute top-[25%] left-[31%]">Agent</div>
                  </div>
                  <div className="absolute h-full w-[30.39%] left-[34.8%]">
                    <Image className="absolute h-full w-full" width={68.1} height={23.8} alt="" src="/Agent-Icon.svg" />
                    <div className="absolute top-[25%] left-[31%]">Agent</div>
                  </div>
                  <div className="absolute h-full w-[30.39%] left-[69.6%]">
                    <Image className="absolute h-full w-full" width={68.1} height={23.8} alt="" src="/Agent-Icon.svg" />
                    <div className="absolute top-[25%] left-[31%]">Agent</div>
                  </div>
                </div>
                <Image
                  className="absolute h-[11.95%] w-[69.29%] top-[68%] left-[15.4%] max-w-full overflow-hidden"
                  width={156.1}
                  height={25.1}
                  alt=""
                  src="/Group.svg"
                />
                {/* Merged Result */}
                <div className="absolute h-[12.95%] w-full top-[81.95%] left-0 text-[10.2px] text-replitcom-white">
                  <Image
                    className="absolute h-full w-full top-0 left-0 max-w-full overflow-hidden"
                    width={225.3}
                    height={27.2}
                    alt=""
                    src="/Merge-Icon.svg"
                  />
                  <b className="absolute top-[26.84%] left-[34.13%]">Merged result</b>
                </div>
              </div>
            </div>

            {/* Text Overlay */}
            <div className="flex flex-col gap-0.5 z-10">
              <span className="opacity-70 text-[12px] tracking-[-0.3px]">
                Parallel Agents
              </span>
              <h2 className="!m-0 text-[40px] font-normal tracking-[-2px] leading-[40px]">
                Move faster
              </h2>
              <p className="!m-0 opacity-70 text-[12.5px] tracking-[-0.3px] leading-[17px] mt-0.5">
                Parallel Agents run tasks together, keeping progress visible. Handle auth, database, and design seamlessly.
              </p>
            </div>
          </section>

        </div>

        {/* Row 2: Ship Anything & Build Together */}
        <div className="w-full h-[320px] grid grid-cols-[1fr_1.38fr] gap-4">
          
          {/* Bottom Left - Ship Anything */}
          <section className="h-[320px] rounded-[30px] bg-replitcom-mine-shaft overflow-hidden relative flex flex-col justify-between p-7 box-border text-left text-white">
            
            {/* Device Frames (Phone, Laptop Screen, Browser Window) */}
            <div className="w-full h-[150px] relative pointer-events-none overflow-hidden">
              <div className="w-[1085px] h-[149px] absolute top-[5px] left-[5px] scale-[0.68] origin-top-left">
                <Image
                  className="absolute h-full w-[6.98%] top-0 left-[0.06%]"
                  width={75.7}
                  height={147.5}
                  alt=""
                  src="/Illustration-Element-A.svg"
                />
                <Image
                  className="absolute h-full w-[20.69%] top-0 left-[8.43%]"
                  width={224.5}
                  height={147.5}
                  alt=""
                  src="/Illustration-Element-D.svg"
                />
                <Image
                  className="absolute h-full w-[6.98%] top-0 left-[50.66%]"
                  width={75.7}
                  height={147.5}
                  alt=""
                  src="/Illustration-Element-A.svg"
                />
                <Image
                  className="absolute h-full w-[20.69%] top-0 left-[59.04%]"
                  width={224.5}
                  height={147.5}
                  alt=""
                  src="/Illustration-Element-D.svg"
                />
              </div>
            </div>

            {/* Text Overlay */}
            <div className="flex flex-col gap-0.5 z-10">
              <span className="opacity-70 text-[12px] tracking-[-0.3px]">
                Multiple Artifacts
              </span>
              <h2 className="!m-0 text-[40px] font-normal tracking-[-2px] leading-[40px]">
                Ship Anything
              </h2>
              <p className="!m-0 opacity-70 text-[12.5px] tracking-[-0.3px] leading-[17px] mt-0.5">
                Create mobile and web apps, landing pages, and videos in one project with shared design. Build everything as your project scales without context switching.
              </p>
            </div>
          </section>

          {/* Bottom Right - Build Together */}
          <section className="h-[320px] rounded-[160px] bg-replitcom-coral overflow-hidden relative flex items-center p-8 box-border text-left text-replitcom-mine-shaft">
            <div className="w-[270px] flex flex-col gap-1 z-10 shrink-0">
              <span className="opacity-70 text-[12px] tracking-[-0.3px]">
                Support for Teams
              </span>
              <h2 className="!m-0 text-[40px] font-normal tracking-[-2px] leading-[40px]">
                Build together
              </h2>
              <p className="!m-0 opacity-80 text-[12.5px] tracking-[-0.3px] leading-[17px] mt-1">
                Your team can focus on planning your app while the Agent handles coordination and execution. Submit requests in any order, and Agent 4 sequences them efficiently.
              </p>
            </div>

            {/* Personas & Agent 4 Badge Graphic (Raina, Jacob, Matt Tags restored) */}
            <div className="absolute right-[0px] top-1/2 -translate-y-1/2 w-[330px] h-[320px] pointer-events-none flex items-center justify-center overflow-hidden">
              <div className="w-[508px] h-[375px] relative scale-[0.62] origin-center">
                <Image
                  className="absolute h-[calc(100%_-_1.8px)] w-[73.46%] top-[0.5px] left-[26.44%]"
                  width={373.2}
                  height={373.2}
                  alt=""
                  src="/Mask-group.svg"
                />
                {/* Agent 4 Badge */}
                <div className="absolute h-[13.97%] w-[32.22%] top-[42.8%] left-[13.17%] text-[19.8px] text-replitcom-merino">
                  <Image
                    className="absolute h-full w-full top-0 left-0"
                    width={163.7}
                    height={52.4}
                    alt=""
                    src="/Vector50.svg"
                  />
                  <div className="absolute top-[23.28%] left-[14.48%]">Agent</div>
                  <div className="absolute top-[23.28%] left-[80.57%]">4</div>
                </div>
                {/* Raina Tag */}
                <div className="absolute h-[11.76%] w-[26.22%] top-[5.63%] left-[0%] text-[17px]">
                  <Image className="absolute h-full w-[64.86%] top-0 left-0" width={86.4} height={44.1} alt="" src="/Vector51.svg" />
                  <h3 className="!m-0 absolute top-[24.49%] left-[15.39%] font-normal">Raina</h3>
                  <Image className="absolute h-full w-[33.11%] top-0 left-[66.89%]" width={44.1} height={44.1} alt="" src="/Persona-Icon.svg" />
                </div>
                {/* Jacob Tag */}
                <div className="absolute h-[11.76%] w-[26.77%] top-[24.93%] left-[26.36%] text-[17px]">
                  <Image className="absolute h-full w-[32.43%] top-0 left-0" width={44.1} height={44.1} alt="" src="/Data-Icon-One.svg" />
                  <Image className="absolute h-full w-[65.59%] top-0 left-[34.41%]" width={89.2} height={44.1} alt="" src="/Data-Icon-Three.svg" />
                  <h3 className="!m-0 absolute top-[24.26%] left-[48.97%] font-normal">Jacob</h3>
                </div>
                {/* Matt Tag */}
                <div className="absolute h-[11.76%] w-[27.62%] top-[76.53%] left-[13.17%] text-[17px]">
                  <h3 className="!m-0 absolute top-[24.26%] left-[19.67%] font-normal">Matt</h3>
                  <Image className="absolute h-full w-[31.43%] top-0 left-[68.57%]" width={44.1} height={44.1} alt="" src="/Persona-Icon.svg" />
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>

      {/* Action Footer Buttons */}
      <div className="flex items-center gap-6 text-left text-[12.5px] text-replitcom-vermilion mt-1">
        <div
          className="rounded-[100px] border-replitcom-vermilion border-solid border-[1px] flex items-center py-2.5 px-5 gap-2 cursor-pointer hover:bg-[#fff5f2] transition-colors"
          onClick={onAHeroBentoGridModuleWCfISGContainerClick}
        >
          <a
            className="tracking-[-0.2px] text-[inherit] [text-decoration:none]"
            href="https://replit.com/agent4"
            target="_blank"
            rel="noreferrer"
          >
            Deep dive into Agent 4
          </a>
          <div className="h-3.5 w-3.5 relative overflow-hidden shrink-0">
            <Image
              className="absolute h-[64.38%] w-full top-[17.5%] left-[17.5%] max-w-full overflow-hidden"
              width={10.3}
              height={10.3}
              alt=""
              src="/Vector16.svg"
            />
          </div>
        </div>
        <div className="flex items-center text-[12.5px] text-replitcom-mine-shaft1">
          <a
            className="[text-decoration:underline] tracking-[-0.2px] text-[inherit]"
            href="https://docs.replit.com/"
            target="_blank"
            rel="noreferrer"
          >
            Read the documentation
          </a>
        </div>
      </div>
    </main>
  );
};

export default DivuseViewModuleVOhHaVi5;