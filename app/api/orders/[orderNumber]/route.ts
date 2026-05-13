import { NextResponse } from "next/server";

import { isOrderAdminAuthorized } from "@/lib/order-admin";
import { isOrderStatus } from "@/lib/orders";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { appendTikTokOrderEvent } from "@/lib/tiktok-order-events";
import { persistTikTokOrderStatus } from "@/lib/tiktok-order-status";
import {
  buildTikTokEventPayload,
  buildTikTokRegistrationPayload,
  sendTikTokServerEvent,
} from "@/lib/tiktok-server";

type UpdateOrderStatusPayload = {
  resendEvent?: "Lead" | "Purchase" | "Refund";
  status?: string;
};

function buildTrackingContext(order: Record<string, string | null>) {
  return {
    landingPage: order.landing_page || undefined,
    testEventCode: order.tt_test_event_code || undefined,
    ttclid: order.ttclid || undefined,
    ttp: order.ttp || undefined,
    utmCampaign: order.utm_campaign || undefined,
    utmContent: order.utm_content || undefined,
    utmMedium: order.utm_medium || undefined,
    utmSource: order.utm_source || undefined,
    utmTerm: order.utm_term || undefined,
  };
}

async function sendLeadForOrder(
  request: Request,
  supabase: ReturnType<typeof createServerSupabaseClient>,
  order: Record<string, string | null>,
) {
  const eventId = order.tiktok_event_id || `submit-form-${order.order_number}`;

  try {
    const trackingResult = await sendTikTokServerEvent({
      context: buildTrackingContext(order),
      event: "Lead",
      eventId,
      eventUrl: order.landing_page || request.url,
      match: {
        email: order.email || undefined,
        external_id: order.order_number || undefined,
        phone_number: order.mobile || undefined,
      },
      payload: buildTikTokRegistrationPayload({
        description: order.product_detail || "",
        eventId: order.tiktok_event_id || undefined,
        orderId: order.order_number || undefined,
        price: order.price || "0",
        productId: order.protocol_key || "",
        productName: order.product_name || "",
        quantity: order.product_quantity || "0",
      }),
      userAgent: request.headers.get("user-agent"),
    });

    console.info("TikTok lead event sent", {
      event: "Lead",
      orderNumber: order.order_number,
      testEventCode: order.tt_test_event_code || null,
      trackingResult,
    });
    await appendTikTokOrderEvent(supabase, {
      eventId,
      eventName: "Lead",
      orderNumber: order.order_number || "",
      payload: trackingResult,
      status: "sent",
      testEventCode: order.tt_test_event_code || null,
    });
    await persistTikTokOrderStatus(supabase, order.order_number || "", {
      event: "Lead",
      status: "sent",
    });
    return { ok: true as const };
  } catch (trackingError) {
    console.error("TikTok lead event failed", trackingError);
    await appendTikTokOrderEvent(supabase, {
      error: trackingError instanceof Error ? trackingError.message : "Unknown TikTok lead failure",
      eventId,
      eventName: "Lead",
      orderNumber: order.order_number || "",
      status: "failed",
      testEventCode: order.tt_test_event_code || null,
    });
    await persistTikTokOrderStatus(supabase, order.order_number || "", {
      error: trackingError instanceof Error ? trackingError.message : "Unknown TikTok lead failure",
      event: "Lead",
      status: "failed",
    });
    return { error: "Could not resend TikTok lead event.", ok: false as const };
  }
}

async function sendPurchaseForOrder(
  request: Request,
  supabase: ReturnType<typeof createServerSupabaseClient>,
  order: Record<string, string | null>,
  status: string,
) {
  const eventId = `${order.order_number}-${status}`;

  try {
    const trackingResult = await sendTikTokServerEvent({
      context: buildTrackingContext(order),
      event: "Purchase",
      eventId,
      eventUrl: order.landing_page || request.url,
      match: {
        email: order.email || undefined,
        external_id: order.order_number || undefined,
        phone_number: order.mobile || undefined,
      },
      payload: buildTikTokEventPayload({
        description: order.product_detail || "",
        eventId,
        orderId: order.order_number || undefined,
        paymentType: order.payment_method || undefined,
        price: order.price || "0",
        productId: order.protocol_key || "",
        productName: order.product_name || "",
        quantity: order.product_quantity || "0",
      }),
      userAgent: request.headers.get("user-agent"),
    });

    console.info("TikTok purchase event sent", {
      event: "Purchase",
      orderNumber: order.order_number,
      status,
      testEventCode: order.tt_test_event_code || null,
      trackingResult,
    });
    await appendTikTokOrderEvent(supabase, {
      eventId,
      eventName: "Purchase",
      orderNumber: order.order_number || "",
      payload: trackingResult,
      status: "sent",
      testEventCode: order.tt_test_event_code || null,
    });
    await persistTikTokOrderStatus(supabase, order.order_number || "", {
      event: "Purchase",
      status: "sent",
    });
    return { ok: true as const };
  } catch (trackingError) {
    console.error("TikTok purchase event failed", trackingError);
    await appendTikTokOrderEvent(supabase, {
      error:
        trackingError instanceof Error ? trackingError.message : "Unknown TikTok purchase failure",
      eventId,
      eventName: "Purchase",
      orderNumber: order.order_number || "",
      status: "failed",
      testEventCode: order.tt_test_event_code || null,
    });
    await persistTikTokOrderStatus(supabase, order.order_number || "", {
      error:
        trackingError instanceof Error ? trackingError.message : "Unknown TikTok purchase failure",
      event: "Purchase",
      status: "failed",
    });
    return { error: "Could not resend TikTok purchase event.", ok: false as const };
  }
}

