import { protocolCatalog } from "@/lib/checkout";
import type { ProtocolKey } from "@/lib/checkout";
import type { TrackingContext } from "@/lib/tiktok";

export type PaymentMethod = "bank" | "card" | "cod" | "gcash" | "maya";
export type OrderStatus = "cancelled" | "completed" | "paid" | "pending" | "shipped";

export type OrderPayload = {
  city: string;
  email: string;
  mobile: string;
  name: string;
  paymentMethod: PaymentMethod;
  productDetail: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  productScanLine: string;
  productDuration: string;
  protocolKey: ProtocolKey;
  province: string;
  region: string;
  street: string;
  testEventCode?: string;
  tiktokEventId?: string;
  tracking?: TrackingContext;
  zip: string;
};

export const orderStatuses = [
  "pending",
  "paid",
  "shipped",
  "completed",
  "cancelled",
] as const;

export function isProtocolKey(value: string): value is ProtocolKey {
  return value in protocolCatalog;
}

export function isPaymentMethod(value: string): value is PaymentMethod {
  return ["bank", "card", "cod", "gcash", "maya"].includes(value);
}

export function isOrderStatus(value: string): value is OrderStatus {
  return orderStatuses.includes(value as OrderStatus);
}

export function buildOrderNumber(protocolKey: ProtocolKey) {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const randomSuffix = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `GG-${stamp}-${protocolKey.toUpperCase()}-${randomSuffix}`;
}
