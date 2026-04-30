"use client";

import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { FormEvent } from "react";
import { useId, useState } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function LeadCapture() {
  const [statusMessage, setStatusMessage] = useState("");
  const inputId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const emailValue = formData.get("email");
    const email = typeof emailValue === "string" ? emailValue.trim() : "";

    setStatusMessage("");

    if (!email) {
      setStatusMessage("Please enter your email address.");
      return;
    }

    let response: Response;

    try {
      response = await fetch("/api/lead", {
        body: JSON.stringify({
          email,
          source: "lead-capture",
          submittedAt: new Date().toISOString(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch {
      setStatusMessage("We could not submit your request right now.");
      return;
    }

    if (!response.ok) {
      setStatusMessage("We could not submit your request right now.");
      return;
    }

    form.reset();
    setStatusMessage("Request received.");
  }

  return (
    <section className="bg-[#020B41] py-16 lg:py-[72px]" id="email-capture">
      <div className="mx-auto flex h-full w-full max-w-[1040px] items-center px-4 sm:px-6 lg:px-0">
        <div className="relative w-full rounded-[20px] border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.04)] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.16)] lg:h-[259.66px] lg:px-0 lg:py-0">
          <div className="flex flex-col gap-6 lg:block">
            <div className="space-y-[17px] lg:absolute lg:left-[45px] lg:top-[50px] lg:w-[424.87px]">
              <h2
                className={[
                  plusJakartaSans.className,
                  "text-[28px] font-bold leading-[1.3] tracking-[-0.56px] text-white lg:h-[81.19px] lg:w-[424.87px]",
                ].join(" ")}
              >
                Not sure if your labs qualify? Find out first.
              </h2>
              <p
                className={[
                  inter.className,
                  "text-[14px] font-normal leading-[23.1px] tracking-[0] text-[#A3A3A8] lg:h-[63.19px] lg:w-[387.49px]",
                ].join(" ")}
              >
                Send us your lab report format and we will tell you within 2 hours whether your
                existing results cover all 8 markers {"\u2014"} before you commit to anything.
              </p>
            </div>

            <div className="lg:absolute lg:left-[553.41px] lg:top-[91.75px] lg:h-[91px] lg:w-[441.59px]">
              <form className="flex w-full flex-col gap-3 sm:h-[48px] sm:flex-row sm:items-center sm:gap-[10px]" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor={inputId}>
                  Your email address
                </label>
                <input
                  id={inputId}
                  name="email"
                  className={[
                    inter.className,
                    "h-12 flex-1 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.07)] px-4 text-[16px] font-normal text-white outline-none placeholder:text-[16px] placeholder:font-normal placeholder:text-[#7E7E84] sm:h-[48px] sm:w-[272px]",
                  ].join(" ")}
                  autoComplete="email"
                  placeholder="Your email address"
                  type="email"
                  required
                />
                <button
                  className={[
                    plusJakartaSans.className,
                    "h-12 shrink-0 rounded-full bg-[#FFFFFF] text-[14px] font-bold text-[#0A0A0A] hover:bg-[#F5F5F5] sm:h-[48px] sm:w-[159.59px]",
                  ].join(" ")}
                  type="submit"
                >
                  Send Free Guide
                </button>
              </form>
              <p aria-live="polite" className="sr-only" role="status">
                {statusMessage}
              </p>

              <p
                className={[
                  inter.className,
                  "mt-3 text-[11px] font-normal leading-[18.15px] tracking-[0] text-[#7E7E84] lg:mt-[12.75px] lg:h-[14px] lg:w-[275.97px]",
                ].join(" ")}
              >
                No spam. Unsubscribe any time. RA 10173 compliant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
