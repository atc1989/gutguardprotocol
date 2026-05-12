import type { SupabaseClient } from "@supabase/supabase-js";

type TikTokOrderStatusUpdate = {
  event: "Lead" | "Purchase" | "Refund";
  error?: string | null;
  sentAt?: string;
  status: "failed" | "sent";
};

function isSchemaMismatch(error: { code?: string; message?: string }) {
  return (
    error.code === "42703" ||
    error.code === "PGRST204" ||
    /column/i.test(error.message || "")
  );
}

export async function persistTikTokOrderStatus(
  supabase: SupabaseClient,
  orderNumber: string,
  update: TikTokOrderStatusUpdate,
) {
  const sentAt = update.sentAt || new Date().toISOString();
  const values = {
    tiktok_last_error: update.error ?? null,
    tiktok_last_event: update.event,
    tiktok_last_sent_at: sentAt,
    tiktok_last_status: update.status,
    ...(update.event === "Lead"
      ? { tiktok_lead_sent_at: update.status === "sent" ? sentAt : null }
      : update.event === "Purchase"
        ? { tiktok_purchase_sent_at: update.status === "sent" ? sentAt : null }
        : {}),
  };

  const response = await supabase
    .from("orders")
    .update(values)
    .eq("order_number", orderNumber);

  if (!response.error || isSchemaMismatch(response.error)) {
    return;
  }

  console.warn("TikTok status persistence failed", {
    error: response.error,
    event: update.event,
    orderNumber,
  });
}
