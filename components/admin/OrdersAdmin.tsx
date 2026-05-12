"use client";

import { useEffect, useState } from "react";

import { orderStatuses } from "@/lib/orders";

type OrderRecord = {
  created_at: string;
  customer_name: string;
  email: string;
  id: string;
  landing_page?: string | null;
  mobile: string;
  order_number: string;
  payment_method: string;
  price: string;
  product_name: string;
  protocol_key: string;
  status: string;
  tiktok_last_error?: string | null;
  tiktok_last_event?: string | null;
  tiktok_last_sent_at?: string | null;
  tiktok_last_status?: string | null;
  tiktok_event_id?: string | null;
  tiktok_lead_sent_at?: string | null;
  tiktok_purchase_sent_at?: string | null;
  tt_test_event_code?: string | null;
  ttclid?: string | null;
  ttp?: string | null;
  tiktok_events?: TikTokEventRecord[];
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_medium?: string | null;
  utm_source?: string | null;
  utm_term?: string | null;
};

type TikTokEventRecord = {
  created_at: string;
  error_text?: string | null;
  event_id?: string | null;
  event_name: string;
  id: string;
  order_number: string;
  payload_json?: Record<string, unknown> | null;
  send_status: "failed" | "sent";
  sent_at: string;
  test_event_code?: string | null;
};

type OrdersResponse = {
  error?: string;
  orders?: OrderRecord[];
};

type UpdateOrderResponse = {
  error?: string;
  order?: OrderRecord;
};

const filterOptions = ["all", ...orderStatuses] as const;
const tiktokFilterOptions = ["all", "sent", "failed"] as const;

function buildTikTokFlags(order: OrderRecord) {
  return [
    order.tt_test_event_code ? `test ${order.tt_test_event_code}` : null,
    order.tiktok_event_id ? "event id" : null,
    order.ttclid ? "ttclid" : null,
    order.ttp ? "ttp" : null,
    order.utm_source ? `utm ${order.utm_source}` : null,
  ].filter(Boolean) as string[];
}

function formatSentAt(value?: string | null) {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleString();
}

function getTikTokStatusClasses(status?: string | null) {
  if (status === "sent") {
    return "border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]";
  }

  if (status === "failed") {
    return "border-[#fecaca] bg-[#fff1f2] text-[#b42318]";
  }

  return "border-black/10 bg-[#f4f4f5] text-[#44444A]";
}

