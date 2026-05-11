"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { getTrackingWindow } from "@/lib/browser-window";
import {
  consentStorageKey,
  getTrackingStorageKey,
  landingPageStorageKey,
  readStoredTrackingContext,
  storeTikTokTestEventCode,
  ttServerTestEventCodeStoredAtStorageKey,
  ttServerTestEventCodeStorageKey,
  ttTestEventCodeStoredAtStorageKey,
  ttTestEventCodeStorageKey,
  ttclidStorageKey,
  type ConsentState,
} from "@/lib/tiktok";

type TikTokPixelProps = {
  pixelId?: string;
};

function readConsent() {
  return getTrackingWindow().localStorage.getItem(consentStorageKey) as ConsentState | null;
}

export default function TikTokPixel({ pixelId }: TikTokPixelProps) {
  const pathname = usePathname();
  const [isConsentGranted, setIsConsentGranted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const trackingWindow = getTrackingWindow();
    const currentSearchParams = new URLSearchParams(trackingWindow.location.search);
    const testEventCode = currentSearchParams.get("tt_test_event_code") || undefined;
    const serverTestEventCode =
      currentSearchParams.get("tt_server_test_event_code") || undefined;
    const isExplicitTestMode = Boolean(testEventCode || serverTestEventCode);
    const canTrack = isConsentGranted || isExplicitTestMode;

    trackingWindow.gutguardTikTokDebug = {
      canTrack,
      hasPixelId: Boolean(pixelId),
      isExplicitTestMode,
      isConsentGranted,
      isLoaded,
      pathname,
      serverTestEventCode,
      testEventCode,
      ttqPresent: Boolean(trackingWindow.ttq),
    };
  }, [
    isConsentGranted,
    isLoaded,
    pathname,
    pixelId,
  ]);

  useEffect(() => {
    const trackingWindow = getTrackingWindow();

    function syncConsent() {
      setIsConsentGranted(readConsent() === "granted");
    }

    syncConsent();
    trackingWindow.addEventListener("storage", syncConsent);
    trackingWindow.addEventListener("gutguard:consent-updated", syncConsent as EventListener);

    return () => {
      trackingWindow.removeEventListener("storage", syncConsent);
      trackingWindow.removeEventListener("gutguard:consent-updated", syncConsent as EventListener);
    };
  }, []);

  useEffect(() => {
    const trackingWindow = getTrackingWindow();
    const currentSearchParams = new URLSearchParams(trackingWindow.location.search);
    const queryString = currentSearchParams.toString();
    const landingPage = `${trackingWindow.location.origin}${pathname}${queryString ? `?${queryString}` : ""}`;

    trackingWindow.localStorage.setItem(getTrackingStorageKey("utm_campaign"), currentSearchParams.get("utm_campaign") || trackingWindow.localStorage.getItem(getTrackingStorageKey("utm_campaign")) || "");
    trackingWindow.localStorage.setItem(getTrackingStorageKey("utm_content"), currentSearchParams.get("utm_content") || trackingWindow.localStorage.getItem(getTrackingStorageKey("utm_content")) || "");
    trackingWindow.localStorage.setItem(getTrackingStorageKey("utm_medium"), currentSearchParams.get("utm_medium") || trackingWindow.localStorage.getItem(getTrackingStorageKey("utm_medium")) || "");
    trackingWindow.localStorage.setItem(getTrackingStorageKey("utm_source"), currentSearchParams.get("utm_source") || trackingWindow.localStorage.getItem(getTrackingStorageKey("utm_source")) || "");
    trackingWindow.localStorage.setItem(getTrackingStorageKey("utm_term"), currentSearchParams.get("utm_term") || trackingWindow.localStorage.getItem(getTrackingStorageKey("utm_term")) || "");
    trackingWindow.localStorage.setItem(landingPageStorageKey, landingPage);

    const ttclid = currentSearchParams.get("ttclid");
    const ttServerTestEventCode = currentSearchParams.get("tt_server_test_event_code");
    const ttTestEventCode = currentSearchParams.get("tt_test_event_code");

    if (ttclid) {
      trackingWindow.localStorage.setItem(ttclidStorageKey, ttclid);
    }

    if (ttServerTestEventCode) {
      storeTikTokTestEventCode(
        ttServerTestEventCodeStorageKey,
        ttServerTestEventCodeStoredAtStorageKey,
        ttServerTestEventCode,
      );
    }

    if (ttTestEventCode) {
      storeTikTokTestEventCode(
        ttTestEventCodeStorageKey,
        ttTestEventCodeStoredAtStorageKey,
        ttTestEventCode,
      );
    }
  }, [pathname]);

  useEffect(() => {
    getTrackingWindow().gutguardTrackingContext = () => readStoredTrackingContext();
  }, []);

  useEffect(() => {
    const trackingWindow = getTrackingWindow();
    const currentSearchParams = new URLSearchParams(trackingWindow.location.search);
    const isExplicitTestMode = Boolean(
      currentSearchParams.get("tt_test_event_code") ||
        currentSearchParams.get("tt_server_test_event_code"),
    );
    const canTrack = isConsentGranted || isExplicitTestMode;

    if (!pixelId || !canTrack || isLoaded || trackingWindow.ttq) {
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
    const trackingWindow = getTrackingWindow();
    const currentSearchParams = new URLSearchParams(trackingWindow.location.search);
    const isExplicitTestMode = Boolean(
      currentSearchParams.get("tt_test_event_code") ||
        currentSearchParams.get("tt_server_test_event_code"),
    );
    const canTrack = isConsentGranted || isExplicitTestMode;

    trackingWindow.gutguardTikTokTrack = (
      event: string,
      payload?: Record<string, unknown>,
    ) => {
      if (!canTrack || !trackingWindow.ttq?.track) {
        return;
      }

      trackingWindow.ttq.track(event, payload);
    };
  }, [isConsentGranted]);

  useEffect(() => {
    const trackingWindow = getTrackingWindow();
    const currentSearchParams = new URLSearchParams(trackingWindow.location.search);
    const isExplicitTestMode = Boolean(
      currentSearchParams.get("tt_test_event_code") ||
        currentSearchParams.get("tt_server_test_event_code"),
    );
    const canTrack = isConsentGranted || isExplicitTestMode;

    if (!pixelId || !canTrack || !trackingWindow.ttq?.page) {
      return;
    }

    trackingWindow.ttq.page();
  }, [isConsentGranted, isLoaded, pathname, pixelId]);

  return null;
}
