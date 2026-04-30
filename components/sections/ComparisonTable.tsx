import { Fragment } from "react";

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
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const rows = [
  {
    feature: "Starting price",
    generic: "\u20B1150\u2013500/mo",
    other: "\u20B1299\u2013999/mo",
    gutGuard: "\u20B11,299 (Trial)",
  },
  {
    feature: "Baseline inflammation score",
    generic: "\u00D7",
    other: "\u00D7",
    gutGuard: "\u2713",
  },
  {
    feature: "Doctor-reviewed results",
    generic: "\u00D7",
    other: "Chat only",
    gutGuard: "\u2713 Personal MD",
  },
  {
    feature: "Protocol matched to your score",
    generic: "\u00D7",
    other: "\u00D7",
    gutGuard: "\u2713",
  },
  {
    feature: "Progress tracking via re-scan",
    generic: "\u00D7",
    other: "Self-reported",
    gutGuard: "\u2713 Blood markers",
  },
  {
    feature: "Urolithin-A postbiotic",
    generic: "\u00D7",
    other: "\u00D7",
    gutGuard: "\u2713 250mg/cap",
  },
  {
    feature: "Free nationwide shipping",
    generic: "Sometimes",
    other: "Limited",
    gutGuard: "\u2713 Always free",
  },
  {
    feature: "Satisfaction guarantee",
    generic: "7\u201314 days",
    other: "\u00D7",
    gutGuard: "\u2713 Up to 90 days",
  },
];

const comparisonCellSizeClasses: Record<
  string,
  Partial<Record<"generic" | "other" | "gutGuard", string>>
> = {
  "Starting price": {
    generic: "h-[17px] w-[99.41px]",
    other: "h-[17px] w-[96.86px]",
    gutGuard: "h-[17px] w-[92.24px]",
  },
  "Doctor-reviewed results": {
    other: "h-[17px] w-[64.1px]",
    gutGuard: "h-[20px] w-[118.47px]",
  },
  "Progress tracking via re-scan": {
    other: "h-[17px] w-[90.34px]",
    gutGuard: "h-[20px] w-[132.11px]",
  },
  "Urolithin-A postbiotic": {
    gutGuard: "h-[20px] w-[109.85px]",
  },
  "Free nationwide shipping": {
    generic: "h-[17px] w-[74.98px]",
    other: "h-[17px] w-[49.42px]",
    gutGuard: "h-[20px] w-[111.95px]",
  },
  "Satisfaction guarantee": {
    generic: "h-[17px] w-[66.53px]",
    gutGuard: "h-[20px] w-[127.43px]",
  },
};

const featureLabelSizeClasses: Record<string, string> = {
  "Starting price": "h-[19px] w-[97.59px]",
  "Baseline inflammation score": "h-[19px] w-[202.06px]",
  "Doctor-reviewed results": "h-[19px] w-[172.94px]",
  "Protocol matched to your score": "h-[19px] w-[225.19px]",
  "Progress tracking via re-scan": "h-[19px] w-[211.44px]",
  "Urolithin-A postbiotic": "h-[19px] w-[154.06px]",
  "Free nationwide shipping": "h-[19px] w-[180.26px]",
  "Satisfaction guarantee": "h-[19px] w-[162.28px]",
};

