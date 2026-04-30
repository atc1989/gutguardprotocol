import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";

import { patientReviews } from "../../lib/data";
import Container from "../ui/Container";
import ReviewCard from "../ui/ReviewCard";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export default function PatientReviews() {
  return (
    <section className="bg-[#FBFAF7] py-16 sm:pb-20 sm:pt-0" id="reviews">
      <div aria-hidden="true" className="sr-only" id="proof" />
      <Container>
        <div className="space-y-[18px] lg:pt-[88px]">
          <div className="flex flex-col items-center text-center">
            <p
              className={[
                firaCode.className,
                "min-h-[11px] w-[128.9px] text-[11px] font-bold uppercase leading-[18.15px] tracking-[1.98px] text-[#1A56DB]",
              ].join(" ")}
            >
              Patient results
            </p>
            <h2
              className={[
                plusJakartaSans.className,
                "mt-[16px] w-full max-w-[642px] text-[40px] font-bold leading-[1.05] tracking-[-0.04em] text-[#0305C6] sm:text-[52px] sm:leading-[57.2px] sm:tracking-[-1.56px] lg:h-[66px]",
              ].join(" ")}
            >
              Real scores. Real patients.
            </h2>
          </div>

          <div className="mx-auto grid max-w-[1032px] justify-items-center gap-[22px] lg:grid-cols-3">
            {patientReviews.map((review, index) => (
              <ReviewCard
                key={`${review.initials}-${review.before}-${review.after}`}
                after={review.after}
                before={review.before}
                improvement={review.improvement}
                initials={review.initials}
                protocol={review.protocol}
                quoteSizeClassName={
                  index === 1
                    ? "w-full sm:w-[269.6px] lg:min-h-[135.98px]"
                    : index === 2
                      ? "w-full sm:w-[269.98px] lg:min-h-[88.39px]"
                      : "w-full sm:w-[268.61px] lg:min-h-[88.39px]"
                }
                quote={review.quote}
              />
            ))}
          </div>

          <p
            className={[
              inter.className,
              "mx-auto mt-[18px] w-full max-w-[597.07px] text-center text-[11px] font-normal leading-[17.6px] tracking-[0] text-[#6E6E6E]",
            ].join(" ")}
          >
            Patient names changed for privacy. Score data from GutGuard patient portal
            records, n=127. Individual results vary.
          </p>
        </div>
      </Container>
    </section>
  );
}
