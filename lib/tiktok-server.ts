import { createHash } from "crypto";

import {
  buildTikTokEventPayload,
  buildTikTokRegistrationPayload,
  normalizePhoneForTikTok,
  type TikTokEventPayload,
  type TikTokMatch,
  type TrackingContext,
} from "@/lib/tiktok";

type TikTokServerEventInput = {
  context?: TrackingContext;
  event: string;
  eventId: string;
  eventTime?: number;
  eventUrl?: string;
  match?: TikTokMatch;
  payload?: TikTokEventPayload;
  userAgent?: string | null;
  userIp?: string | null;
};

function hashForTikTok(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  if (!normalized) {
    return undefined;
  }

  return createHash("sha256").update(normalized).digest("hex");
}

function getTikTokPixelId() {
  return process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID?.trim();
}

function getTikTokEventsApiToken() {
  const rawToken = process.env.TIKTOK_EVENTS_API_ACCESS_TOKEN?.trim();

  if (!rawToken) {
    return undefined;
  }

  return rawToken
    .replace(/^TIKTOK_EVENTS_API_ACCESS_TOKEN=/i, "")
    .replace(/^Bearer\s+/i, "")
    .trim();
}

function getTikTokEventsApiUrl() {
  return (
    process.env.TIKTOK_EVENTS_API_URL?.trim() ||
    "https://business-api.tiktok.com/open_api/v1.3/event/track/"
  );
}

function getTikTokTestEventCode(context?: TrackingContext) {
  return context?.testEventCode || process.env.TIKTOK_TEST_EVENT_CODE?.trim() || undefined;
}

export { buildTikTokEventPayload, buildTikTokRegistrationPayload };

export async function sendTikTokServerEvent(input: TikTokServerEventInput) {
  const pixelId = getTikTokPixelId();
  const accessToken = getTikTokEventsApiToken();
  const eventsApiUrl = getTikTokEventsApiUrl();

  console.info("TikTok env check", {
    event: input.event,
    hasAccessToken: Boolean(accessToken),
    hasPixelId: Boolean(pixelId),
    host: (() => {
      try {
        return input.eventUrl ? new URL(input.eventUrl).host : null;
      } catch {
        return null;
      }
    })(),
    tokenLength: accessToken?.length ?? 0,
    vercelEnv: process.env.VERCEL_ENV || null,
  });

  if (!pixelId || !accessToken) {
    return { ok: false as const, skipped: true as const };
  }

  const body = {
    test_event_code: getTikTokTestEventCode(input.context),
    event_source: "web",
    event_source_id: pixelId,
    data: [
      {
        event: input.event,
        event_id: input.eventId,
        event_time: input.eventTime ?? Math.floor(Date.now() / 1000),
        page: {
          referrer: input.context?.landingPage,
          url: input.eventUrl,
        },
        properties: {
          ...input.payload,
          ttclid: input.context?.ttclid,
        },
        user: {
          email: hashForTikTok(input.match?.email),
          external_id: hashForTikTok(input.match?.external_id),
          ip: input.userIp || undefined,
          phone_number: hashForTikTok(normalizePhoneForTikTok(input.match?.phone_number)),
          ttclid: input.context?.ttclid,
          ttp: input.context?.ttp,
          user_agent: input.userAgent || undefined,
        },
      },
    ],
  };

  const requestBody = JSON.stringify(body);
  const requestHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Access-Token": accessToken,
    "Content-Type": "application/json",
  };

  const response = await fetch(eventsApiUrl, {
    body: requestBody,
    headers: {
      ...requestHeaders,
    },
    method: "POST",
  });

  if (!response.ok) {
    const errorText = await response.text();

    if (
      /access_token is empty/i.test(errorText) &&
      !eventsApiUrl.includes("access_token=")
    ) {
      const retryUrl = new URL(eventsApiUrl);
      retryUrl.searchParams.set("access_token", accessToken);

      console.warn("TikTok auth retry with query token", {
        event: input.event,
        orderId: input.payload?.order_id || null,
        retryUrl: retryUrl.toString().replace(accessToken, "[redacted]"),
      });

      const retryResponse = await fetch(retryUrl.toString(), {
        body: requestBody,
        headers: {
          ...requestHeaders,
        },
        method: "POST",
      });

      if (retryResponse.ok) {
        return { ok: true as const, skipped: false as const };
      }

      const retryErrorText = await retryResponse.text();
      throw new Error(`TikTok Events API failed: ${retryResponse.status} ${retryErrorText}`);
    }

    throw new Error(`TikTok Events API failed: ${response.status} ${errorText}`);
  }

  return { ok: true as const, skipped: false as const };
}
