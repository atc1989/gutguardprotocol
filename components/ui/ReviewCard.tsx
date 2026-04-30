import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

type ReviewCardProps = {
  after: string;
  before: string;
  quoteSizeClassName?: string;
  improvement: string;
  initials: string;
  protocol: string;
  quote: string;
};

export default function ReviewCard({
  after,
  before,
  quoteSizeClassName,
  improvement,
  initials,
  protocol,
  quote,
}: ReviewCardProps) {
  return (
    <article className="flex w-full max-w-[330.67px] flex-col rounded-[18px] border border-[#E7E7EA] bg-white px-[21px] py-[20px] shadow-none lg:h-[389.69px]">
      <div className="flex items-center justify-between">
        <div className="flex h-[45px] items-center gap-[7px]">
          <span
            className={[
              plusJakartaSans.className,
              "inline-flex h-[45px] w-[43.19px] items-center justify-center text-[36px] font-extrabold leading-[59.4px] tracking-[-1.08px] text-[#C52323]",
            ].join(" ")}
          >
            {before}
          </span>
          <span className="text-[22px] leading-none text-[#CACBD2]">{"→"}</span>
          <span
            className={[
              plusJakartaSans.className,
              "inline-flex h-[45px] w-[43.19px] items-center justify-center text-[36px] font-extrabold leading-[59.4px] tracking-[-1.08px] text-[#118767]",
            ].join(" ")}
          >
            {after}
          </span>
        </div>

        <span
          className={[
            inter.className,
            "inline-flex min-h-[21px] items-center self-center rounded-full border border-[#B7EBDD] bg-[#ECFBF5] px-[9px] py-[4px] text-[10px] font-semibold leading-none text-[#118767]",
          ].join(" ")}
        >
          {improvement}
        </span>
      </div>

      <div className="mt-[10px] space-y-[8px]">
        <div className="grid grid-cols-[35px_1fr_18px] items-center gap-[8px]">
          <span
            className={[
              inter.className,
              "text-[11px] font-bold leading-none text-[#6E6E6E]",
            ].join(" ")}
          >
            Before
          </span>
          <span className="h-[5px] rounded-full bg-[#F1F1F2]" />
          <span
            className={[
              inter.className,
              "text-right text-[10px] font-semibold leading-none text-[#76767A]",
            ].join(" ")}
          >
            {before}
          </span>
        </div>
        <div className="grid grid-cols-[35px_1fr_18px] items-center gap-[8px]">
          <span
            className={[
              inter.className,
              "text-[11px] font-bold leading-none text-[#6E6E6E]",
            ].join(" ")}
          >
            After
          </span>
          <span className="h-[5px] rounded-full bg-[#F1F1F2]" />
          <span
            className={[
              inter.className,
              "text-right text-[10px] font-semibold leading-none text-[#76767A]",
            ].join(" ")}
          >
            {after}
          </span>
        </div>
      </div>

      <p
        className={[
          inter.className,
          "mt-[14px] text-[14px] font-normal italic leading-[23.8px] tracking-[0] text-[#6B6B71]",
          quoteSizeClassName ?? "w-full max-w-[268.61px] lg:min-h-[88.39px]",
        ].join(" ")}
      >
        {quote}
      </p>

      <div className="flex items-center gap-[10px] pt-[16px]">
        <div className="relative flex h-[36px] w-[36px] items-center justify-center rounded-[18px] bg-[#EBE9E5]">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="34"
              height="34"
              rx="17"
              fill="none"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          </svg>
          <span
            className={[
              inter.className,
              "relative z-[1] text-[12px] font-medium leading-none text-[#D6D0CA]",
            ].join(" ")}
          >
            {initials}
          </span>
        </div>
        <p
          className={[
            inter.className,
            "text-[11px] font-normal leading-[18.15px] tracking-[0] text-[#6E6E6E]",
          ].join(" ")}
        >
          {protocol}
        </p>
      </div>
    </article>
  );
}
