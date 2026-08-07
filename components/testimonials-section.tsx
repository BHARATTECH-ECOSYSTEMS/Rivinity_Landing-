
import type { NextPage } from "next";
import Image from "next/image";
export type DivTestimonialsSectionModuleType = {
  className?: string;
  byIntegratingWithLakebaseAnd?: string;
  aliGhodsi?: string;
  cEO?: string;
  databricks?: string;
  divuseViewModuleVOhHaView: string;
};
const DivTestimonialsSectionModule: NextPage<
  DivTestimonialsSectionModuleType
> = ({
  className = "",
  byIntegratingWithLakebaseAnd,
  aliGhodsi,
  cEO,
  databricks,
  divuseViewModuleVOhHaView,
}) => {
  return (
    <div className={`flex items-end gap-3 shrink-0 select-none ${className}`}>
      {/* Profile Image Card */}
      <div className="w-[253px] h-[253px] rounded-[52px] overflow-hidden shrink-0 relative bg-white border border-[#e8e2d9] shadow-sm">
        <Image
          className="w-full h-full object-cover"
          loading="lazy"
          width={253}
          height={253}
          alt={aliGhodsi || "Testimonial"}
          src={divuseViewModuleVOhHaView || "/placeholder.png"}
        />
      </div>
      {/* Quote Card */}
      <section className="w-[518px] h-[518px] rounded-[60px] bg-white p-[52px] flex flex-col justify-between items-start text-left box-border border border-[#eee8df] shadow-sm">
        <div className="flex flex-col items-start gap-2 w-full">
          <span className="text-[#ff7a59] text-[52px] font-serif leading-none select-none">“</span>
          <p className="text-[#333333] text-[23.5px] leading-[33.5px] tracking-[-0.75px] font-normal m-0 whitespace-pre-line antialiased">
            {byIntegratingWithLakebaseAnd}
          </p>
        </div>
        <div className="flex flex-col items-start gap-0.5 w-full pt-2">
          <div className="text-[#2b2b2b] text-[19px] font-medium leading-snug">
            {aliGhodsi}
          </div>
          <div className="text-[#808080] text-[13.8px] leading-tight">
            {cEO}
          </div>
          <div className="text-[#a0a0a0] text-[13px] leading-tight">
            {databricks}
          </div>
        </div>
      </section>
    </div>
  );
};
export default DivTestimonialsSectionModule;