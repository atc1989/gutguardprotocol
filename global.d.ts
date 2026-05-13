declare module "*.css";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    gutguardTikTokDebug?: {
      canTrack: boolean;
      hasPixelId: boolean;
      isExplicitTestMode: boolean;
      isConsentGranted: boolean;
      isLoaded: boolean;
      pathname: string;
      serverTestEventCode?: string;
      testId?: string;
      testEventCode?: string;
      ttqPresent: boolean;
    };
    gutguardTikTokTrack?: (event: string, payload?: Record<string, unknown>) => void;
    gutguardTrackingContext?: () => Record<string, string | undefined>;
    ttq?: {
      disableCookie?: () => void;
      enableCookie?: () => void;
      identify?: (payload?: Record<string, unknown>) => void;
      load?: (pixelId: string) => void;
      page?: () => void;
      track?: (event: string, payload?: Record<string, unknown>) => void;
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      LEAD_CAPTURE_WEBHOOK_URL?: string;
      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
      NEXT_PUBLIC_TIKTOK_PIXEL_ID?: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
      NEXT_PUBLIC_SUPABASE_URL?: string;
      NEXT_PUBLIC_SITE_URL?: string;
      ORDER_ADMIN_TOKEN?: string;
      SUPABASE_SERVICE_ROLE_KEY?: string;
      TIKTOK_EVENTS_API_ACCESS_TOKEN?: string;
      TIKTOK_EVENTS_API_URL?: string;
      TIKTOK_TEST_EVENT_CODE?: string;
    }
  }
}

export {};
