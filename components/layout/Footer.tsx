import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { footerBadges, footerColumns } from "../../lib/data";
import Container from "../ui/Container";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const footerHeadingSizes: Record<string, string> = {
  Protocol: "lg:h-[14px] lg:w-[73.17px]",
  Support: "lg:h-[14px] lg:w-[63.52px]",
  Company: "lg:h-[14px] lg:w-[68.21px]",
};

export default function Footer() {
  return (
    <footer className="bg-[#141414] text-white">
      <Container>
        <div className="flex flex-col gap-10 px-[10px] py-14 sm:px-0 sm:pb-[8px] sm:pt-[46px]">
          <div className="grid gap-10 lg:grid-cols-[325.58px_179.2px_179.2px_179.19px] lg:justify-between">
            <div className="space-y-[10px] lg:w-[325.58px]">
              <a
                className={[
                  plusJakartaSans.className,
                  "text-[18px] font-bold leading-[23px] tracking-[-0.03em] text-[#FFFFFF] lg:w-[160.93px]",
                ].join(" ")}
                href="#top"
              >
                GutGuard Protocol
              </a>
              <p
                className={[
                  inter.className,
                  "text-[14px] font-normal leading-[1.65] text-[#A3A3A8] lg:w-[262.12px] lg:leading-[21.06px]",
                ].join(" ")}
              >
                Doctor-monitored gut health.
                <br />
                Pre&rarr;Pro&rarr;Postbiotic synbiotic
                <br />
                cascade designed for the Filipino body.
              </p>
              <p
                className={[
                  inter.className,
                  "pt-[2px] text-[11px] font-normal leading-[1.65] text-[#7E7E84] lg:w-[325.58px] lg:pt-0 lg:leading-[12.57px]",
                ].join(" ")}
              >
                GutGuard SynBIOTIC+ is a licensed lifestyle supplement. Not a pharmaceutical drug. Not intended
                to diagnose, treat, cure, or prevent any disease. &copy; 2026 GutGuard Philippines.
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-[12px] lg:h-[146.56px] lg:w-[179.2px]">
                <h2
                  className={[
                    inter.className,
                    "text-[11px] font-bold uppercase tracking-[0.22em] text-[#7E7E84] lg:leading-[14px]",
                    footerHeadingSizes[column.title] ?? "",
                  ].join(" ")}
                >
                  {column.title}
                </h2>
                <ul className="space-y-[10px] lg:h-[132.56px] lg:w-[179.2px]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className={[
                          inter.className,
                          "text-[13px] leading-[1.6] text-[#A7A7A7] transition-colors duration-200 hover:text-white lg:text-[14px] lg:leading-[24px]",
                        ].join(" ")}
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-[#2B2B2B] pt-[16px] sm:flex-row sm:items-center sm:justify-between lg:h-[54.8px] lg:gap-0 lg:pt-0">
            <p className={[inter.className, "text-[12px] text-[#707070]"].join(" ")}>
              &copy; 2026 GutGuard Philippines &middot; All rights reserved
            </p>
            <div className="flex flex-wrap gap-[6px]">
              {footerBadges.map((badge) => (
                <span
                  key={badge.label}
                  className={[
                    inter.className,
                    "rounded-[6px] border border-[#3A3A3A] bg-[#232323] px-[8px] py-[4px] text-[10px] font-medium leading-none text-[#8F8F8F]",
                  ].join(" ")}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
