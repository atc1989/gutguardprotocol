import type { SupabaseClient } from "@supabase/supabase-js";

type TikTokOrderEvent = {
  error?: string | null;
  eventId?: string | null;
  eventName: string;
  orderNumber: string;
  payload?: Record<string, unknown> | null;
  sentAt?: string;
  status: "failed" | "sent";
  testEventCode?: string | null;
};

type TikTokOrderEventRow = {
  created_at: string;
  error_text: string | null;
  event_id: string | null;
  event_name: string;
  id: string;
  order_number: string;
  payload_json: Record<string, unknown> | null;
  send_status: "failed" | "sent";
  sent_at: string;
  test_event_code: string | null;
};

function isSchemaMismatch(error: { code?: string; message?: string }) {
  return (
    error.code === "42P01" ||
    error.code === "42703" ||
    error.code === "PGRST204" ||
    /column|relation/i.test(error.message || "")
  );
}

export async function appendTikTokOrderEvent(
  supabase: SupabaseClient,
  event: TikTokOrderEvent,
) {
  const response = await supabase.from("order_tiktok_events").insert({
    error_text: event.error ?? null,
    event_id: event.eventId ?? null,
    event_name: event.eventName,
    order_number: event.orderNumber,
    payload_json: event.payload ?? null,
    send_status: event.status,
    sent_at: event.sentAt || new Date().toISOString(),
    test_event_code: event.testEventCode ?? null,
  });

  if (!response.error || isSchemaMismatch(response.error)) {
    return;
  }

  console.warn("TikTok order event persistence failed", {
    error: response.error,
    eventName: event.eventName,
    orderNumber: event.orderNumber,
  });
}

export async function loadTikTokOrderEvents(
  supabase: SupabaseClient,
  orderNumbers: string[],
) {
  if (!orderNumbers.length) {
    return { error: null, rows: [] as TikTokOrderEventRow[] };
  }

  const response = await supabase
    .from("order_tiktok_events")
    .select(
      "id, order_number, event_name, send_status, event_id, test_event_code, error_text, payload_json, sent_at, created_at",
    )
    .in("order_number", orderNumbers)
    .order("sent_at", { ascending: false });

  if (!response.error) {
    return { error: null, rows: (response.data || []) as TikTokOrderEventRow[] };
  }

  if (isSchemaMismatch(response.error)) {
    return { error: null, rows: [] as TikTokOrderEventRow[] };
  }

  return { error: response.error, rows: [] as TikTokOrderEventRow[] };
}
