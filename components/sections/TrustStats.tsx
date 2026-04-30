import { trustStats } from "../../lib/data";
import Container from "../ui/Container";
import StatItem from "../ui/StatItem";

export default function TrustStats() {
  return (
    <section className="bg-[#E5E5E5] py-10 lg:flex lg:items-center lg:py-8">
      <Container>
        <div className="mx-auto flex min-h-[151.66px] w-full max-w-[811.65px] flex-col justify-center space-y-4 text-[#020B41] lg:w-[811.65px]">
          <div className="grid items-start gap-8 md:grid-cols-3 md:gap-0">
            {trustStats.map((stat, index) => (
              <div
                key={stat.label}
                className={[
                  "px-4",
                  index < trustStats.length - 1 ? "md:border-r md:border-[#020B41]/45" : "",
                ].join(" ")}
              >
                <StatItem label={stat.label} value={stat.value} />
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] leading-[14px] tracking-[0] text-[#020B41]">
             Philippine Statistics Authority, 2022 Causes of Death. Non-communicable diseases with inflammatory risk factors. · GutGuard patient data, n=127, Q1 2024.
          </p>
        </div>
      </Container>
    </section>
  );
}
