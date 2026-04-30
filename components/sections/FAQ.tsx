import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";

import { faqItems } from "../../lib/data";
import Container from "../ui/Container";
import AccordionItem from "../ui/AccordionItem";

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

export default function FAQ() {
  return (
    <section className="bg-[#E5E5E5] py-16 sm:pb-20 sm:pt-0" id="faq">
      <Container>
        <div className="mx-auto flex max-w-[1040px] flex-col items-center space-y-[26px] lg:pt-[147px]">
          <div className="flex flex-col items-center text-center">
            <p
              className={[
                firaCode.className,
                "min-h-[11px] w-[25.95px] text-[11px] font-bold uppercase leading-[18.1px] tracking-[1.98px] text-[#5B8EF0]",
              ].join(" ")}
            >
              FAQ
            </p>
            <h2
              className={[
                plusJakartaSans.className,
                "mt-[8px] w-full max-w-[638px] text-[40px] font-bold leading-[1.05] tracking-[-0.04em] text-[#0305C6] sm:text-[52px] lg:h-[66px]",
              ].join(" ")}
            >
              Common questions
            </h2>
          </div>

          <div className="mx-auto flex w-full max-w-[640px] flex-col gap-[8px] sm:w-[640px]">
            {faqItems.map((item, index) => (
              <div key={item.question} className={inter.className}>
                <AccordionItem
                  answer={item.answer}
                  defaultOpen={index === 0}
                  question={item.question}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
