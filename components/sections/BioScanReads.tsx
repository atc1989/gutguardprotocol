import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";

import { bioScanMarkers } from "../../lib/data";
import Container from "../ui/Container";
import MarkerCard from "../ui/MarkerCard";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

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

export default function BioScanReads() {
  return (
    <section className="bg-[#142344] py-16 sm:py-0" id="bioscan">
      <div aria-hidden="true" className="sr-only" id="markers" />
      <Container>
        <div className="space-y-10 sm:pb-[96px] sm:pt-[140.61px]">
          <div className="sm:w-[593.26px]">
            <p
              className={[
                firaCode.className,
                "h-[11px] w-[111.75px] text-[11px] font-bold uppercase leading-[18.15px] tracking-[1.98px] text-[#5B8EF0]",
              ].join(" ")}
            >
              THE 8 MARKERS
            </p>
            <h2
              className={[
                plusJakartaSans.className,
                "mt-[14px] w-full max-w-[593.26px] text-[40px] font-bold leading-[44px] tracking-[-1.2px] text-white sm:text-[52px] sm:leading-[57.2px] sm:tracking-[-1.56px]",
              ].join(" ")}
            >
              What your BioScan
              <br />
              reads
            </h2>
            <p
              className={[
                inter.className,
                "mt-[8px] max-w-[467.25px] text-[18px] font-normal leading-[31.5px] tracking-[0] text-[#A3A3A8]",
              ].join(" ")}
            >
              Eight blood markers. One Lifestyle Inflammation Score.
            </p>
          </div>

          <div className="grid gap-[18px] md:grid-cols-2 lg:max-w-[1040px] lg:grid-cols-4 lg:gap-[16px]">
            {bioScanMarkers.map((marker, index) => (
              <MarkerCard
                key={marker.marker}
                code={marker.code}
                description={marker.description}
                desktopSizeClassName={
                  index < 4
                    ? "lg:h-[254.94px] lg:w-[248px]"
                    : "lg:h-[278.03px] lg:w-[248px]"
                }
                marker={marker.marker}
                normalRange={marker.normalRange}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
