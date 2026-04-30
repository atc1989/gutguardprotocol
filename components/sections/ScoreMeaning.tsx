import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";

import { scoreRanges } from "../../lib/data";
import Container from "../ui/Container";
import ScoreRangeCard from "../ui/ScoreRangeCard";

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
  weight: ["400"],
  display: "swap",
});

export default function ScoreMeaning() {
  return (
    <section className="bg-white py-16 lg:pb-[118px] lg:pt-[138px]" id="score-ranges">
      <Container>
        <div className="space-y-10 lg:mx-auto lg:w-[1040px]">
          <div className="lg:w-[583.89px]">
            <p
              className={[
                firaCode.className,
                "h-[11px] w-[137.48px] text-[11px] font-bold uppercase leading-[18.15px] tracking-[1.98px] text-[#1A56DB]",
              ].join(" ")}
            >
              YOUR GLIS RESULT
            </p>
            <h2
              className={[
                plusJakartaSans.className,
                "mt-[22.81px] w-full max-w-[572px] text-[40px] font-bold leading-[44px] tracking-[-1.2px] text-[#020B41] sm:text-[52px] sm:leading-[57.2px] sm:tracking-[-1.56px]",
              ].join(" ")}
            >
              What your score means
            </h2>
            <p
              className={[
                inter.className,
                "mt-[14.52px] max-w-[583.89px] text-[18px] font-normal leading-[31.5px] tracking-[0] text-[#6B6B71] lg:h-[52.5px]",
              ].join(" ")}
            >
              Scored 0–100 from your eight markers. Higher means more systemic
              inflammation.
            </p>
          </div>

          <div className="grid gap-[16px] pt-[18px] md:grid-cols-2 lg:w-[1040px] lg:grid-cols-4 lg:gap-[20px] lg:pt-[46px]">
            {scoreRanges.map((range) => (
              <ScoreRangeCard
                key={range.range}
                action={range.action}
                description={range.description}
                label={range.label}
                range={range.range}
                tone={range.tone}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
