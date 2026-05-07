"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  consentStorageKey,
  getTrackingStorageKey,
  landingPageStorageKey,
  readStoredTrackingContext,
  ttTestEventCodeStorageKey,
  ttclidStorageKey,
  type ConsentState,
} from "@/lib/tiktok";

type TikTokPixelProps = {
  pixelId?: string;
};

function readConsent() {
  return window.localStorage.getItem(consentStorageKey) as ConsentState | null;
}

export default function TikTokPixel({ pixelId }: TikTokPixelProps) {
  const pathname = usePathname();
  const [isConsentGranted, setIsConsentGranted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const testEventCode =
      typeof window === "undefined"
        ? undefined
        : new URLSearchParams(window.location.search).get("tt_test_event_code") || undefined;

    window.gutguardTikTokDebug = {
      hasPixelId: Boolean(pixelId),
      isConsentGranted,
      isLoaded,
      pathname,
      testEventCode,
      ttqPresent: Boolean(window.ttq),
    };
  }, [isConsentGranted, isLoaded, pathname, pixelId]);

  useEffect(() => {
    function syncConsent() {
      setIsConsentGranted(readConsent() === "granted");
    }

    syncConsent();
    window.addEventListener("storage", syncConsent);
    window.addEventListener("gutguard:consent-updated", syncConsent as EventListener);

    return () => {
      window.removeEventListener("storage", syncConsent);
      window.removeEventListener("gutguard:consent-updated", syncConsent as EventListener);
    };
  }, []);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const queryString = currentSearchParams.toString();
    const landingPage = `${window.location.origin}${pathname}${queryString ? `?${queryString}` : ""}`;

    window.localStorage.setItem(getTrackingStorageKey("utm_campaign"), currentSearchParams.get("utm_campaign") || window.localStorage.getItem(getTrackingStorageKey("utm_campaign")) || "");
    window.localStorage.setItem(getTrackingStorageKey("utm_content"), currentSearchParams.get("utm_content") || window.localStorage.getItem(getTrackingStorageKey("utm_content")) || "");
    window.localStorage.setItem(getTrackingStorageKey("utm_medium"), currentSearchParams.get("utm_medium") || window.localStorage.getItem(getTrackingStorageKey("utm_medium")) || "");
    window.localStorage.setItem(getTrackingStorageKey("utm_source"), currentSearchParams.get("utm_source") || window.localStorage.getItem(getTrackingStorageKey("utm_source")) || "");
    window.localStorage.setItem(getTrackingStorageKey("utm_term"), currentSearchParams.get("utm_term") || window.localStorage.getItem(getTrackingStorageKey("utm_term")) || "");
    window.localStorage.setItem(landingPageStorageKey, landingPage);

    const ttclid = currentSearchParams.get("ttclid");
    const ttTestEventCode = currentSearchParams.get("tt_test_event_code");

    if (ttclid) {
      window.localStorage.setItem(ttclidStorageKey, ttclid);
    }

    if (ttTestEventCode) {
      window.localStorage.setItem(ttTestEventCodeStorageKey, ttTestEventCode);
    }
  }, [pathname]);

  useEffect(() => {
    window.gutguardTrackingContext = () => readStoredTrackingContext();
  }, []);

  useEffect(() => {
    if (!pixelId || !isConsentGranted || isLoaded || window.ttq) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.text = `
      !function (w, d, t) {
        w.TiktokAnalyticsObject = t;
        var ttq = w[t] = w[t] || [];
        ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
        ttq.setAndDefer = function (target, method) {
          target[method] = function () {
            target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
          };
        };
        for (var i = 0; i < ttq.methods.length; i += 1) {
          ttq.setAndDefer(ttq, ttq.methods[i]);
        }
        ttq.load = function (sdkid, options) {
          var url = "https://analytics.tiktok.com/i18n/pixel/events.js";
          ttq._i = ttq._i || {};
          ttq._i[sdkid] = [];
          ttq._i[sdkid]._u = url;
          ttq._t = ttq._t || {};
          ttq._t[sdkid] = +new Date();
          ttq._o = ttq._o || {};
          ttq._o[sdkid] = options || {};
          var scriptTag = d.createElement("script");
          scriptTag.type = "text/javascript";
          scriptTag.async = true;
          scriptTag.src = url + "?sdkid=" + sdkid + "&lib=" + t;
          var firstScript = d.getElementsByTagName("script")[0];
          firstScript.parentNode.insertBefore(scriptTag, firstScript);
        };
        ttq.load(${JSON.stringify(pixelId)});
        ttq.enableCookie && ttq.enableCookie();
      }(window, document, "ttq");
    `;

    document.head.appendChild(script);
    setIsLoaded(true);

    return () => {
      script.remove();
    };
  }, [isConsentGranted, isLoaded, pixelId]);

  useEffect(() => {
    window.gutguardTikTokTrack = (event, payload) => {
      if (!isConsentGranted || !window.ttq?.track) {
        return;
      }

      window.ttq.track(event, payload);
    };
  }, [isConsentGranted]);

  useEffect(() => {
    if (!pixelId || !isConsentGranted || !window.ttq?.page) {
      return;
    }

    window.ttq.page();
  }, [isConsentGranted, isLoaded, pathname, pixelId]);

  return null;
}
