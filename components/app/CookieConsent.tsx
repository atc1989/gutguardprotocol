"use client";

import { useEffect, useState } from "react";

type ConsentState = "declined" | "granted";

const storageKey = "gg_consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(storageKey);
    setIsVisible(!savedConsent);
  }, []);

  function setConsent(choice: ConsentState) {
    window.localStorage.setItem(storageKey, choice);
    window.gtag?.("consent", "update", {
      analytics_storage: choice === "granted" ? "granted" : "denied",
      ad_storage: "denied",
    });
    window.gtag?.("event", "cookie_consent", { choice });
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-[#141414] px-4 py-4 text-white sm:px-6">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-[#A3A3A8]">
          <strong className="text-white">Your privacy matters.</strong> GutGuard uses cookies to
          improve your experience and measure how people use this site.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            className="inline-flex min-h-[38px] items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-[#A3A3A8]"
            onClick={() => setConsent("declined")}
            type="button"
          >
            Decline analytics
          </button>
          <button
            className="inline-flex min-h-[38px] items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0A0A0A]"
            onClick={() => setConsent("granted")}
            type="button"
          >
            Accept & continue
          </button>
        </div>
      </div>
    </div>
  );
}
