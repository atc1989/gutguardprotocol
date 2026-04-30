"use client";

import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { useEffect, useState } from "react";

import CheckoutTrigger from "@/components/app/CheckoutTrigger";
import { gutGuardNavLinks } from "../../lib/data";
import Button from "../ui/Button";
import Container from "../ui/Container";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const navLinkWidthClasses = ["w-[89.64px]", "w-[83.46px]", "w-[47.09px]"] as const;

const mobileMenuLinks = [
  {
    description: "Upload labs - get your GLIS in 30 seconds",
    href: "#journey-anchor",
    label: "How It Works",
  },
  {
    description: "Dr. Shane reviews every scan personally",
    href: "#doctor",
    label: "The Doctor",
  },
  {
    description: "Pre -> Pro -> Postbiotic MBS formula",
    href: "#science-anchor",
    label: "The Science",
  },
  {
    description: "BioScan-first - doctor-assigned - 90-day guarantee",
    href: "#compare",
    label: "Why GutGuard",
  },
  {
    description: "P1,299 - P34,999 - free nationwide shipping",
    href: "#pricing-anchor",
    label: "Pricing",
  },
  {
    description: "Common questions answered",
    href: "#faq",
    label: "FAQ",
  },
] as const;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleViewportChange = (event: MediaQueryList | MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    handleViewportChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleViewportChange);

      return () => {
        mediaQuery.removeEventListener("change", handleViewportChange);
      };
    }

    mediaQuery.addListener(handleViewportChange);

    return () => {
      mediaQuery.removeListener(handleViewportChange);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="relative z-40 bg-[#fbfaf7]">
      <Container>
        <div className="flex h-[64px] items-center justify-between gap-4">
          <a
            className={[
              plusJakartaSans.className,
              "inline-flex h-[38px] w-[136px] shrink-0 items-center text-[29px] font-extrabold leading-[29.69px] tracking-[-0.045em] text-[#111111]",
            ].join(" ")}
            href="#top"
          >
            <span className="text-[#111111]">Gut</span>
            <span className="text-[#0305C6]">Guard</span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden h-[39.09px] w-[307.17px] items-center justify-between px-[14px] lg:flex"
          >
            {gutGuardNavLinks.map((link, index) => (
              <a
                key={link.href}
                className={[
                  inter.className,
                  "inline-flex h-[17px] items-center justify-center text-[14px] font-medium leading-[23.1px] tracking-[0] text-[#020B41] transition-colors duration-200 hover:text-[#0305C6]",
                  navLinkWidthClasses[index],
                ].join(" ")}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              className={[
                plusJakartaSans.className,
                "h-[38px] w-[131.08px] rounded-[100px] !bg-[#0305C6] px-[20px] py-[10px] text-[14px] font-semibold leading-[100%] tracking-[0] !text-[#FFFFFF] hover:!bg-[#0305C6]",
              ].join(" ")}
              href="#pricing-anchor"
            >
              <span className="inline-flex h-[18px] items-center justify-center whitespace-nowrap">
                Get My Score
              </span>
            </Button>
          </div>

          <button
            aria-controls="mobile-nav"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d7dced] bg-white text-[#132179] lg:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            type="button"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path d="M6 6 18 18M6 18 18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {isMobileMenuOpen ? (
        <div
          className="fixed inset-0 z-[90] overflow-y-auto bg-[#0a0a0a] px-6 pb-8 pt-[72px] text-white lg:hidden"
          id="mobile-nav"
        >
          <div className="mx-auto flex min-h-full w-full max-w-[1040px] flex-col">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B8EF0]">
                Mobile Menu
              </p>
              <button
                aria-label="Close navigation menu"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg text-white"
                onClick={closeMobileMenu}
                type="button"
              >
                x
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-8 flex flex-col" role="navigation">
              {mobileMenuLinks.map((link) => (
                <a
                  key={link.label}
                  className="flex items-start justify-between gap-4 border-b border-white/5 py-4"
                  href={link.href}
                  onClick={closeMobileMenu}
                >
                  <div className="min-w-0">
                    <div
                      className={[
                        plusJakartaSans.className,
                        "text-[18px] font-bold leading-[1.2] tracking-[-0.02em] text-white",
                      ].join(" ")}
                    >
                      {link.label}
                    </div>
                    <div className="mt-1 text-[11px] leading-[1.4] text-[#7E7E84]">
                      {link.description}
                    </div>
                  </div>
                  <span className="pt-1 text-sm text-white/20">-&gt;</span>
                </a>
              ))}
            </nav>

            <Button
              className={[
                plusJakartaSans.className,
                "mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-white px-6 text-[14px] font-bold leading-none !text-[#0A0A0A]",
              ].join(" ")}
              href="#journey-anchor"
              onClick={closeMobileMenu}
            >
              Check My Inflammation Score -&gt;
            </Button>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                className="inline-flex min-h-[42px] items-center justify-center rounded-[10px] border border-white/10 px-4 text-sm font-medium text-[#A3A3A8]"
                href="https://t.me/gutguardph"
                rel="noopener noreferrer"
                target="_blank"
              >
                Telegram
              </a>
              <a
                className="inline-flex min-h-[42px] items-center justify-center rounded-[10px] border border-white/10 px-4 text-sm font-medium text-[#A3A3A8]"
                href="https://wa.me/63900000000?text=Hi%2C+I%27d+like+to+know+more+about+GutGuard+Protocol"
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
            </div>

            <div className="mt-4 border-t border-white/5 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#1A56DB]/25 bg-[#1A56DB]/15 text-[11px] font-bold text-[#5B8EF0]">
                  SA
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#A3A3A8]">
                    Dr. Shane Animas, MD
                  </div>
                  <div className="mt-0.5 text-[10px] leading-[1.4] text-[#7E7E84]">
                    Internal Medicine - GutGuard Medical Lead - GenSan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
