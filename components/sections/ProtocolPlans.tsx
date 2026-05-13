import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";

import CheckoutTrigger from "@/components/app/CheckoutTrigger";
import type { ProtocolKey } from "@/lib/checkout";
import Container from "../ui/Container";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

type PlanVariant = {
  label: string;
  meta: string;
  active: boolean;
};

type Plan = {
  icon: string;
  title: string;
  subtitle: string;
  price: string;
  oldPrice: string;
  quantity: string;
  schedule: string;
  titleSizeClassName: string;
  subtitleSizeClassName: string;
  bullets: string[];
  cta: string;
  protocolKey: ProtocolKey;
  variants?: PlanVariant[];
  featured?: boolean;
  badge?: string;
  notice?: string;
};

const plans: Plan[] = [
  {
    icon: "\uD83C\uDF31",
    title: "Trial Protocol",
    subtitle: "GLIS 0\u201330 \u00B7 First-time users",
    price: "\u20B1130",
    oldPrice: "SRP \u20B1150/cap",
    quantity: "10 caps \u00B7 5 days",
    schedule: "1 cap morning \u00B7 1 cap evening",
    titleSizeClassName: "w-[114.76px] min-h-[23px]",
    subtitleSizeClassName: "w-[184.5px] min-h-[21px]",
    bullets: ["1 BioScan", "Doctor review", "Free shipping"],
    cta: "Enroll: Trial \u2192",
    protocolKey: "trial",
    variants: [
      { label: "Sachet", meta: "10 caps \u00B7 \u20B11,290", active: true },
      { label: "Bottle", meta: "30 caps \u00B7 \u20B13,800", active: false },
    ],
  },
  {
    icon: "\u26A1",
    title: "Start Protocol",
    subtitle: "GLIS 26\u201350 \u00B7 Mild inflammation",
    price: "\u20B1115",
    oldPrice: "SRP \u20B1137/cap",
    quantity: "40 caps \u00B7 15 days",
    schedule: "1\u20132 caps morning \u00B7 1 cap evening",
    titleSizeClassName: "w-[123.77px] min-h-[23px]",
    subtitleSizeClassName: "w-[116.51px] min-h-[38px]",
    bullets: ["1 BioScan", "Doctor review & assignment", "Patient portal access", "Free shipping"],
    cta: "Enroll Now \u2192",
    protocolKey: "start",
  },
  {
    icon: "\uD83D\uDD25",
    title: "Grow Protocol",
    subtitle: "GLIS 51\u201375 \u00B7 Moderate inflammation",
    price: "\u20B1103",
    oldPrice: "SRP \u20B1126/cap",
    quantity: "120 caps \u00B7 30 days",
    schedule: "2 caps morning \u00B7 2 caps evening",
    titleSizeClassName: "w-[128.59px] min-h-[23px]",
    subtitleSizeClassName: "w-[148.9px] min-h-[38px]",
    bullets: [
      "3 BioScans \u2014 track progress",
      "Assigned attending doctor",
      "Full patient portal",
      "Telegram AI assistant",
      "Free shipping",
    ],
    cta: "Enroll Now \u2192",
    protocolKey: "grow",
    featured: true,
    badge: "MOST POPULAR",
    notice: "\u26A1 Limited doctor slots this week",
  },
  {
    icon: "\uD83D\uDC51",
    title: "Power Protocol",
    subtitle: "GLIS 76\u2013100 \u00B7 High inflammation",
    price: "\u20B187",
    oldPrice: "SRP \u20B1107/cap",
    quantity: "400 caps \u00B7 90 days",
    schedule: "2\u20133 caps morning \u00B7 2\u20133 caps evening",
    titleSizeClassName: "w-[136.09px] min-h-[23px]",
    subtitleSizeClassName: "w-[124.75px] min-h-[38px]",
    bullets: ["3 BioScans", "Priority doctor response", "Full 90-day intervention", "Free shipping"],
    cta: "Enroll Now \u2192",
    protocolKey: "power",
  },
];

