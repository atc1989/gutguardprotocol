import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";

import CheckoutTrigger from "@/components/app/CheckoutTrigger";
import Button from "../ui/Button";
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

export default function FinalCTA() {
  return (
    <section className="bg-[#020B41] py-16" id="final-cta">
      <Container>
        <div className="mx-auto max-w-[1040px] rounded-[20px] border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] px-6 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.18)] sm:px-10 sm:py-14">
          <div className="mx-auto max-w-[760px] space-y-6">
            <p
              className={[
                firaCode.className,
                "text-[11px] font-bold uppercase leading-[18.15px] tracking-[1.98px] text-[#5B8EF0]",
              ].join(" ")}
            >
              Still deciding?
            </p>

            <h2
              className={[
                plusJakartaSans.className,
                "text-[40px] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[52px] sm:leading-[57.2px] sm:tracking-[-1.56px]",
              ].join(" ")}
              id="fca-h"
            >
              Your blood results already
              <br />
              have the answer.
            </h2>

            <p
              className={[
                inter.className,
                "mx-auto max-w-[760px] text-[16px] font-normal leading-[1.75] text-[#A3A3A8] sm:text-[18px] sm:leading-[31.5px]",
              ].join(" ")}
            >
              Upload the CBC or lipid panel you already have. Your GLIS calculates in 30 seconds
              - no new tests, no prepayment. If Dr. Shane reviews your scan and assigns a
              protocol, you will know exactly what you are paying for and why before a single peso
              changes hands.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <Button
                className={[
                  plusJakartaSans.className,
                  "h-[54px] min-w-[246px] gap-2 rounded-[100px] !bg-[#FFFFFF] px-6 py-0 text-[16px] font-semibold leading-[100%] !text-[#0A0A0A] hover:!bg-[#F5F5F5]",
                ].join(" ")}
                href="#journey-anchor"
              >
                Check My Inflammation Score
                <span aria-hidden="true">{"\u2192"}</span>
              </Button>

              <CheckoutTrigger
                className={[
                  plusJakartaSans.className,
                  "inline-flex items-center justify-center h-[54px] min-w-[220px] gap-2 rounded-[100px] border border-[rgba(255,255,255,0.22)] !bg-transparent px-6 py-0 text-[16px] font-semibold leading-[100%] !text-[#FFFFFF] hover:!bg-[rgba(255,255,255,0.06)]",
                ].join(" ")}
                href="#plans"
                protocolKey="grow"
              >
                Enroll: Grow Protocol
                <span aria-hidden="true">{"\u2192"}</span>
              </CheckoutTrigger>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
