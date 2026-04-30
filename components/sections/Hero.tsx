import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";

import { heroBullets } from "../../lib/data";
import Button from "../ui/Button";
import Container from "../ui/Container";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const scoreRows = [
  {
    label: "C-Reactive Protein",
    value: "4.2",
    unit: "mg/L",
    status: "High",
    tone: "alert",
  },
  {
    label: "Triglycerides",
    value: "218",
    unit: "mg/dL",
    status: "High",
    tone: "alert",
  },
  {
    label: "HDL Cholesterol",
    value: "38",
    unit: "mg/dL",
    status: "Low",
    tone: "alert",
  },
  {
    label: "Fasting Glucose",
    value: "96",
    unit: "mg/dL",
    status: "Normal",
    tone: "neutral",
  },
] as const;

const heroBulletSizeClasses = [
  "sm:w-[198.6px]",
  "sm:w-[183.72px]",
  "sm:w-[166.24px]",
] as const;

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#fbfaf7] py-12 sm:pb-16 sm:pt-0" id="top">
      <div aria-hidden="true" className="sr-only" id="home" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[501.14px_450.86px] lg:justify-between lg:gap-0 lg:pt-[132px]">
          <div className="w-full max-w-[501.14px] space-y-7 lg:h-[876.28px] lg:w-[501.14px]">
            <div
              className={[
                inter.className,
                "inline-flex min-h-[39.09px] items-center rounded-full border border-[rgba(248,113,113,0.2)] bg-[rgba(248,113,113,0.09)] px-4 py-2 text-[14px] font-medium leading-[23.1px] tracking-[0] text-[#F87171]",
              ].join(" ")}
            >
              {"\u2022"} 68% of Philippine deaths start with chronic inflammation
            </div>

            <div className="space-y-5">
              <h1
                className={[
                  plusJakartaSans.className,
                  "h-auto w-full max-w-[501.14px] text-[3.5rem] font-extrabold leading-[0.94] tracking-[-0.04em] text-[#020B41]",
                  "sm:text-[4.5rem]",
                  "lg:h-[420px] lg:text-[84px] lg:leading-[84px] lg:tracking-[-3.36px]",
                ].join(" ")}
              >
                <span className="block text-[#020B41]">Most supplements are a guess.</span>
                <span className="block max-w-[485.65px] text-[#0305C6] lg:min-h-[190px]">
                  Your blood is not.
                </span>
              </h1>
              <p
                className={[
                  inter.className,
                  "max-w-[490.45px] text-[18px] font-normal leading-[31.5px] tracking-[0] text-[#44444A] lg:min-h-[178.5px]",
                ].join(" ")}
              >
                Upload the blood panel you already have from any Philippine laboratory. Your
                Lifestyle Inflammation Score calculates in 30 seconds from 8 clinical markers. A
                licensed doctor reads your results personally and prescribes the exact protocol
                your numbers call for, not a one-size-fits-all box.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                className={[
                  plusJakartaSans.className,
                  "h-[54px] w-full gap-2 rounded-[100px] !bg-[#0305C6] px-0 py-0 text-[16px] font-semibold leading-[100%] !text-[#FFFFFF] hover:!bg-[#0305C6] sm:w-[221.17px]",
                ].join(" ")}
                href="#pricing-anchor"
              >
                <span className="inline-flex w-[125.56px] items-center justify-center">
                  Check My Score
                </span>
                <span aria-hidden="true">{"\u2192"}</span>
              </Button>
            </div>

            <ul className="grid justify-items-start gap-x-8 gap-y-3 md:grid-cols-2">
              {heroBullets.map((bullet, index) => (
                <li
                  key={bullet.label}
                  className="flex items-start gap-2"
                >
                  <span className="flex h-5 w-5 items-center justify-center text-[12px] leading-none text-[#2D2D3D]">
                    {"\u2713"}
                  </span>
                  <span
                    className={[
                      inter.className,
                      "block text-[14px] font-normal leading-[23.1px] tracking-[0] text-[#2D2D3D] md:whitespace-nowrap",
                      heroBulletSizeClasses[index],
                    ].join(" ")}
                  >
                    {bullet.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[450.86px] lg:w-[450.86px]">
            <div className="absolute inset-x-0 top-8 h-[220px] rounded-full bg-[#eef2ff] blur-[68px]" />
            <div className="relative mx-auto w-full max-w-[450.86px] rounded-[20px] border border-[rgba(255,255,255,0.13)] bg-[rgba(255,255,255,0.07)] px-5 pb-6 pt-7 shadow-[0_42px_64px_rgba(15,23,42,0.22),0_12px_24px_rgba(15,23,42,0.14)] sm:px-[29px] sm:pb-[30px] sm:pt-[31px] lg:h-[611.61px] lg:w-[450.86px]">
              <div className="flex h-full flex-col">
                <div
                  className={[
                    inter.className,
                    "flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]",
                  ].join(" ")}
                >
                  <span>Lifestyle Inflammation Score</span>
                  <span className="normal-case tracking-normal text-[#34D399]">{"\u2022"} Sample</span>
                </div>

                <div className="mt-[30px] flex justify-center">
                  <div className="relative flex h-[175px] w-[175px] items-center justify-center rounded-full border-[10px] border-[#7A7A7A]">
                    <div className="text-center">
                      <p
                        className={[
                          plusJakartaSans.className,
                          "text-[58px] font-bold leading-none tracking-[-0.04em] text-[#DF7A00]",
                        ].join(" ")}
                      >
                        74
                      </p>
                      <p
                        className={[
                          inter.className,
                          "mt-[10px] text-[11px] font-medium leading-none text-[#8D8D95]",
                        ].join(" ")}
                      >
                        / 100
                      </p>
                    </div>
                  </div>
                </div>

                <p
                  className={[
                    plusJakartaSans.className,
                    "mt-[24px] text-center text-[14px] font-bold leading-none text-[#F08A00]",
                  ].join(" ")}
                >
                  Moderate inflammation
                </p>

                <div className="mt-[24px] space-y-[22px]">
                  {scoreRows.map((row) => (
                    <div
                      key={row.label}
                        className={[
                          inter.className,
                          "grid grid-cols-[minmax(0,1fr)_40px_40px_58px] items-center gap-x-[6px] text-[14px] leading-none sm:grid-cols-[minmax(0,1fr)_44px_44px_64px] sm:gap-x-[8px]",
                        ].join(" ")}
                      >
                      <span
                        className={[
                          inter.className,
                          "text-[14px] font-normal text-[#44444A]",
                        ].join(" ")}
                      >
                        {row.label}
                      </span>
                      <span
                        className={[
                          row.tone === "alert"
                            ? `${firaCode.className} text-right text-[14px] font-bold tabular-nums text-[#F87171]`
                            : `${firaCode.className} text-right text-[14px] font-bold tabular-nums text-[#9CA3AF]`,
                        ].join(" ")}
                      >
                        {row.value}
                      </span>
                      <span
                        className={[
                          row.tone === "alert"
                            ? `${firaCode.className} text-left text-[14px] font-bold text-[#F87171]`
                            : `${firaCode.className} text-left text-[14px] font-bold text-[#9CA3AF]`,
                        ].join(" ")}
                      >
                        {row.unit}
                      </span>
                      {row.tone === "alert" ? (
                        <span
                          className={[
                            inter.className,
                            "justify-self-end inline-flex h-[24px] min-w-[58px] items-center justify-center rounded-full bg-[#FFF1F3] px-[10px] text-[11px] font-bold text-[#F87171]",
                          ].join(" ")}
                        >
                          {row.status === "Low" ? "\u2193" : "\u2191"} {row.status}
                        </span>
                      ) : (
                        <span
                          className={[
                            inter.className,
                            "min-w-[58px] justify-self-end text-right text-[11px] font-bold text-[#7E7E84]",
                          ].join(" ")}
                        >
                          {row.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  className="mt-6 h-[52px] w-full rounded-full !bg-[#1D23D8] py-0 text-[18px] font-semibold !text-[#FFFFFF] hover:!bg-[#1D23D8] lg:mt-auto"
                  href="#pricing-anchor"
                >
                  Get My Real Score {"\u2192"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
