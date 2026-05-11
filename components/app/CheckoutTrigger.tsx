"use client";

import type { MouseEvent, ReactNode } from "react";

import { getTrackingWindow } from "@/lib/browser-window";
import { protocolCatalog, type ProtocolKey } from "@/lib/checkout";
import { buildTikTokEventPayload, createEventId } from "@/lib/tiktok";

type CheckoutTriggerProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  protocolKey: ProtocolKey;
};

export default function CheckoutTrigger({
  children,
  className,
  href = "#plans",
  protocolKey,
}: CheckoutTriggerProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const selectedProtocol = protocolCatalog[protocolKey];

    getTrackingWindow().gutguardTikTokTrack?.(
      "ViewContent",
      buildTikTokEventPayload({
        description: selectedProtocol.detail,
        eventId: createEventId("view-content"),
        price: selectedProtocol.price,
        productId: protocolKey,
        productName: selectedProtocol.displayName,
        quantity: selectedProtocol.quantity,
      }),
    );

    window.dispatchEvent(
      new CustomEvent("gutguard:open-checkout", {
        detail: { protocolKey },
      }),
    );
  }

  return (
    <a className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
