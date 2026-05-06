export const consentStorageKey = "gg_consent";
export const landingPageStorageKey = "gg_landing_page";
export const ttTestEventCodeStorageKey = "gg_tt_test_event_code";
export const ttclidStorageKey = "gg_ttclid";
export const ttpCookieName = "_ttp";
export const trackingStoragePrefix = "gg_";
export const trackingQueryKeys = [
  "tt_test_event_code",
  "ttclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type ConsentState = "declined" | "granted";

export type TrackingContext = {
  landingPage?: string;
  testEventCode?: string;
  ttclid?: string;
  ttp?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmMedium?: string;
  utmSource?: string;
  utmTerm?: string;
};

export type TikTokMatch = {
  email?: string;
  external_id?: string;
  phone_number?: string;
};

export type TikTokEventPayload = {
  content_id?: string;
  content_name?: string;
  content_type?: string;
  currency?: string;
  description?: string;
  event_id?: string;
  order_id?: string;
  payment_type?: string;
  quantity?: number;
  value?: number;
};

export function getTrackingStorageKey(key: (typeof trackingQueryKeys)[number]) {
  return `${trackingStoragePrefix}${key}`;
}

export function readStoredTrackingContext() {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    landingPage: window.localStorage.getItem(landingPageStorageKey) || undefined,
    testEventCode: window.localStorage.getItem(ttTestEventCodeStorageKey) || undefined,
    ttclid: window.localStorage.getItem(ttclidStorageKey) || undefined,
    ttp:
      typeof document === "undefined"
        ? undefined
        : getCookieValue(document.cookie, ttpCookieName) || undefined,
    utmCampaign: window.localStorage.getItem(getTrackingStorageKey("utm_campaign")) || undefined,
    utmContent: window.localStorage.getItem(getTrackingStorageKey("utm_content")) || undefined,
    utmMedium: window.localStorage.getItem(getTrackingStorageKey("utm_medium")) || undefined,
    utmSource: window.localStorage.getItem(getTrackingStorageKey("utm_source")) || undefined,
    utmTerm: window.localStorage.getItem(getTrackingStorageKey("utm_term")) || undefined,
  } satisfies TrackingContext;
}

export function normalizePrice(price: string) {
  const normalized = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(normalized) ? normalized : 0;
}

export function normalizeQuantity(quantity: string) {
  const parsed = Number(quantity.replace(/[^0-9]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function createEventId(prefix: string) {
  const random = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 12);
  return `${prefix}-${random}`;
}

export function getCookieValue(cookieString: string, name: string) {
  const match = cookieString.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

export function normalizePhoneForTikTok(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return undefined;
  }

  if (digits.startsWith("63")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `63${digits.slice(1)}`;
  }

  return digits;
}

export function buildTikTokEventPayload(input: {
  description: string;
  eventId?: string;
  orderId?: string;
  paymentType?: string;
  price: string;
  productId: string;
  productName: string;
  quantity: string;
}) {
  return {
    content_id: input.productId,
    content_name: input.productName,
    content_type: "product",
    currency: "PHP",
    description: input.description,
    event_id: input.eventId,
    order_id: input.orderId,
    payment_type: input.paymentType,
    quantity: normalizeQuantity(input.quantity),
    value: normalizePrice(input.price),
  } satisfies TikTokEventPayload;
}

export function buildTikTokRegistrationPayload(input: {
  eventId?: string;
  orderId?: string;
  price?: string;
}) {
  return {
    currency: "PHP",
    event_id: input.eventId,
    order_id: input.orderId,
    value: input.price ? normalizePrice(input.price) : undefined,
  } satisfies TikTokEventPayload;
}