export default function OrdersAdmin() {
  const [adminToken, setAdminToken] = useState("");
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [expandedOrderNumber, setExpandedOrderNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof filterOptions)[number]>("all");
  const [tiktokStatusFilter, setTikTokStatusFilter] =
    useState<(typeof tiktokFilterOptions)[number]>("all");
  const [successMessage, setSuccessMessage] = useState("");

  async function loadOrders() {
    if (!adminToken.trim()) {
      setErrorMessage("Enter your admin token to load orders.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const params = new URLSearchParams();

      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (tiktokStatusFilter !== "all") {
        params.set("tiktokStatus", tiktokStatusFilter);
      }

      const response = await fetch(`/api/orders?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${adminToken.trim()}`,
        },
      });

      const result = (await response.json()) as OrdersResponse;

      if (!response.ok || !result.orders) {
        setErrorMessage(result.error || "Could not load orders.");
        setOrders([]);
        return;
      }

      setOrders(result.orders);
    } catch {
      setErrorMessage("Could not load orders.");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateOrder(
    orderNumber: string,
    body: { resendEvent?: "Lead" | "Purchase" | "Refund"; status?: string },
  ) {
    if (!adminToken.trim()) {
      setErrorMessage("Enter your admin token to update orders.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`/api/orders/${orderNumber}`, {
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${adminToken.trim()}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
      });

      const result = (await response.json()) as UpdateOrderResponse;

      if (!response.ok) {
        setErrorMessage(result.error || "Could not update order status.");
        return;
      }

      setOrders((current) =>
        current.map((order) =>
          order.order_number === orderNumber
            ? {
                ...order,
                ...(body.status ? { status: body.status } : {}),
                ...(result.order || {}),
              }
            : order,
        ),
      );
      setSuccessMessage(
        body.status
          ? `Updated ${orderNumber} to ${body.status}.`
          : `Resent TikTok ${body.resendEvent?.toLowerCase()} event for ${orderNumber}.`,
      );
    } catch {
      setErrorMessage("Could not update order status.");
    }
  }

  async function copyValue(label: string, value?: string | null) {
    if (!value?.trim()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(label);
      setTimeout(() => setCopiedValue((current) => (current === label ? null : current)), 1500);
    } catch {
      setErrorMessage(`Could not copy ${label}.`);
    }
  }

  useEffect(() => {
    if (!adminToken.trim()) {
      return;
    }

    void loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, tiktokStatusFilter]);

  const lastCopiedEventHistory = copiedValue?.startsWith("event history");

  function formatEventHistoryLabel(orderNumber: string) {
    return `event history ${orderNumber}`;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col gap-3 border-b border-black/10 pb-6">
          <h1 className="text-[32px] font-semibold text-[#111113]">Orders Admin</h1>
          <p className="max-w-2xl text-sm text-[#6B6B71]">
            Load recent orders, filter by status, search by customer or order number, and update
            fulfillment state without touching SQL.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr_160px]">
          <input
            className="min-h-[48px] rounded-[16px] border border-black/10 bg-[#fbfaf7] px-4 text-sm text-[#111113]"
            onChange={(event) => setAdminToken(event.target.value)}
            placeholder="Enter ORDER_ADMIN_TOKEN"
            type="password"
            value={adminToken}
          />
          <input
            className="min-h-[48px] rounded-[16px] border border-black/10 bg-[#fbfaf7] px-4 text-sm text-[#111113]"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search order, email, customer"
            value={search}
          />
          <button
            className="inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-[#111113] px-5 text-sm font-semibold text-white"
            onClick={() => void loadOrders()}
            type="button"
          >
            {isLoading ? "Loading..." : "Load Orders"}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              className={[
                "rounded-full border px-4 py-2 text-sm",
                statusFilter === option
                  ? "border-[#2948ff] bg-[#eef2ff] text-[#2948ff]"
                  : "border-black/10 bg-white text-[#44444A]",
              ].join(" ")}
              key={option}
              onClick={() => setStatusFilter(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tiktokFilterOptions.map((option) => (
            <button
              className={[
                "rounded-full border px-4 py-2 text-sm",
                tiktokStatusFilter === option
                  ? "border-[#111113] bg-[#111113] text-white"
                  : "border-black/10 bg-white text-[#44444A]",
              ].join(" ")}
              key={option}
              onClick={() => setTikTokStatusFilter(option)}
              type="button"
            >
              TikTok {option}
            </button>
          ))}
        </div>

        {errorMessage ? (
          <p className="mt-4 rounded-[16px] border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm text-[#b42318]">
            {errorMessage}
          </p>
        ) : null}

        {successMessage ? (
          <p className="mt-4 rounded-[16px] border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-sm text-[#1d4ed8]">
            {successMessage}
          </p>
        ) : null}

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.08em] text-[#6B6B71]">
                <th className="border-b border-black/10 px-3 py-3">Order</th>
                <th className="border-b border-black/10 px-3 py-3">Customer</th>
                <th className="border-b border-black/10 px-3 py-3">Protocol</th>
                <th className="border-b border-black/10 px-3 py-3">Price</th>
                <th className="border-b border-black/10 px-3 py-3">Status</th>
                <th className="border-b border-black/10 px-3 py-3">TikTok</th>
                <th className="border-b border-black/10 px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((order) => {
                  const tiktokFlags = buildTikTokFlags(order);
                  const isExpanded = expandedOrderNumber === order.order_number;
                  const canResendPurchase = order.status === "paid";
                  const canResendRefund =
                    order.status === "cancelled" && Boolean(order.tiktok_purchase_sent_at);
                  const eventHistory = order.tiktok_events || [];

                  return (
                    <tr className="align-top text-sm text-[#111113]" key={order.id}>
                      <td className="border-b border-black/5 px-3 py-4">
                        <div className="font-semibold">{order.order_number}</div>
                        <div className="mt-1 text-xs text-[#6B6B71]">
                          {new Date(order.created_at).toLocaleString()}
                        </div>
                      </td>
                      <td className="border-b border-black/5 px-3 py-4">
                        <div>{order.customer_name}</div>
                        <div className="mt-1 text-xs text-[#6B6B71]">{order.email}</div>
                        <div className="text-xs text-[#6B6B71]">{order.mobile}</div>
                      </td>
                      <td className="border-b border-black/5 px-3 py-4">
                        <div>{order.product_name}</div>
                        <div className="mt-1 text-xs uppercase text-[#6B6B71]">
                          {order.protocol_key}
                        </div>
                        <div className="text-xs text-[#6B6B71]">{order.payment_method}</div>
                      </td>
                      <td className="border-b border-black/5 px-3 py-4">{order.price}</td>
                      <td className="border-b border-black/5 px-3 py-4">
                        <span className="rounded-full bg-[#f4f4f5] px-3 py-1 text-xs font-semibold uppercase">
                          {order.status}
                        </span>
                      </td>
                      <td className="border-b border-black/5 px-3 py-4">
                        <div className="min-w-[260px] max-w-[340px] space-y-2">
                          {tiktokFlags.length ? (
                            <>
                              <div className="flex flex-wrap gap-2">
                                {tiktokFlags.map((flag) => (
                                  <span
                                    className="rounded-full bg-[#f4f4f5] px-3 py-1 text-[11px] font-medium text-[#44444A]"
                                    key={flag}
                                  >
                                    {flag}
                                  </span>
                                ))}
                                <span
                                  className={[
                                    "rounded-full border px-3 py-1 text-[11px] font-medium",
                                    getTikTokStatusClasses(order.tiktok_last_status),
                                  ].join(" ")}
                                >
                                  {order.tiktok_last_status || "not stored"}
                                </span>
                              </div>
                              <button
                                className="text-xs font-medium text-[#2948ff] underline underline-offset-2"
                                onClick={() =>
                                  setExpandedOrderNumber((current) =>
                                    current === order.order_number ? null : order.order_number,
                                  )
                                }
                                type="button"
                              >
                                {isExpanded ? "Hide debug details" : "Show debug details"}
                              </button>
                              <div className="flex flex-wrap gap-2 pt-1">
                                <button
                                  className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium text-[#44444A]"
                                  onClick={() =>
                                    void updateOrder(order.order_number, { resendEvent: "Lead" })
                                  }
                                  type="button"
                                >
                                  Resend Lead
                                </button>
                                <button
                                  className={[
                                    "rounded-full border px-3 py-1 text-[11px] font-medium",
                                    canResendPurchase
                                      ? "border-black/10 bg-white text-[#44444A]"
                                      : "cursor-not-allowed border-black/5 bg-[#f4f4f5] text-[#9A9AA1]",
                                  ].join(" ")}
                                  disabled={!canResendPurchase}
                                  onClick={() => void updateOrder(order.order_number, { resendEvent: "Purchase" })}
                                  type="button"
                                >
                                  Resend Purchase
                                </button>
                                <button
                                  className={[
                                    "rounded-full border px-3 py-1 text-[11px] font-medium",
                                    canResendRefund
                                      ? "border-black/10 bg-white text-[#44444A]"
                                      : "cursor-not-allowed border-black/5 bg-[#f4f4f5] text-[#9A9AA1]",
                                  ].join(" ")}
                                  disabled={!canResendRefund}
                                  onClick={() => void updateOrder(order.order_number, { resendEvent: "Refund" })}
                                  type="button"
                                >
                                  Resend Refund
                                </button>
                              </div>
                            </>
                          ) : (
                            <span className="text-xs text-[#6B6B71]">No TikTok context stored</span>
                          )}

                          {isExpanded ? (
                            <div className="rounded-[16px] border border-black/10 bg-[#fbfaf7] p-4 text-xs text-[#6B6B71]">
                              <div className="flex items-center justify-between gap-3">
                                <div className="font-semibold text-[#111113]">Debug</div>
                                {copiedValue ? (
                                  <div className="text-[11px] font-medium text-[#166534]">
                                    Copied {lastCopiedEventHistory ? "event history" : copiedValue}
                                  </div>
                                ) : null}
                              </div>
                              <div className="mt-3 space-y-3">
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="font-medium text-[#44444A]">Log search</div>
                                    <button
                                      className="text-[11px] font-medium text-[#2948ff]"
                                      onClick={() => void copyValue("log search", order.order_number)}
                                      type="button"
                                    >
                                      Copy
                                    </button>
                                  </div>
                                  <div className="font-mono text-[11px] text-[#111113]">
                                    {order.order_number}
                                  </div>
                                </div>
                                {order.tt_test_event_code ? (
                                  <div>
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="font-medium text-[#44444A]">Test code</div>
                                      <button
                                        className="text-[11px] font-medium text-[#2948ff]"
                                        onClick={() =>
                                          void copyValue("test code", order.tt_test_event_code)
                                        }
                                        type="button"
                                      >
                                        Copy
                                      </button>
                                    </div>
                                    <div className="font-mono text-[11px] text-[#111113]">
                                      {order.tt_test_event_code}
                                    </div>
                                  </div>
                                ) : null}
                                {order.tiktok_event_id ? (
                                  <div>
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="font-medium text-[#44444A]">Event id</div>
                                      <button
                                        className="text-[11px] font-medium text-[#2948ff]"
                                        onClick={() =>
                                          void copyValue("event id", order.tiktok_event_id)
                                        }
                                        type="button"
                                      >
                                        Copy
                                      </button>
                                    </div>
                                    <div className="break-all font-mono text-[11px] text-[#111113]">
                                      {order.tiktok_event_id}
                                    </div>
                                  </div>
                                ) : null}
                                {order.landing_page ? (
                                  <div>
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="font-medium text-[#44444A]">Landing</div>
                                      <button
                                        className="text-[11px] font-medium text-[#2948ff]"
                                        onClick={() =>
                                          void copyValue("landing url", order.landing_page)
                                        }
                                        type="button"
                                      >
                                        Copy
                                      </button>
                                    </div>
                                    <div className="break-all font-mono text-[11px] text-[#111113]">
                                      {order.landing_page}
                                    </div>
                                  </div>
                                ) : null}
                                <div>
                                  <div className="font-medium text-[#44444A]">Last status</div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span
                                      className={[
                                        "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                                        getTikTokStatusClasses(order.tiktok_last_status),
                                      ].join(" ")}
                                    >
                                      {order.tiktok_last_status || "Not stored"}
                                    </span>
                                    {order.tiktok_last_event ? (
                                      <span className="text-[#111113]">{order.tiktok_last_event}</span>
                                    ) : null}
                                  </div>
                                </div>
                                <div>
                                  <div className="font-medium text-[#44444A]">Lead sent</div>
                                  <div className="text-[#111113]">
                                    {formatSentAt(order.tiktok_lead_sent_at) || "Not stored"}
                                  </div>
                                </div>
                                <div>
                                  <div className="font-medium text-[#44444A]">Purchase sent</div>
                                  <div className="text-[#111113]">
                                    {formatSentAt(order.tiktok_purchase_sent_at) || "Not stored"}
                                  </div>
                                </div>
                                <div>
                                  <div className="font-medium text-[#44444A]">Last send</div>
                                  <div className="text-[#111113]">
                                    {formatSentAt(order.tiktok_last_sent_at) || "Not stored"}
                                  </div>
                                </div>
                                {order.tiktok_last_error ? (
                                  <div>
                                    <div className="font-medium text-[#44444A]">Last error</div>
                                    <div className="break-all text-[#b42318]">
                                      {order.tiktok_last_error}
                                    </div>
                                  </div>
                                ) : null}
                                <div>
                                  <div className="mb-2 flex items-center justify-between gap-2">
                                    <div className="font-medium text-[#44444A]">Recent TikTok events</div>
                                    {eventHistory.length ? (
                                      <button
                                        className="text-[11px] font-medium text-[#2948ff]"
                                        onClick={() =>
                                          void copyValue(
                                            formatEventHistoryLabel(order.order_number),
                                            eventHistory
                                              .map(
                                                (event) =>
                                                  `${event.sent_at} | ${event.event_name} | ${event.send_status} | ${event.event_id || "-"}`,
                                              )
                                              .join("\n"),
                                          )
                                        }
                                        type="button"
                                      >
                                        Copy
                                      </button>
                                    ) : null}
                                  </div>
                                  {eventHistory.length ? (
                                    <div className="space-y-2">
                                      {eventHistory.slice(0, 5).map((event) => (
                                        <div
                                          className="rounded-[12px] border border-black/10 bg-white px-3 py-2"
                                          key={event.id}
                                        >
                                          <div className="flex flex-wrap items-center gap-2">
                                            <span
                                              className={[
                                                "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                                                getTikTokStatusClasses(event.send_status),
                                              ].join(" ")}
                                            >
                                              {event.send_status}
                                            </span>
                                            <span className="text-[#111113]">{event.event_name}</span>
                                            <span className="text-[#6B6B71]">
                                              {formatSentAt(event.sent_at)}
                                            </span>
                                          </div>
                                          {event.event_id ? (
                                            <div className="mt-1 break-all font-mono text-[11px] text-[#6B6B71]">
                                              {event.event_id}
                                            </div>
                                          ) : null}
                                          {event.error_text ? (
                                            <div className="mt-1 break-all text-[11px] text-[#b42318]">
                                              {event.error_text}
                                            </div>
                                          ) : null}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-[#6B6B71]">No event history stored yet</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </td>
                      <td className="border-b border-black/5 px-3 py-4">
                        <div className="flex flex-wrap gap-2">
                          {orderStatuses.map((status) => (
                            <button
                              className={[
                                "rounded-full border px-3 py-1 text-xs",
                                order.status === status
                                  ? "border-[#2948ff] bg-[#eef2ff] text-[#2948ff]"
                                  : "border-black/10 bg-white text-[#44444A]",
                              ].join(" ")}
                              key={status}
                              onClick={() => void updateOrder(order.order_number, { status })}
                              type="button"
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="px-3 py-8 text-sm text-[#6B6B71]" colSpan={7}>
                    {isLoading
                      ? "Loading orders..."
                      : "No orders match the current filter. Enter your admin token and load orders."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
