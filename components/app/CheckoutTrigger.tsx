"use client";

import type { MouseEvent, ReactNode } from "react";

import type { ProtocolKey } from "@/lib/checkout";

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
