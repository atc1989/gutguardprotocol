import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";

import { protocolCatalog } from "@/lib/checkout";
import { isOrderAdminAuthorized } from "@/lib/order-admin";
import { buildOrderNumber, isOrderStatus, isPaymentMethod, isProtocolKey } from "@/lib/orders";
import type { OrderPayload } from "@/lib/orders";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  buildTikTokRegistrationPayload,
  sendTikTokServerEvent,
} from "@/lib/tiktok-server";
import { createEventId } from "@/lib/tiktok";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasRequiredContactFields(payload: Partial<OrderPayload>) {
  return (
    payload.name?.trim() &&
    payload.email?.trim() &&
    payload.mobile?.trim() &&
    payload.street?.trim() &&
    payload.city?.trim() &&
    payload.province?.trim() &&
    payload.region?.trim()
  );
}

function getOrderValidationSnapshot(payload: Partial<OrderPayload>) {
  return {
    city: Boolean(payload.city?.trim()),
    email: {
      present: Boolean(payload.email?.trim()),
      valid: Boolean(payload.email?.trim() && isValidEmail(payload.email.trim().toLowerCase())),
    },
    mobile: Boolean(payload.mobile?.trim()),
    name: Boolean(payload.name?.trim()),
    paymentMethod: payload.paymentMethod || null,
    productProtocol: payload.protocolKey || null,
    province: Boolean(payload.province?.trim()),
    region: Boolean(payload.region?.trim()),
    street: Boolean(payload.street?.trim()),
    zip: Boolean(payload.zip?.trim()),
  };
}

function getUserIpAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }

  return request.headers.get("x-real-ip");
}

function toNullable(value?: string | null) {
  return value ?? null;
}

async function insertOrderRecord(
  supabase: SupabaseClient,
  insertValues: Record<string, string | null>,
) {
  const initialInsert = await supabase.from("orders").insert(insertValues);

  if (!initialInsert.error) {
    return initialInsert;
  }

  const isSchemaMismatch =
    initialInsert.error.code === "42703" ||
    initialInsert.error.code === "PGRST204" ||
    /column/i.test(initialInsert.error.message);

  if (!isSchemaMismatch) {
    return initialInsert;
  }

  const {
    landing_page,
    tt_test_event_code,
    tiktok_event_id,
    ttclid,
    ttp,
    utm_campaign,
    utm_content,
    utm_medium,
    utm_source,
    utm_term,
    ...fallbackValues
  } = insertValues;

  void landing_page;
  void tt_test_event_code;
  void tiktok_event_id;
  void ttclid;
  void ttp;
  void utm_campaign;
  void utm_content;
  void utm_medium;
  void utm_source;
  void utm_term;

  return supabase.from("orders").insert(fallbackValues);
}

