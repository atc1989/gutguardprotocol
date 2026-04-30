"use client";

import { useEffect, useMemo, useState } from "react";

import { protocolCatalog } from "@/lib/checkout";
import type { ProtocolKey } from "@/lib/checkout";

type CheckoutStep = 1 | 2 | 3 | 4 | 5;
type PaymentMethod = "bank" | "card" | "cod" | "gcash" | "maya";

type ContactFields = {
  city: string;
  email: string;
  mobile: string;
  name: string;
  province: string;
  region: string;
  street: string;
  zip: string;
};

const defaultContactFields: ContactFields = {
  city: "",
  email: "",
  mobile: "",
  name: "",
  province: "",
  region: "Region XII - SOCCSKSARGEN",
  street: "",
  zip: "",
};

const stepLabels = ["Cart", "Contact", "Payment", "Review", "Done"] as const;

export default function CheckoutModal() {
  const [activeProtocolKey, setActiveProtocolKey] = useState<ProtocolKey>("grow");
  const [contactFields, setContactFields] = useState<ContactFields>(defaultContactFields);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gcash");
  const [step, setStep] = useState<CheckoutStep>(1);

  const activeProtocol = protocolCatalog[activeProtocolKey];

  const orderNumber = useMemo(() => {
    const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    return `GG-${stamp}-${activeProtocolKey.toUpperCase()}`;
  }, [activeProtocolKey]);

  useEffect(() => {
    function handleOpen(event: Event) {
      const customEvent = event as CustomEvent<{ protocolKey?: ProtocolKey }>;
      const nextProtocol = customEvent.detail?.protocolKey ?? "grow";
      setActiveProtocolKey(nextProtocol);
      setContactFields(defaultContactFields);
      setPaymentMethod("gcash");
      setStep(1);
      setIsOpen(true);
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("gutguard:open-checkout", handleOpen as EventListener);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("gutguard:open-checkout", handleOpen as EventListener);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  function updateField(field: keyof ContactFields, value: string) {
    setContactFields((current) => ({ ...current, [field]: value }));
  }

  function validateContactFields() {
    return (
      contactFields.name.trim() &&
      contactFields.email.trim() &&
      contactFields.mobile.trim() &&
      contactFields.street.trim() &&
      contactFields.city.trim() &&
      contactFields.province.trim() &&
      contactFields.region.trim()
    );
  }

  function nextStep() {
    if (step === 2 && !validateContactFields()) {
      return;
    }

    if (step === 4) {
      setStep(5);
      return;
    }

    if (step < 5) {
      setStep((current) => (current + 1) as CheckoutStep);
    }
  }

  function previousStep() {
    if (step > 1 && step < 5) {
      setStep((current) => (current - 1) as CheckoutStep);
    }
  }

  const paymentLabel =
    paymentMethod === "gcash"
      ? "GCash"
      : paymentMethod === "maya"
        ? "Maya"
        : paymentMethod === "bank"
          ? "Bank Transfer"
          : paymentMethod === "card"
            ? "Credit / Debit Card"
            : "Cash on Delivery";

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby="checkout-title"
      aria-modal="true"
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
      role="dialog"
    >
      <button
        aria-label="Close checkout"
        className="absolute inset-0"
        onClick={closeModal}
        type="button"
      />

      <div className="relative z-[1] flex max-h-[96dvh] w-full max-w-[520px] flex-col overflow-hidden rounded-t-[24px] bg-[#f5f4f2] shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:max-h-[90dvh] sm:rounded-[24px]">
        <div className="border-b border-black/10 px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1">
              {stepLabels.map((label, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === step;
                const isComplete = stepNumber < step;

                return (
                  <div className="flex items-center gap-2" key={label}>
                    <div className="flex items-center gap-2">
                      <div
                        className={[
                          "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                          isActive
                            ? "bg-[#0305C6] text-white"
                            : isComplete
                              ? "bg-[#dbe2ff] text-[#0305C6]"
                              : "bg-white text-[#6B6B71]",
                        ].join(" ")}
                      >
                        {stepNumber}
                      </div>
                      <span className="text-xs font-medium text-[#6B6B71]">{label}</span>
                    </div>
                    {stepNumber < stepLabels.length ? (
                      <div className="h-px w-4 bg-black/10" />
                    ) : null}
                  </div>
                );
              })}
            </div>

            <button
              aria-label="Close checkout"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[#111113]"
              onClick={closeModal}
              type="button"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-[28px] font-bold text-[#111113]" id="checkout-title">
                  Your order
                </h2>
                <p className="mt-1 text-sm text-[#6B6B71]">
                  Review your selected protocol before continuing.
                </p>
              </div>

              <div className="flex items-start gap-4 rounded-[18px] border border-black/10 bg-white p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#eef2ff] text-2xl">
                  {activeProtocol.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-lg font-semibold text-[#111113]">{activeProtocol.displayName}</div>
                  <div className="mt-1 text-sm text-[#6B6B71]">{activeProtocol.detail}</div>
                </div>
                <div className="text-base font-semibold text-[#111113]">{activeProtocol.price}</div>
              </div>

              <div className="rounded-[18px] border border-black/10 bg-white p-4">
                <div className="flex items-end gap-1">
                  <span className="text-[32px] font-bold text-[#111113]">{activeProtocol.perCap}</span>
                  <span className="pb-1 text-sm text-[#6B6B71]">/cap</span>
                </div>
                <div className="mt-1 text-sm text-[#6B6B71]">{activeProtocol.duration}</div>

                <div className="mt-4 space-y-2 text-sm text-[#44444A]">
                  <div className="flex items-center justify-between">
                    <span>Capsules</span>
                    <span>{activeProtocol.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Protocol duration</span>
                    <span>{activeProtocol.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lab scans</span>
                    <span>{activeProtocol.scanLine}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>Free nationwide</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Doctor review</span>
                    <span>Included</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/10 pt-2 font-semibold text-[#111113]">
                    <span>Total</span>
                    <span>{activeProtocol.price}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] border border-black/10 bg-white p-4">
                <div className="space-y-2">
                  {activeProtocol.includes.map((item) => (
                    <div className="flex gap-2 text-sm text-[#44444A]" key={item}>
                      <span className="text-[#047857]">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-[28px] font-bold text-[#111113]">Delivery details</h2>
                <p className="mt-1 text-sm text-[#6B6B71]">
                  We need this to ship your protocol and activate your patient portal.
                </p>
              </div>

              <div className="grid gap-4">
                <input
                  className="min-h-[48px] rounded-[14px] border border-black/10 bg-white px-4 text-sm text-[#111113]"
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Full name"
                  value={contactFields.name}
                />
                <input
                  className="min-h-[48px] rounded-[14px] border border-black/10 bg-white px-4 text-sm text-[#111113]"
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Email address"
                  type="email"
                  value={contactFields.email}
                />
                <input
                  className="min-h-[48px] rounded-[14px] border border-black/10 bg-white px-4 text-sm text-[#111113]"
                  onChange={(event) => updateField("mobile", event.target.value)}
                  placeholder="Philippine mobile number"
                  value={contactFields.mobile}
                />
                <input
                  className="min-h-[48px] rounded-[14px] border border-black/10 bg-white px-4 text-sm text-[#111113]"
                  onChange={(event) => updateField("street", event.target.value)}
                  placeholder="Street address"
                  value={contactFields.street}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    className="min-h-[48px] rounded-[14px] border border-black/10 bg-white px-4 text-sm text-[#111113]"
                    onChange={(event) => updateField("city", event.target.value)}
                    placeholder="City / Municipality"
                    value={contactFields.city}
                  />
                  <input
                    className="min-h-[48px] rounded-[14px] border border-black/10 bg-white px-4 text-sm text-[#111113]"
                    onChange={(event) => updateField("province", event.target.value)}
                    placeholder="Province"
                    value={contactFields.province}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    className="min-h-[48px] rounded-[14px] border border-black/10 bg-white px-4 text-sm text-[#111113]"
                    onChange={(event) => updateField("zip", event.target.value)}
                    placeholder="ZIP code"
                    value={contactFields.zip}
                  />
                  <select
                    className="min-h-[48px] rounded-[14px] border border-black/10 bg-white px-4 text-sm text-[#111113]"
                    onChange={(event) => updateField("region", event.target.value)}
                    value={contactFields.region}
                  >
                    <option value="NCR (Metro Manila)">NCR (Metro Manila)</option>
                    <option value="Region III - Central Luzon">Region III - Central Luzon</option>
                    <option value="Region IV-A - CALABARZON">Region IV-A - CALABARZON</option>
                    <option value="Region VII - Central Visayas">Region VII - Central Visayas</option>
                    <option value="Region XI - Davao">Region XI - Davao</option>
                    <option value="Region XII - SOCCSKSARGEN">Region XII - SOCCSKSARGEN</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-[28px] font-bold text-[#111113]">Choose payment</h2>
                <p className="mt-1 text-sm text-[#6B6B71]">
                  Select your preferred payment method.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { key: "gcash", label: "GCash", detail: "Instant transfer · Recommended" },
                  { key: "maya", label: "Maya (PayMaya)", detail: "Instant transfer" },
                  { key: "bank", label: "Bank Transfer", detail: "BDO, BPI, UnionBank, Metrobank" },
                  { key: "card", label: "Credit / Debit Card", detail: "Visa, Mastercard" },
                  { key: "cod", label: "Cash on Delivery", detail: "Metro Manila only" },
                ].map((method) => (
                  <label
                    className={[
                      "flex cursor-pointer items-start gap-3 rounded-[14px] border bg-white p-4",
                      paymentMethod === method.key
                        ? "border-[#1A56DB] bg-[#f7f9ff]"
                        : "border-black/10",
                    ].join(" ")}
                    key={method.key}
                  >
                    <input
                      checked={paymentMethod === method.key}
                      className="mt-1"
                      name="payment-method"
                      onChange={() => setPaymentMethod(method.key as PaymentMethod)}
                      type="radio"
                    />
                    <div>
                      <div className="text-sm font-semibold text-[#111113]">{method.label}</div>
                      <div className="text-sm text-[#6B6B71]">{method.detail}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="rounded-[18px] border border-black/10 bg-white p-4 text-sm text-[#44444A]">
                {paymentMethod === "gcash" ? "Send payment to 0917 000 0000 · Account name: GutGuard Philippines" : null}
                {paymentMethod === "maya" ? "Send payment to 0917 000 0000 · Account name: GutGuard Philippines" : null}
                {paymentMethod === "bank" ? "Bank transfer details: BDO, BPI, UnionBank, and Metrobank available after order confirmation." : null}
                {paymentMethod === "card" ? "Card payments are processed after confirmation. You will receive a secure payment link." : null}
                {paymentMethod === "cod" ? "Cash on Delivery is available in Metro Manila only and may include an extra courier fee." : null}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-[28px] font-bold text-[#111113]">Review your order</h2>
                <p className="mt-1 text-sm text-[#6B6B71]">
                  Everything look right? Place your order to activate your BioScan.
                </p>
              </div>

              <div className="rounded-[18px] border border-black/10 bg-white p-4 text-sm text-[#44444A]">
                <div className="flex items-center justify-between font-semibold text-[#111113]">
                  <span>{activeProtocol.displayName}</span>
                  <span>{activeProtocol.price}</span>
                </div>
                <div className="mt-1 text-[#6B6B71]">{activeProtocol.detail}</div>
              </div>

              <div className="rounded-[18px] border border-black/10 bg-white p-4 text-sm text-[#44444A]">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <span>Name</span>
                    <span className="text-right">{contactFields.name || "—"}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span>Email</span>
                    <span className="text-right">{contactFields.email || "—"}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span>Mobile</span>
                    <span className="text-right">{contactFields.mobile || "—"}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span>Address</span>
                    <span className="text-right">
                      {[contactFields.street, contactFields.city, contactFields.province, contactFields.region]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-black/10 pt-2 font-semibold text-[#111113]">
                    <span>Payment</span>
                    <span>{paymentLabel}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-5 text-[#6B6B71]">
                By placing your order you agree to GutGuard&apos;s terms and privacy policy. Your
                BioScan will activate after payment confirmation.
              </p>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="space-y-5 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef2ff] text-3xl">
                🎉
              </div>
              <div>
                <h2 className="text-[28px] font-bold text-[#111113]">Order received!</h2>
                <div className="mt-2 text-sm font-semibold text-[#0305C6]">{orderNumber}</div>
              </div>
              <p className="text-sm leading-6 text-[#6B6B71]">
                Check your email and SMS for order details. Here&apos;s what happens next:
              </p>
              <div className="space-y-3 rounded-[18px] border border-black/10 bg-white p-4 text-left text-sm text-[#44444A]">
                <div>1. Upload your blood results using the activation link we send you.</div>
                <div>2. Dr. Shane reviews your scan and assigns your protocol within 24 hours.</div>
                <div>3. Your GutGuard Protocol ships and tracking is sent via SMS.</div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-black/10 px-5 py-4">
          {step < 5 ? (
            <div className="flex gap-3">
              {step > 1 ? (
                <button
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium text-[#111113]"
                  onClick={previousStep}
                  type="button"
                >
                  Back
                </button>
              ) : null}
              <button
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-[#111113] px-5 text-sm font-semibold text-white"
                onClick={nextStep}
                type="button"
              >
                {step === 4 ? "Place Order" : "Continue"}
              </button>
            </div>
          ) : (
            <button
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#111113] px-5 text-sm font-semibold text-white"
              onClick={closeModal}
              type="button"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
