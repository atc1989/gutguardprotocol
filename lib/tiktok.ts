export const consentStorageKey = "gg_consent";
export const landingPageStorageKey = "gg_landing_page";
export const ttTestIdStoredAtStorageKey = "gg_tt_test_id_stored_at";
export const ttTestIdStorageKey = "gg_tt_test_id";
export const ttServerTestEventCodeStoredAtStorageKey = "gg_tt_server_test_event_code_stored_at";
export const ttServerTestEventCodeStorageKey = "gg_tt_server_test_event_code";
export const ttTestEventCodeStoredAtStorageKey = "gg_tt_test_event_code_stored_at";
export const ttTestEventCodeStorageKey = "gg_tt_test_event_code";
export const ttclidStorageKey = "gg_ttclid";
export const ttpCookieName = "_ttp";
export const trackingStoragePrefix = "gg_";
export const tiktokTestEventCodeTtlMs = 60 * 60 * 1000;
export const trackingQueryKeys = [
  "tt_test_id",
  "tt_server_test_event_code",
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
  testId?: string;
  serverTestEventCode?: string;
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

export type TikTokIdentifyPayload = {
  email?: string;
  external_id?: string;
  phone_number?: string;
};

export function getTrackingStorageKey(key: (typeof trackingQueryKeys)[number]) {
  return `${trackingStoragePrefix}${key}`;
}

function readFreshStoredValue(valueKey: string, timestampKey: string, ttlMs: number) {
  if (typeof window === "undefined") {
    return undefined;
  }

  const storedValue = window.localStorage.getItem(valueKey);

  if (!storedValue) {
    return undefined;
  }

  const storedAtRaw = window.localStorage.getItem(timestampKey);
  const storedAt = storedAtRaw ? Number(storedAtRaw) : NaN;

  if (!Number.isFinite(storedAt) || Date.now() - storedAt > ttlMs) {
    window.localStorage.removeItem(valueKey);
    window.localStorage.removeItem(timestampKey);
    return undefined;
  }

  return storedValue;
}

export function storeTikTokTestEventCode(valueKey: string, timestampKey: string, value: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(valueKey, value);
  window.localStorage.setItem(timestampKey, String(Date.now()));
}

export function readStoredTrackingContext() {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    landingPage: window.localStorage.getItem(landingPageStorageKey) || undefined,
    testId:
      readFreshStoredValue(
        ttTestIdStorageKey,
        ttTestIdStoredAtStorageKey,
        tiktokTestEventCodeTtlMs,
      ) || undefined,
    serverTestEventCode:
      readFreshStoredValue(
        ttServerTestEventCodeStorageKey,
        ttServerTestEventCodeStoredAtStorageKey,
        tiktokTestEventCodeTtlMs,
      ) || undefined,
    testEventCode:
      readFreshStoredValue(
        ttTestEventCodeStorageKey,
        ttTestEventCodeStoredAtStorageKey,
        tiktokTestEventCodeTtlMs,
      ) || undefined,
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

export function isValidPhilippineMobileForTikTok(value?: string | null) {
  const normalized = normalizePhoneForTikTok(value);
  return Boolean(normalized && /^639\d{9}$/.test(normalized));
}

export function normalizeEmailForTikTok(value?: string | null) {
  const normalized = value?.trim().toLowerCase();
  return normalized || undefined;
}

export function buildTikTokIdentifyPayload(input: {
  email?: string | null;
  externalId?: string | null;
  phoneNumber?: string | null;
}) {
  return {
    email: normalizeEmailForTikTok(input.email),
    external_id: input.externalId?.trim() || undefined,
    phone_number: normalizePhoneForTikTok(input.phoneNumber),
  } satisfies TikTokIdentifyPayload;
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
  description?: string;
  eventId?: string;
  orderId?: string;
  price?: string;
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
    quantity: normalizeQuantity(input.quantity),
    value: input.price ? normalizePrice(input.price) : undefined,
  } satisfies TikTokEventPayload;
}