async function sendRefundForOrder(
  request: Request,
  supabase: ReturnType<typeof createServerSupabaseClient>,
  order: Record<string, string | null>,
) {
  const eventId = `${order.order_number}-cancelled`;

  try {
    const trackingResult = await sendTikTokServerEvent({
      context: buildTrackingContext(order),
      event: "Refund",
      eventId,
      eventUrl: order.landing_page || request.url,
      match: {
        email: order.email || undefined,
        external_id: order.order_number || undefined,
        phone_number: order.mobile || undefined,
      },
      payload: {
        ...buildTikTokEventPayload({
          description: order.product_detail || "",
          eventId,
          orderId: order.order_number || undefined,
          paymentType: order.payment_method || undefined,
          price: order.price || "0",
          productId: order.protocol_key || "",
          productName: order.product_name || "",
          quantity: order.product_quantity || "0",
        }),
      },
      userAgent: request.headers.get("user-agent"),
    });

    console.info("TikTok refund event sent", {
      event: "Refund",
      orderNumber: order.order_number,
      status: order.status,
      testEventCode: order.tt_test_event_code || null,
      trackingResult,
    });
    await appendTikTokOrderEvent(supabase, {
      eventId,
      eventName: "Refund",
      orderNumber: order.order_number || "",
      payload: trackingResult,
      status: "sent",
      testEventCode: order.tt_test_event_code || null,
    });
    await persistTikTokOrderStatus(supabase, order.order_number || "", {
      event: "Refund",
      status: "sent",
    });
    return { ok: true as const };
  } catch (trackingError) {
    console.error("TikTok refund event failed", trackingError);
    await appendTikTokOrderEvent(supabase, {
      error: trackingError instanceof Error ? trackingError.message : "Unknown TikTok refund failure",
      eventId,
      eventName: "Refund",
      orderNumber: order.order_number || "",
      status: "failed",
      testEventCode: order.tt_test_event_code || null,
    });
    await persistTikTokOrderStatus(supabase, order.order_number || "", {
      error: trackingError instanceof Error ? trackingError.message : "Unknown TikTok refund failure",
      event: "Refund",
      status: "failed",
    });
    return { error: "Could not send TikTok refund event.", ok: false as const };
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { orderNumber: string } },
) {
  if (!isOrderAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: UpdateOrderStatusPayload;

  try {
    payload = (await request.json()) as UpdateOrderStatusPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload.status || !isOrderStatus(payload.status)) {
    if (!payload.resendEvent) {
      return NextResponse.json({ error: "A valid order status is required." }, { status: 400 });
    }
  }

  const supabase = createServerSupabaseClient();
  const loadOrder = () =>
    supabase.from("orders").select("*").eq("order_number", params.orderNumber).maybeSingle();

  const existingOrderResult = await loadOrder();

  if (existingOrderResult.error) {
    console.error("Order load failed before update", existingOrderResult.error);
    return NextResponse.json({ error: "Could not load order." }, { status: 500 });
  }

  if (!existingOrderResult.data) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  const previousOrder = existingOrderResult.data;
  let data;
  let error;

  if (payload.status) {
    ({ data, error } = await supabase
      .from("orders")
      .update({
        status: payload.status,
      })
      .eq("order_number", params.orderNumber)
      .select("*")
      .maybeSingle());
  } else {
    ({ data, error } = await loadOrder());
  }

  if (error) {
    console.error("Order status update failed", error);
    return NextResponse.json({ error: "Could not update order status." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  if (payload.resendEvent === "Lead") {
    const resendResult = await sendLeadForOrder(request, supabase, data);

    if (!resendResult.ok) {
      return NextResponse.json({ error: resendResult.error }, { status: 500 });
    }
  }

  if (payload.resendEvent === "Purchase") {
    const purchaseStatus = data.status === "paid" ? data.status : null;

    if (!purchaseStatus) {
      return NextResponse.json(
        { error: "Purchase can only be resent for paid orders." },
        { status: 400 },
      );
    }

    const resendResult = await sendPurchaseForOrder(request, supabase, data, purchaseStatus);

    if (!resendResult.ok) {
      return NextResponse.json({ error: resendResult.error }, { status: 500 });
    }
  }

  if (payload.resendEvent === "Refund") {
    if (data.status !== "cancelled") {
      return NextResponse.json(
        { error: "Refund can only be resent for cancelled orders." },
        { status: 400 },
      );
    }

    if (!data.tiktok_purchase_sent_at) {
      return NextResponse.json(
        { error: "Refund can only be resent after a purchase event was sent." },
        { status: 400 },
      );
    }

    const resendResult = await sendRefundForOrder(request, supabase, data);

    if (!resendResult.ok) {
      return NextResponse.json({ error: resendResult.error }, { status: 500 });
    }
  }

  if (payload.status === "paid") {
    await sendPurchaseForOrder(request, supabase, data, payload.status);
  }

  const shouldSendRefundOnCancellation =
    payload.status === "cancelled" && Boolean(previousOrder.tiktok_purchase_sent_at);

  if (shouldSendRefundOnCancellation) {
    await sendRefundForOrder(request, supabase, data);
  }

  const latestOrder =
    payload.resendEvent ||
    payload.status === "paid" ||
    shouldSendRefundOnCancellation
      ? (await loadOrder()).data || data
      : data;

  return NextResponse.json({ ok: true, order: latestOrder });
}
