import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import type { ScoreRangeTone } from "../../lib/types";

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

const toneClasses: Record<ScoreRangeTone, string> = {
  mint: "border border-[rgba(5,150,105,0.2)] bg-[rgba(5,150,105,0.07)]",
  amber: "border border-[rgba(217,119,6,0.2)] bg-[rgba(217,119,6,0.07)]",
  orange: "border border-[rgba(194,65,12,0.2)] bg-[rgba(194,65,12,0.07)]",
  rose: "border border-[rgba(220,38,38,0.2)] bg-[rgba(220,38,38,0.07)]",
};

const rangeClasses: Record<ScoreRangeTone, string> = {
  mint: "text-[#065F46]",
  amber: "text-[#B45309]",
  orange: "text-[#C2410C]",
  rose: "text-[#B91C1C]",
};

const actionClasses: Record<ScoreRangeTone, string> = {
  mint: "border-[#9fd8c8] bg-[#dff0ea] text-[#0d6f63]",
  amber: "border-[#f2c995] bg-[#f9ecd9] text-[#a95312]",
  orange: "border-[#efb79c] bg-[#f8e5da] text-[#b4511c]",
  rose: "border-[#efb0ad] bg-[#f8dddd] text-[#b72a26]",
};

type ScoreRangeCardProps = {
  action: string;
  description: string;
  label: string;
  range: string;
  tone: ScoreRangeTone;
};

export default function ScoreRangeCard({
  action,
  description,
  label,
  range,
  tone,
}: ScoreRangeCardProps) {
  return (
    <div
      className={[
        "w-full max-w-[245px] rounded-[20px] p-9 text-left sm:w-[245px] lg:h-[294.7px]",
        toneClasses[tone],
      ].join(" ")}
    >
      <div className="space-y-5">
        <div className="space-y-1">
          <p
            className={[
              plusJakartaSans.className,
              "text-[40px] font-extrabold leading-[40px] tracking-[-1.2px]",
              rangeClasses[tone],
            ].join(" ")}
          >
            {range}
          </p>
          <p className={[plusJakartaSans.className, "text-[14px] font-semibold tracking-[-0.02em] text-[#3f3f46]"].join(" ")}>
            {label}
          </p>
        </div>
        <p
          className={[
            inter.className,
            "max-w-[180.59px] text-[14px] font-normal leading-[23.1px] tracking-[0] text-[#6B6B71]",
          ].join(" ")}
        >
          {description}
        </p>
        <p
          className={[
            inter.className,
            "inline-flex min-h-[28.14px] items-center justify-center rounded-full border px-3 py-1 text-[11px] font-bold leading-[18.1px] tracking-[0.66px] sm:w-[115.95px] sm:px-0 sm:py-0",
            actionClasses[tone],
          ].join(" ")}
        >
          {action}
        </p>
      </div>
    </div>
  );
}
