import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";

import { journeyLabs, journeySteps } from "../../lib/data";
import Chip from "../ui/Chip";
import Container from "../ui/Container";
import StepCard from "../ui/StepCard";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

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

export default function ProtocolJourney() {
  return (
    <section className="bg-white py-16 sm:py-0" id="journey">
      <div aria-hidden="true" className="sr-only" id="how-it-works" />
      <Container>
        <div className="space-y-10 lg:relative lg:left-1/2 lg:w-[1160px] lg:-translate-x-1/2 lg:space-y-[39px] lg:pb-[76px] lg:pt-[138px]">
          <div
            className="max-w-[820px] scroll-mt-20 space-y-4 lg:ml-[60px] lg:w-[905.37px] lg:max-w-none lg:space-y-0"
            id="journey-anchor"
          >
            <p
              className={[
                firaCode.className,
                "h-[11px] w-[94.59px] text-[11px] font-bold uppercase leading-[18.15px] tracking-[1.98px] text-[#1A56DB] lg:mb-[28px]",
              ].join(" ")}
            >
              THE BIOSCAN
            </p>

            <h2
              className={[
                plusJakartaSans.className,
                "text-left font-bold text-[#020B41]",
                "w-full whitespace-pre-line text-[36px] leading-[1.02] tracking-[-0.04em]",
                "lg:w-[905.37px] lg:max-w-none lg:text-[52px] lg:leading-[57.2px] lg:tracking-[-1.56px]",
              ].join(" ")}
            >
              {"From blood result to\ndoctor-assigned protocol in 24\nhours."}
            </h2>

            <p
              className={[
                inter.className,
                "mt-[14px] max-w-[543.75px] text-[18px] font-normal leading-[31.5px] text-[#6B6B71] lg:mt-[18px] lg:h-[63px] lg:max-w-none lg:w-[543.75px]",
              ].join(" ")}
            >
              Upload the blood panel you already have. No new tests needed.
            </p>
          </div>

          <div className="grid max-w-[820px] gap-[20px] md:grid-cols-3 lg:ml-[60px] lg:w-[1040px] lg:max-w-none lg:gap-[28px]">
            {journeySteps.map((step) => (
              <StepCard
                key={step.step}
                description={step.description}
                step={step.step}
                title={step.title}
              />
            ))}
          </div>

          <div className="w-full max-w-[820px] rounded-[20px] border border-[rgba(0,0,0,0.83)] bg-white px-[18px] py-[18px] lg:ml-[60px] lg:h-[150.33px] lg:w-[1040px] lg:max-w-none lg:px-[20px] lg:py-[20px]">
            <p
              className={[
                inter.className,
                "mb-[12px] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8088a7]",
              ].join(" ")}
            >
              ACCEPTED PHILIPPINE LABORATORIES
            </p>
            <div className={["flex flex-wrap gap-x-[8px] gap-y-[8px]", inter.className].join(" ")}>
              {journeyLabs.map((chip) => (
                <Chip
                  key={chip.label}
                  className="min-h-[27px] border-[rgba(0,0,0,0.6)] bg-white px-[14px] py-[6px] text-[14px] font-normal leading-none text-[#4A4A54]"
                >
                  {chip.label}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
