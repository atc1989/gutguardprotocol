declare module "*.css";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }

  namespace NodeJS {
    interface ProcessEnv {
      LEAD_CAPTURE_WEBHOOK_URL?: string;
      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
      NEXT_PUBLIC_SITE_URL?: string;
    }
  }
}

export {};
