import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";

import Container from "../ui/Container";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const doctorMetrics = [
  { value: "94%", label: "Patient improvement rate" },
  { value: "127", label: "Patients monitored" },
  { value: "4.9", label: "Patient rating" },
];

const metricValueWidthClasses = ["w-[58.25px]", "w-[39.26px]", "w-[41.24px]"] as const;
const metricLabelWidthClasses = ["w-[131.31px]", "w-[98.16px]", "w-[69.85px]"] as const;

const doctorSteps = [
  { number: "01", label: "Upload labs & get GLIS" },
  { number: "02", label: "Request Dr. Shane" },
  { number: "03", label: "Review within 24h" },
  { number: "04", label: "Protocol assigned" },
  { number: "05", label: "Re-scanned at milestones" },
];

export default function DoctorCredibility() {
  return (
    <section className="bg-[#020B41] py-16 sm:py-0" id="doctor">
      <Container>
        <div className="space-y-10 lg:pb-[96px] lg:pt-[136px]">
          <div className="space-y-6 text-left lg:w-[1016px]">
            <p
              className={[
                firaCode.className,
                "h-[11px] w-[180.39px] text-[11px] font-bold uppercase leading-[18.15px] tracking-[1.98px] text-[#5B8EF0]",
              ].join(" ")}
            >
              YOUR ATTENDING DOCTOR
            </p>

            <h2
              className={[
                plusJakartaSans.className,
                "max-w-[1016px] text-[40px] font-bold leading-[1.04] tracking-[-0.04em] text-white lg:h-[66px] lg:text-[52px] lg:leading-[57.2px] lg:tracking-[-1.56px]",
              ].join(" ")}
            >
              Every patient gets a doctor. Not a chatbot.
            </h2>

            <p
              className={[
                inter.className,
                "max-w-[588.06px] text-[18px] font-normal leading-[31.5px] tracking-[0] text-[#A3A3A8] lg:h-[84px]",
              ].join(" ")}
            >
              Every BioScan goes to a licensed physician {"\u2014"} not a recommendation engine,
              not a chatbot, not an algorithm. Dr. Shane reads your markers, flags what is
              elevated, and writes your protocol himself.
            </p>
          </div>

          <div className="w-full rounded-[20px] border border-[rgba(255,255,255,0.09)] bg-[#06095B] px-6 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)] lg:h-[404.77px] lg:w-[1040px] lg:px-[49px] lg:py-[49px]">
            <div className="space-y-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex h-[104px] w-[104px] shrink-0 items-center justify-center rounded-[20px] border border-[rgba(26,86,219,0.3)] bg-[rgba(26,86,219,0.15)]">
                  <span
                    className={[
                      plusJakartaSans.className,
                      "text-[26px] font-bold tracking-[-0.04em] text-[#6C92FF]",
                    ].join(" ")}
                  >
                    SA
                  </span>
                </div>

                <div className="min-w-0 flex-1 space-y-5">
                  <div className="space-y-[7px]">
                    <h3
                      className={[
                        plusJakartaSans.className,
                        "text-[30px] font-bold leading-[1.2] tracking-[-0.75px] text-white sm:w-[303.07px] lg:h-[49.5px]",
                      ].join(" ")}
                    >
                      Dr. Shane Animas, MD
                    </h3>
                    <p
                      className={[
                        inter.className,
                        "text-[14px] font-normal leading-[23.1px] tracking-[0] text-[#A3A3A8] sm:w-[425.68px] lg:h-[17px]",
                      ].join(" ")}
                    >
                      Internal Medicine {"\u00B7"} GutGuard Medical Lead {"\u00B7"} General Santos
                      City
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span
                      className={[
                        inter.className,
                        "inline-flex min-h-[30.14px] items-center justify-center rounded-[10px] border border-[rgba(5,150,105,0.22)] bg-[rgba(5,150,105,0.1)] px-3 py-1 text-[11px] font-semibold leading-[18.15px] tracking-[0] text-[#047857] sm:w-[142.08px] sm:px-0 sm:py-0",
                      ].join(" ")}
                    >
                      {"\u2713 Licensed Physician"}
                    </span>
                    <span
                      className={[
                        inter.className,
                        "inline-flex min-h-[30.14px] items-center justify-center rounded-[10px] border border-[rgba(26,86,219,0.22)] bg-[rgba(26,86,219,0.1)] px-3 py-1 text-[11px] font-semibold leading-[18.15px] tracking-[0] text-[#1D4ED8] sm:w-[130.22px] sm:px-0 sm:py-0",
                      ].join(" ")}
                    >
                      {"\u26A1 24-hour response"}
                    </span>
                  </div>

                  <blockquote className="relative w-full max-w-[757.72px] rounded-[14px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.04)] px-[20px] py-[17px] lg:h-[75.5px]">
                    <div className="absolute bottom-0 left-0 top-0 w-[2px] rounded-l-[14px] bg-[#3550F0]" />
                    <p
                      className={[
                        inter.className,
                        "w-full max-w-[717.72px] text-[14px] font-normal italic leading-[24.5px] tracking-[0] text-[#FFFFFF] lg:h-[41.5px]",
                      ].join(" ")}
                    >
                      {
                        "\u201CA score of 74 is elevated but very workable. I review every scan personally and match the protocol to what I actually see in the markers \u2014 not just the number.\u201D"
                      }
                    </p>
                  </blockquote>

                  <div className="flex flex-wrap items-start gap-x-[35.19px] gap-y-4 lg:w-[370.51px]">
                    {doctorMetrics.map((metric, index) => (
                      <div key={metric.label} className="space-y-[1px]">
                        <p
                          className={[
                            plusJakartaSans.className,
                            "h-[33px] text-[26px] font-bold leading-[42.9px] tracking-[-0.65px] text-white",
                            metricValueWidthClasses[index],
                          ].join(" ")}
                        >
                          {metric.value}
                        </p>
                        <p
                          className={[
                            inter.className,
                            "h-[14px] text-[11px] font-normal leading-[18.15px] tracking-[0] text-[#7E7E84]",
                            metricLabelWidthClasses[index],
                          ].join(" ")}
                        >
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-[1039px] grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 xl:grid-cols-[187.19px_14.36px_187.2px_14.36px_187.2px_14.36px_187.2px_14.36px_187.19px] xl:items-center xl:justify-start">
            {doctorSteps.map((step, index) => (
              <div key={step.number} className="contents">
                <div className="flex h-[88.33px] w-full max-w-[187.2px] flex-col items-center justify-center rounded-[14px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.04)] px-4 text-center sm:max-w-none xl:max-w-[187.2px]">
                  <p
                    className={[
                      firaCode.className,
                      "mb-2 text-[11px] font-normal leading-[18.1px] tracking-[0] text-[#5B8EF0]",
                    ].join(" ")}
                  >
                    {step.number}
                  </p>
                  <p
                    className={[
                      inter.className,
                      "text-[14px] font-semibold leading-[1.35] text-[#EBEBEF]",
                    ].join(" ")}
                  >
                    {step.label}
                  </p>
                </div>
                {index < doctorSteps.length - 1 ? (
                  <div
                    className={[
                      inter.className,
                      "hidden h-[17px] w-[14.36px] justify-self-center text-center text-[14px] font-normal leading-[14px] tracking-[0] text-[rgba(255,255,255,0.2)] xl:block",
                    ].join(" ")}
                  >
                    {"\u2192"}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