export default function ProtocolPlans() {
  return (
    <section className="bg-white py-16 sm:py-0" id="plans">
      <div aria-hidden="true" className="sr-only" id="pricing" />
      <Container>
        <div className="lg:pt-[191.05px]">
          <div
            className="mx-auto flex max-w-[982px] scroll-mt-20 flex-col items-center space-y-4 text-center"
            id="pricing-anchor"
          >
            <h2
              className={[
                plusJakartaSans.className,
                "w-full max-w-[982px] text-[40px] font-bold leading-[1.05] tracking-[-0.04em] text-[#0305C6] sm:text-[52px] sm:leading-[57.2px] sm:tracking-[-1.56px] lg:h-[66px]",
              ].join(" ")}
            >
              Doctor-assigned based on your score
            </h2>
            <p
              className={[
                inter.className,
                "mx-auto max-w-[566.83px] text-[18px] font-normal leading-[31.5px] tracking-[0] text-[#020B41] lg:min-h-[52.5px]",
              ].join(" ")}
            >
              Not sure which one? Dr. Shane assigns the right protocol based on your actual
              BioScan results.
            </p>
          </div>

          <div className="mt-[76.78px] grid justify-items-center gap-4 xl:grid-cols-[246.5px_246.5px_246.5px_246.5px] xl:justify-between">
            {plans.map((plan) => (
              <article
                key={plan.title}
                className={[
                  "relative flex w-full max-w-[246.5px] flex-col rounded-[20px] border border-[#E3E7F4] bg-white px-5 py-6 lg:h-[668.69px]",
                  plan.featured
                    ? "overflow-hidden border-[#0305C6] shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
                    : "border-[rgba(0,0,0,0.09)]",
                ].join(" ")}
              >
                {plan.badge ? (
                  <div className="absolute left-1/2 top-[-1px] flex h-[26.14px] w-[119.78px] -translate-x-1/2 items-center justify-center rounded-b-[9px] bg-[#0305C6] px-0 py-0">
                    <span
                      className={[
                        inter.className,
                          "inline-flex h-[14px] w-[96.13px] items-center justify-center whitespace-nowrap text-[11px] font-bold uppercase leading-[18.1px] tracking-[0.66px] text-white",
                      ].join(" ")}
                    >
                      {plan.badge}
                    </span>
                  </div>
                ) : null}

                <div className="flex h-full flex-col">
                  <div className="space-y-4">
                    {plan.notice ? (
                      <div className="space-y-[6px] pt-[24px]">
                        <div className="inline-flex min-h-[50.28px] w-full max-w-[188.5px] items-center rounded-[10px] border border-[#F5C4C4] bg-[#FFF5F5] px-4 py-2">
                          <span
                            className={[
                              inter.className,
                              "text-[10px] font-semibold leading-[1.3] text-[#F04E4E]",
                            ].join(" ")}
                          >
                            {plan.notice}
                          </span>
                        </div>
                        <span className="block text-[18px] leading-none text-[#FF7A00]">
                          {plan.icon}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="block text-[18px] leading-none text-[#FFB21D]">
                          {plan.icon}
                        </span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <h3
                        className={[
                          plusJakartaSans.className,
                          "text-[18px] font-bold leading-[29.7px] tracking-[0] text-[#020B41]",
                          plan.titleSizeClassName,
                        ].join(" ")}
                      >
                        {plan.title}
                      </h3>
                      <p
                        className={[
                          inter.className,
                          "text-[14px] font-normal leading-[21px] tracking-[0] text-[#6B6B71]",
                          plan.subtitleSizeClassName,
                        ].join(" ")}
                      >
                        {plan.subtitle}
                      </p>
                    </div>

                    {plan.variants ? (
                      <div className="flex gap-2">
                        {plan.variants.map((variant) => (
                          <div
                            key={variant.label}
                            className={[
                              "flex min-h-[48px] w-[70px] flex-col items-center justify-center rounded-[8px] border px-2 text-center",
                              variant.active
                                ? "border-[#2A35FF] bg-[#1D23D8] text-white"
                                : "border-[#2C3566] bg-white text-[#4E556A]",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                inter.className,
                                "text-[10px] font-semibold leading-[1.2]",
                              ].join(" ")}
                            >
                              {variant.label}
                            </span>
                            <span
                              className={[
                                inter.className,
                                "text-[10px] font-normal leading-[1.2]",
                              ].join(" ")}
                            >
                              {variant.meta}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="space-y-1">
                      <div className="flex items-end gap-1">
                        <span
                          className={[
                            plusJakartaSans.className,
                            "text-[28px] font-bold leading-none tracking-[-0.04em] text-[#101C63]",
                          ].join(" ")}
                        >
                          {plan.price}
                        </span>
                        <span
                          className={[
                            inter.className,
                            "pb-1 text-[18px] font-medium leading-none text-[#6F7489]",
                          ].join(" ")}
                        >
                          /cap
                        </span>
                      </div>
                      <p
                        className={[
                          inter.className,
                          "text-[11px] font-normal leading-[1.35] text-[#8A8E9D]",
                        ].join(" ")}
                      >
                        per capsule <span className="line-through">{plan.oldPrice}</span>
                      </p>
                      <p
                        className={[
                          inter.className,
                          "text-[14px] font-normal leading-[1.5] text-[#6C7186]",
                        ].join(" ")}
                      >
                        {plan.quantity}
                      </p>
                    </div>

                    <div className="inline-flex rounded-[10px] bg-[#F1F1F1] px-3 py-3">
                      <span
                        className={[
                          firaCode.className,
                          "text-[11px] font-normal leading-[1.45] text-[#6B6B71]",
                        ].join(" ")}
                      >
                        {plan.schedule}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {plan.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className={[
                            inter.className,
                            "flex items-start gap-2 text-[14px] font-normal leading-[1.45] text-[#44444A]",
                          ].join(" ")}
                        >
                          <span className="mt-[2px] text-[12px] leading-none text-[#16B86B]">
                            {"\u2713"}
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <CheckoutTrigger
                    className={[
                      inter.className,
                      "mt-6 inline-flex h-[35px] items-center justify-center self-center rounded-full border text-[14px] font-semibold leading-none transition-colors",
                      plan.featured
                        ? "w-[145px] border-[#1D23D8] bg-[#1D23D8] text-white"
                        : "w-[146px] border-[#2A35FF] bg-white text-[#1D23D8]",
                    ].join(" ")}
                    href="#plans"
                    protocolKey={plan.protocolKey}
                  >
                    {plan.cta}
                  </CheckoutTrigger>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-[35.99px] flex min-h-[61.09px] w-full max-w-[1040px] items-center justify-center rounded-[20px] border border-[rgba(26,86,219,0.12)] bg-[rgba(26,86,219,0.05)] px-6 py-4 text-center">
            <p
              className={[
                inter.className,
                "w-full max-w-[806.14px] text-[14px] font-normal leading-[23.1px] tracking-[0] text-[#7D8191]",
              ].join(" ")}
            >
              Not sure which protocol is right for you?{" "}
              <a className="font-semibold text-[#1D4FFF]" href="#top">
                Check your Lifestyle Inflammation Score first
              </a>{" "}
              <span className="text-[#7D8191]">
                {"\u2014"} Dr. Shane assigns the right one.
              </span>
            </p>
          </div>

          <div className="mx-auto mt-[35.91px] flex w-full max-w-[1040px] flex-col items-center gap-3">
            <div className="w-full rounded-[20px] border border-[rgba(5,150,105,0.18)] bg-[rgba(5,150,105,0.05)] px-[18px] py-[16px] lg:h-[189.17px]">
              <div className="flex flex-col items-start gap-[10px]">
                <div className="relative flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-[#B8E6DE] bg-[#DDF6F2] text-[0px] leading-none text-transparent">
                  <svg
                    aria-hidden="true"
                    className="absolute h-[18px] w-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3 18 5.5V11c0 4.2-2.5 7.96-6 9-3.5-1.04-6-4.8-6-9V5.5L12 3Z"
                      fill="#EAF7F4"
                      stroke="#7ACDBC"
                      strokeWidth="1.4"
                    />
                    <path d="M12 6.2v9.6" stroke="#FF6B57" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M10.2 7.8h3.6" stroke="#FF6B57" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  🛡️
                </div>
                <div className="max-w-[780px] space-y-1">
                  <h3
                    className={[
                      inter.className,
                      "text-[14px] font-semibold leading-[1.45] text-[#5E6068]",
                    ].join(" ")}
                  >
                    Up to 90-day satisfaction guarantee
                  </h3>
                  <p
                    className={[
                      inter.className,
                      "max-w-[780px] text-[14px] font-normal leading-[1.6] text-[#7A7D85]",
                    ].join(" ")}
                  >
                    If your BioScan shows no measurable improvement after completing your
                    protocol, Dr. Shane reviews and issues a full refund within 5 business
                    days. No questions asked.
                  </p>
                </div>
              </div>
            </div>

            <p
              className={[
                inter.className,
                "w-full max-w-[597.07px] text-center text-[11px] font-normal leading-[17.6px] tracking-[0] text-[#6E6E6E]",
              ].join(" ")}
            >
              Patient names changed for privacy. Score data from GutGuard patient portal
              records, n=127. Individual results vary.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
