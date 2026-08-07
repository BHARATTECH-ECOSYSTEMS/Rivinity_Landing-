import type { NextPage } from "next";
import Component1 from "./component1";

export type FooterBigFooterModuleJuPJhType = {
  className?: string;
};

const FooterBigFooterModuleJuPJh: NextPage<FooterBigFooterModuleJuPJhType> = ({
  className = "",
}) => {
  return (
    <footer className={`w-full bg-[#fbf8f5] flex flex-col items-center z-[7] text-left text-[#4e4e4e] antialiased ${className}`}>
      {/* Divider */}
      <div className="w-full h-[1px] bg-[#e6e2dd]" />

      {/* Main Container */}
      <div className="w-full max-w-[1380px] px-10 py-16 flex flex-col items-start box-border">
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
          
          {/* Left Block: Logo & Globe Weather Widget */}
          <div className="flex flex-col items-start gap-12 min-w-[360px]">
            <Component1
              variant={44}
              component1Width="226px"
              component1Height="64px"
              component1Flex="unset"
              vector1="/Vector68.svg"
              vector2="/Vector69.svg"
              vector3="/Vector3.svg"
              vector4="/Vector70.svg"
              vector5="/Vector71.svg"
              vector6="/Vector72.svg"
            />

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                
                {/* Globe Icon Box */}
                <div className="w-16 h-16 min-w-[64px] min-h-[64px] border border-[#d6d2cb] rounded-[18px] flex items-center justify-center bg-[#fbf8f5] shrink-0 box-border">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4e4e4e"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>

                {/* CA Weather Widget */}
                <div className="w-16 h-16 min-w-[64px] min-h-[64px] rounded-[18px] border border-[#d6d2cb] flex flex-col items-center justify-center p-1 text-[9.5px] text-[#737373] leading-tight text-center bg-[#fbf8f5] shrink-0 box-border">
                  <span className="text-[9px] text-[#808080]">CA</span>
                  <span className="font-semibold text-[11px] my-0.5 text-[#2b2b2b]">5:01 AM</span>
                  <span className="text-[9px] text-[#808080]">73°F</span>
                </div>
              </div>

              {/* Subtitle Info */}
              <div className="flex flex-col text-[13px] text-[#737373] gap-2 leading-relaxed tracking-[-0.01em]">
                <div>Made in sunny California.</div>
                <div className="w-full h-px bg-[#e6e2dd]" />
                <div className="text-[12px]">
                  All rights reserved. Copyright © 2026 Replit, Inc.
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: 2x2 Columns */}
          <div className="flex-1 w-full grid grid-cols-2 gap-x-12 gap-y-12 max-w-[680px]">
            
            {/* Column 1 */}
            <div className="flex flex-col items-start gap-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8c8c8c]">
                HANDY LINKS
              </span>
              <div className="flex flex-col items-start gap-2 text-[22px] text-[#4e4e4e] font-normal leading-[1.28] tracking-[-0.03em]">
                <a href="https://replit.com/additional-resources" target="_blank" rel="noreferrer" className="hover:text-black">Resources</a>
                <a href="https://replit.com/help" target="_blank" rel="noreferrer" className="hover:text-black">Help</a>
                <a href="https://replit.com/build" target="_blank" rel="noreferrer" className="hover:text-black">How to guides</a>
                <a href="https://status.replit.com/" target="_blank" rel="noreferrer" className="hover:text-black">Status</a>
                <a href="https://replit.com/partners/certifications" target="_blank" rel="noreferrer" className="hover:text-black">Certifications</a>
                <a href="https://replit.com/partners" target="_blank" rel="noreferrer" className="hover:text-black">Partnerships</a>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-start gap-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8c8c8c]">
                LEGAL
              </span>
              <div className="flex flex-col items-start gap-2 text-[22px] text-[#4e4e4e] font-normal leading-[1.28] tracking-[-0.03em]">
                <a href="https://replit.com/terms-of-service" target="_blank" rel="noreferrer" className="hover:text-black">Terms of Service</a>
                <a href="https://replit.com/commercial-agreement" target="_blank" rel="noreferrer" className="hover:text-black">Commercial Agreement</a>
                <a href="https://replit.com/privacy-policy" target="_blank" rel="noreferrer" className="hover:text-black">Privacy</a>
                <a href="https://replit.com/subprocessors" target="_blank" rel="noreferrer" className="hover:text-black">Subprocessors</a>
                <a href="#" className="hover:text-black">DPA</a>
                <a href="https://docs.replit.com/legal-and-security-info/abuse-report" target="_blank" rel="noreferrer" className="hover:text-black">Report Abuse</a>
                <span className="cursor-pointer hover:text-black leading-tight">
                  Do Not Sell or Share My Personal<br />Information
                </span>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-start gap-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8c8c8c]">
                COMPANY
              </span>
              <div className="flex flex-col items-start gap-2 text-[22px] text-[#4e4e4e] font-normal leading-[1.28] tracking-[-0.03em]">
                <a href="https://replit.com/about" target="_blank" rel="noreferrer" className="hover:text-black">About Us</a>
                <a href="https://replit.com/news" target="_blank" rel="noreferrer" className="hover:text-black">News</a>
                <a href="https://replit.com/careers" target="_blank" rel="noreferrer" className="hover:text-black">Careers</a>
                <a href="https://replit.com/brand" target="_blank" rel="noreferrer" className="hover:text-black">Brand Center</a>
                <a href="https://replit.com/enterprise" target="_blank" rel="noreferrer" className="hover:text-black">Contact Us</a>
              </div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col items-start gap-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8c8c8c]">
                SOCIAL
              </span>
              <div className="flex flex-col items-start gap-2 text-[22px] text-[#4e4e4e] font-normal leading-[1.28] tracking-[-0.03em]">
                <a href="https://x.com/replit" target="_blank" rel="noreferrer" className="hover:text-black">Twitter/X</a>
                <a href="https://www.linkedin.com/company/repl-it/" target="_blank" rel="noreferrer" className="hover:text-black">Linkedin</a>
                <a href="https://www.instagram.com/repl.it" target="_blank" rel="noreferrer" className="hover:text-black">Instagram</a>
                <a href="https://www.facebook.com/replit/" target="_blank" rel="noreferrer" className="hover:text-black">Facebook</a>
                <a href="https://www.tiktok.com/@replit" target="_blank" rel="noreferrer" className="hover:text-black">Tiktok</a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default FooterBigFooterModuleJuPJh;