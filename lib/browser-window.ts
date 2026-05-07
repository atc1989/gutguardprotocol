"use client";

type TrackingWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  gutguardTikTokTrack?: (event: string, payload?: Record<string, unknown>) => void;
  gutguardTrackingContext?: () => Record<string, string | undefined>;
  ttq?: {
    disableCookie?: () => void;
    enableCookie?: () => void;
    load?: (pixelId: string) => void;
    page?: () => void;
    track?: (event: string, payload?: Record<string, unknown>) => void;
  };
};

export function getTrackingWindow() {
  return window as TrackingWindow;
}
