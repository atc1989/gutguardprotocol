import { Inter } from "next/font/google";

import Container from "../ui/Container";

const inter = Inter({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export default function CategoryChipRail() {
  const featuredIn = [
    "Philippine Daily Inquirer",
    "ANC Health",
    "BusinessWorld PH",
    "Manila Bulletin",
    "Rappler Wellness",
  ];

  return (
    <section className="border-b border-[#7E7E84] bg-[#F5F4F2] py-4 sm:py-0">
      <Container>
        <div className="flex min-h-[71.14px] flex-col justify-center gap-3 lg:h-[71.14px] lg:flex-row lg:items-center lg:gap-6">
          <p
            className={[
              inter.className,
              "h-[14px] w-[88.76px] shrink-0 text-[11px] font-semibold uppercase leading-[18.15px] tracking-[1.54px] text-[#6E6E6E]",
            ].join(" ")}
          >
            Featured In
          </p>
          <div className="flex flex-wrap gap-4">
            {featuredIn.map((item) => (
              <span
                key={item}
                className="inline-flex h-10 items-center rounded-[12px] border border-[#020B41] bg-[#F5F4F2] px-5 text-[13px] font-medium text-[#6E6E6E]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