export default function ComparisonTable() {
  return (
    <section className="bg-[#020B41] py-12 sm:py-0" id="compare">
      <Container>
        <div className="space-y-12 lg:pb-[96px] lg:pt-[138.87px]">
          <div className="space-y-6 text-left">
            <p
              className={[
                firaCode.className,
                "min-h-[11px] w-[103.17px] text-[11px] font-bold uppercase leading-[18.15px] tracking-[1.98px] text-[#1A56DB]",
              ].join(" ")}
            >
              WHY GUTGUARD
            </p>

            <h2
              className={[
                plusJakartaSans.className,
                "w-full max-w-[796px] text-[40px] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[52px] sm:leading-[57.2px] sm:tracking-[-1.56px]",
              ].join(" ")}
            >
              Not all gut supplements are equal
            </h2>

            <p
              className={[
                inter.className,
                "max-w-[557.83px] text-[18px] font-normal leading-[31.5px] tracking-[0] text-[#6B6B71] lg:h-[52.5px]",
              ].join(" ")}
            >
              Generic supplements are cheaper and easier to find. Here is what that tradeoff
              actually costs you.
            </p>
          </div>

          <div className="-mx-4 w-[calc(100%+2rem)] overflow-x-auto px-4 sm:mx-0 sm:w-full sm:px-0 lg:w-[1040px]">
            <div className="min-w-[1040px]">
              <div className="grid grid-cols-[332px_198px_204px_254px] lg:min-h-[564.5px]">
                <div
                  className={[
                    plusJakartaSans.className,
                    "flex min-h-[78px] items-center justify-center px-6 text-center text-[16px] font-bold leading-[100%] tracking-[1.28px] text-white",
                  ].join(" ")}
                >
                  <span className="inline-flex h-[21px] w-[79.04px] items-center justify-center">
                    FEATURE
                  </span>
                </div>
                <div
                  className={[
                    plusJakartaSans.className,
                    "flex min-h-[78px] items-center justify-center px-6 text-center text-[16px] font-bold leading-[100%] tracking-[0] text-white",
                  ].join(" ")}
                >
                  <span className="inline-flex h-[42px] w-[96.05px] items-center justify-center text-center">
                    Generic Supplement
                  </span>
                </div>
                <div
                  className={[
                    plusJakartaSans.className,
                    "flex min-h-[78px] items-center justify-center px-6 text-center text-[16px] font-bold leading-[100%] tracking-[0] text-white",
                  ].join(" ")}
                >
                  <span className="inline-flex h-[42px] w-[95.06px] items-center justify-center text-center">
                    Other PH Health Apps
                  </span>
                </div>
                <div className="border-l-2 border-r-2 border-[#1A56DB] bg-[rgba(26,86,219,0.2)]">
                  <div
                    className={[
                      plusJakartaSans.className,
                      "flex min-h-[78px] items-center justify-center px-6 text-center text-[16px] font-bold leading-[100%] tracking-[0] text-white",
                    ].join(" ")}
                  >
                    <span className="inline-flex h-[42px] w-[77.67px] items-center justify-center text-center">
                      GutGuard Protocol
                    </span>
                  </div>
                </div>

                {rows.map((row, index) => (
                  <Fragment key={row.feature}>
                    <div
                      className={[
                        inter.className,
                        "flex min-h-[52px] items-center px-[22px] py-5 text-[15px] font-medium leading-[22.5px] tracking-[0] text-white",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "inline-flex items-center",
                          featureLabelSizeClasses[row.feature],
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {row.feature}
                      </span>
                    </div>
                    <div
                      className={[
                        inter.className,
                        "flex min-h-[52px] items-center justify-center px-5 py-5 text-center",
                        row.feature === "Starting price" ||
                        row.generic === "\u00D7" ||
                        row.feature === "Free nationwide shipping" ||
                        row.feature === "Satisfaction guarantee"
                          ? "h-[53px] w-[199.88px]"
                          : "",
                        row.feature === "Starting price"
                          ? "text-[14px] font-bold leading-[21px] tracking-[0] text-[#23AE33]"
                          : row.generic === "\u00D7" || row.generic.startsWith("\u20B1")
                            ? row.generic === "\u00D7"
                              ? "text-[16px] font-normal leading-[24px] tracking-[0] text-white"
                              : "text-[16px] font-semibold text-[#1ED760]"
                            : "text-[16px] font-semibold text-[#FFD22E]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          comparisonCellSizeClasses[row.feature]?.generic,
                          row.generic === "\u00D7"
                            ? "inline-flex h-[20px] w-[12.4px] items-center justify-center"
                            : row.feature === "Free nationwide shipping"
                              ? "inline-flex h-[17px] w-[74.98px] items-center justify-center text-[14px] font-medium leading-[21px] tracking-[0] text-[#FBBF24]"
                              : row.feature === "Satisfaction guarantee"
                                ? "inline-flex h-[17px] w-[66.53px] items-center justify-center text-[14px] font-medium leading-[21px] tracking-[0] text-[#FBBF24]"
                              : "inline-flex items-center justify-center",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {row.generic}
                      </span>
                    </div>
                    <div
                      className={[
                        inter.className,
                        "flex min-h-[52px] items-center justify-center px-5 py-5 text-center",
                        row.other === "\u00D7" ||
                        row.feature === "Doctor-reviewed results" ||
                        row.feature === "Progress tracking via re-scan" ||
                        row.feature === "Free nationwide shipping"
                          ? "h-[53px] w-[199.14px]"
                          : "",
                        row.feature === "Starting price"
                          ? "h-[51.5px] w-[199.14px] text-[14px] font-medium leading-[21px] tracking-[0] text-[#FBBF24]"
                          : row.other === "\u00D7"
                            ? "text-[16px] font-semibold text-white"
                            : row.other.startsWith("\u20B1")
                              ? "text-[16px] font-semibold text-[#FFD22E]"
                              : "text-[16px] font-semibold text-[#FFD22E]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          comparisonCellSizeClasses[row.feature]?.other,
                          row.other === "\u00D7"
                            ? "inline-flex h-[20px] w-[12.4px] items-center justify-center text-[16px] font-normal leading-[24px] tracking-[0] text-white"
                            : row.feature === "Doctor-reviewed results"
                              ? "inline-flex h-[17px] w-[64.1px] items-center justify-center text-[14px] font-medium leading-[21px] tracking-[0] text-[#FBBF24]"
                              : row.feature === "Progress tracking via re-scan"
                                ? "inline-flex h-[17px] w-[90.34px] items-center justify-center text-[14px] font-medium leading-[21px] tracking-[0] text-[#FBBF24]"
                                : row.feature === "Free nationwide shipping"
                                  ? "inline-flex h-[17px] w-[49.42px] items-center justify-center text-[14px] font-medium leading-[21px] tracking-[0] text-[#FBBF24]"
                            : "inline-flex items-center justify-center",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {row.other}
                      </span>
                    </div>
                    <div
                      className={[
                        "border-l-2 border-r-2 border-[#1A56DB] bg-[rgba(26,86,219,0.2)]",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          inter.className,
                          row.feature === "Starting price"
                            ? "flex h-[51.5px] w-[257.02px] items-center justify-center border-t border-[rgba(26,86,219,0.12)] px-5 py-5 text-center text-[14px] font-semibold leading-[21px] tracking-[0] text-white"
                            : "flex h-[53px] w-[257.02px] items-center justify-center border-t border-[rgba(26,86,219,0.12)] px-5 py-5 text-center text-[16px] font-semibold text-[#1ED760]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            comparisonCellSizeClasses[row.feature]?.gutGuard,
                            row.feature === "Starting price"
                              ? "inline-flex items-center justify-center text-[14px] font-semibold leading-[21px] tracking-[0] text-white"
                              : "inline-flex items-center justify-center",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {row.gutGuard}
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