export async function GET(request: Request) {
  if (!isOrderAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const rawStatus = searchParams.get("status")?.trim() || "";
  const search = searchParams.get("search")?.trim() || "";
  const supabase = createServerSupabaseClient();

  let query = supabase
    .from("orders")
    .select(
      "id, order_number, protocol_key, product_name, price, customer_name, email, mobile, payment_method, status, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (rawStatus && rawStatus !== "all") {
    if (!isOrderStatus(rawStatus)) {
      return NextResponse.json({ error: "Invalid status filter." }, { status: 400 });
    }

    query = query.eq("status", rawStatus);
  }

  if (search) {
    query = query.or(
      [
        `order_number.ilike.%${search}%`,
        `email.ilike.%${search}%`,
        `customer_name.ilike.%${search}%`,
      ].join(","),
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Order list failed", error);
    return NextResponse.json({ error: "Could not load orders." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, orders: data });
}

export async function POST(request: Request) {
  let payload: Partial<OrderPayload>;

  try {
    payload = (await request.json()) as Partial<OrderPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload.protocolKey || !isProtocolKey(payload.protocolKey)) {
    return NextResponse.json({ error: "A valid protocol is required." }, { status: 400 });
  }

  if (!payload.paymentMethod || !isPaymentMethod(payload.paymentMethod)) {
    return NextResponse.json({ error: "A valid payment method is required." }, { status: 400 });
  }

  const email = payload.email?.trim().toLowerCase();

  if (!email || !isValidEmail(email) || !hasRequiredContactFields(payload)) {
    console.error("Order validation failed", getOrderValidationSnapshot(payload));
    return NextResponse.json({ error: "Missing required order details." }, { status: 400 });
  }

  const protocol = protocolCatalog[payload.protocolKey];
  const supabase = createServerSupabaseClient();
  const { data: existingOrder, error: lookupError } = await supabase
    .from("orders")
    .select("order_number")
    .eq("email", email)
    .eq("protocol_key", payload.protocolKey)
    .eq("status", "pending")
    .maybeSingle();

  if (lookupError) {
    console.error("Order lookup failed", lookupError);
    return NextResponse.json({ error: "Could not save your order." }, { status: 500 });
  }

  if (existingOrder?.order_number) {
    return NextResponse.json({
      duplicate: true,
      ok: true,
      orderNumber: existingOrder.order_number,
    });
  }

  const orderNumber = buildOrderNumber(payload.protocolKey);
  const tracking = payload.tracking;
  const insertValues = {
    city: toNullable(payload.city?.trim()),
    customer_name: toNullable(payload.name?.trim()),
    email,
    landing_page: toNullable(tracking?.landingPage),
    mobile: toNullable(payload.mobile?.trim()),
    order_number: orderNumber,
    payment_method: payload.paymentMethod,
    price: protocol.price,
    product_detail: protocol.detail,
    product_duration: protocol.duration,
    product_name: protocol.displayName,
    product_quantity: protocol.quantity,
    product_scan_line: protocol.scanLine,
    protocol_key: payload.protocolKey,
    province: toNullable(payload.province?.trim()),
    region: toNullable(payload.region?.trim()),
    status: "pending",
    street: toNullable(payload.street?.trim()),
    tt_test_event_code: toNullable(tracking?.testEventCode),
    tiktok_event_id: toNullable(payload.tiktokEventId),
    ttclid: toNullable(tracking?.ttclid),
    ttp: toNullable(tracking?.ttp),
    utm_campaign: toNullable(tracking?.utmCampaign),
    utm_content: toNullable(tracking?.utmContent),
    utm_medium: toNullable(tracking?.utmMedium),
    utm_source: toNullable(tracking?.utmSource),
    utm_term: toNullable(tracking?.utmTerm),
    zip: toNullable(payload.zip?.trim()),
  } satisfies Record<string, string | null>;

  const { error } = await insertOrderRecord(supabase, insertValues);

  if (error) {
    console.error("Order insert failed", error);
    return NextResponse.json({ error: "Could not save your order." }, { status: 500 });
  }

  try {
    const trackingResult = await sendTikTokServerEvent({
      context: tracking,
      event: "Lead",
      eventId: payload.tiktokEventId || createEventId("submit-form"),
      eventUrl: tracking?.landingPage || request.url,
      match: {
        email,
        external_id: orderNumber,
        phone_number: payload.mobile,
      },
      payload: buildTikTokRegistrationPayload({
        description: protocol.detail,
        eventId: payload.tiktokEventId || undefined,
        orderId: orderNumber,
        price: protocol.price,
        productId: payload.protocolKey,
        productName: protocol.displayName,
        quantity: protocol.quantity,
      }),
      userAgent: request.headers.get("user-agent"),
      userIp: getUserIpAddress(request),
    });

    console.info("TikTok lead event sent", {
      event: "Lead",
      orderNumber,
      testEventCode: tracking?.testEventCode || null,
      trackingResult,
    });
  } catch (error) {
    console.error("TikTok submit event failed", error);
  }

  return NextResponse.json({ ok: true, orderNumber });
}
