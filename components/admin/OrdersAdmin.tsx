"use client";

import { useEffect, useState } from "react";

import { orderStatuses } from "@/lib/orders";

type OrderRecord = {
  created_at: string;
  customer_name: string;
  email: string;
  id: string;
  mobile: string;
  order_number: string;
  payment_method: string;
  price: string;
  product_name: string;
  protocol_key: string;
  status: string;
};

type OrdersResponse = {
  error?: string;
  orders?: OrderRecord[];
};

const filterOptions = ["all", ...orderStatuses] as const;

export default function OrdersAdmin() {
  const [adminToken, setAdminToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof filterOptions)[number]>("all");
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

  async function updateOrderStatus(orderNumber: string, status: string) {
    if (!adminToken.trim()) {
      setErrorMessage("Enter your admin token to update orders.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`/api/orders/${orderNumber}`, {
        body: JSON.stringify({ status }),
        headers: {
          Authorization: `Bearer ${adminToken.trim()}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(result.error || "Could not update order status.");
        return;
      }

      setOrders((current) =>
        current.map((order) =>
          order.order_number === orderNumber ? { ...order, status } : order,
        ),
      );
      setSuccessMessage(`Updated ${orderNumber} to ${status}.`);
    } catch {
      setErrorMessage("Could not update order status.");
    }
  }

  useEffect(() => {
    if (!adminToken.trim()) {
      return;
    }

    void loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

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
                <th className="border-b border-black/10 px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((order) => (
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
                            onClick={() => void updateOrderStatus(order.order_number, status)}
                            type="button"
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-3 py-8 text-sm text-[#6B6B71]" colSpan={6}>
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
