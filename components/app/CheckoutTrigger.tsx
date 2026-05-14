"use client";

import type { MouseEvent, ReactNode } from "react";

import { getTrackingWindow } from "@/lib/browser-window";
import {
  getProtocolSelection,
  getTrackingProductId,
  type ProtocolKey,
  type TrialVariantKey,
} from "@/lib/checkout";
import { buildTikTokEventPayload, createEventId } from "@/lib/tiktok";

type CheckoutTriggerProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  protocolKey: ProtocolKey;
  variantKey?: TrialVariantKey;
};

export default function CheckoutTrigger({
  children,
  className,
  href = "#plans",
  protocolKey,
  variantKey,
}: CheckoutTriggerProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const selectedProtocol = getProtocolSelection(protocolKey, variantKey);

    getTrackingWindow().gutguardTikTokTrack?.(
      "ViewContent",
      buildTikTokEventPayload({
        description: selectedProtocol.detail,
        eventId: createEventId("view-content"),
        price: selectedProtocol.price,
        productId: getTrackingProductId(protocolKey, variantKey),
        productName: selectedProtocol.displayName,
        quantity: selectedProtocol.quantity,
      }),
    );

    window.dispatchEvent(
      new CustomEvent("gutguard:open-checkout", {
        detail: { protocolKey, variantKey },
      }),
    );
  }

  return (
    <a className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
