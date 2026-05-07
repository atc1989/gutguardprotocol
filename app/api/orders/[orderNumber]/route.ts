import { NextResponse } from "next/server";

import { isOrderAdminAuthorized } from "@/lib/order-admin";
import { isOrderStatus } from "@/lib/orders";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { buildTikTokEventPayload, sendTikTokServerEvent } from "@/lib/tiktok-server";

type UpdateOrderStatusPayload = { status?: string };

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
    return NextResponse.json({ error: "A valid order status is required." }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .update({
      status: payload.status,
    })
    .eq("order_number", params.orderNumber)
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("Order status update failed", error);
    return NextResponse.json({ error: "Could not update order status." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  if (payload.status === "paid" || payload.status === "completed") {
    try {
      const trackingResult = await sendTikTokServerEvent({
        context: {
          landingPage: data.landing_page || undefined,
          testEventCode: data.tt_test_event_code || undefined,
          ttclid: data.ttclid || undefined,
          ttp: data.ttp || undefined,
          utmCampaign: data.utm_campaign || undefined,
          utmContent: data.utm_content || undefined,
          utmMedium: data.utm_medium || undefined,
          utmSource: data.utm_source || undefined,
          utmTerm: data.utm_term || undefined,
        },
        event: "Purchase",
        eventId: `${data.order_number}-${payload.status}`,
        match: {
          email: data.email,
          external_id: data.order_number,
          phone_number: data.mobile,
        },
        payload: buildTikTokEventPayload({
          description: data.product_detail,
          eventId: `${data.order_number}-${payload.status}`,
          orderId: data.order_number,
          paymentType: data.payment_method,
          price: data.price,
          productId: data.protocol_key,
          productName: data.product_name,
          quantity: data.product_quantity,
        }),
        userAgent: request.headers.get("user-agent"),
      });

      console.info("TikTok purchase event sent", {
        event: "Purchase",
        orderNumber: data.order_number,
        status: payload.status,
        testEventCode: data.tt_test_event_code || null,
        trackingResult,
      });
    } catch (trackingError) {
      console.error("TikTok purchase event failed", trackingError);
    }
  }

  return NextResponse.json({ ok: true, order: data });
}
