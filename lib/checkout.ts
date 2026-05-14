export type ProtocolKey = "trial" | "start" | "grow" | "power";
export type TrialVariantKey = "bottle" | "sachet";

export type ProtocolDetails = {
  ctaLabel: string;
  detail: string;
  displayName: string;
  duration: string;
  emoji: string;
  includes: string[];
  perCap: string;
  price: string;
  quantity: string;
  scanLine: string;
};

const trialVariantCatalog: Record<TrialVariantKey, ProtocolDetails> = {
  sachet: {
    ctaLabel: "Enroll: Trial",
    detail: "10 capsules \u00B7 5-day supply \u00B7 1 BioScan",
    displayName: "Trial Protocol - Sachet",
    duration: "5 days",
    emoji: "\uD83C\uDF31",
    includes: [
      "1 BioScan (baseline)",
      "Doctor review",
      "Starter protocol access",
      "Free nationwide shipping",
    ],
    perCap: "\u20B1130",
    price: "\u20B11,290",
    quantity: "10 capsules",
    scanLine: "1 included",
  },
  bottle: {
    ctaLabel: "Enroll: Trial",
    detail: "30 capsules \u00B7 15-day supply \u00B7 1 BioScan",
    displayName: "Trial Protocol - Bottle",
    duration: "15 days",
    emoji: "\uD83C\uDF31",
    includes: [
      "1 BioScan (baseline)",
      "Doctor review",
      "Starter protocol access",
      "Free nationwide shipping",
    ],
    perCap: "\u20B1127",
    price: "\u20B13,800",
    quantity: "30 capsules",
    scanLine: "1 included",
  },
};

export const protocolCatalog: Record<ProtocolKey, ProtocolDetails> = {
  trial: {
    ...trialVariantCatalog.sachet,
    displayName: "Trial Protocol",
  },
  start: {
    ctaLabel: "Enroll Now",
    detail: "40 capsules \u00B7 15-day supply \u00B7 1 BioScan",
    displayName: "Start Protocol",
    duration: "15 days",
    emoji: "\u26A1",
    includes: [
      "1 BioScan (baseline)",
      "Doctor review & assignment",
      "Patient portal access",
      "Free nationwide shipping",
    ],
    perCap: "\u20B1115",
    price: "\u20B14,599",
    quantity: "40 capsules",
    scanLine: "1 included",
  },
  grow: {
    ctaLabel: "Enroll Now",
    detail: "120 capsules \u00B7 30-day supply \u00B7 3 BioScans",
    displayName: "Grow Protocol",
    duration: "30 days",
    emoji: "\uD83D\uDD25",
    includes: [
      "3 BioScans (Day 0, 15, 30)",
      "Assigned attending doctor",
      "Full patient portal access",
      "Telegram AI assistant",
      "Free nationwide shipping",
    ],
    perCap: "\u20B1103",
    price: "\u20B112,399",
    quantity: "120 capsules",
    scanLine: "3 included",
  },
  power: {
    ctaLabel: "Enroll Now",
    detail: "400 capsules \u00B7 90-day supply \u00B7 3 BioScans",
    displayName: "Power Protocol",
    duration: "90 days",
    emoji: "\uD83D\uDC51",
    includes: [
      "3 BioScans (Day 0, 30, 90)",
      "Priority doctor response",
      "Full 90-day intervention",
      "Free nationwide shipping",
    ],
    perCap: "\u20B187",
    price: "\u20B134,999",
    quantity: "400 capsules",
    scanLine: "3 included",
  },
};

export function getProtocolSelection(
  protocolKey: ProtocolKey,
  variantKey?: TrialVariantKey,
): ProtocolDetails {
  if (protocolKey === "trial") {
    return trialVariantCatalog[variantKey ?? "sachet"];
  }

  return protocolCatalog[protocolKey];
}

export function getTrackingProductId(protocolKey: ProtocolKey, variantKey?: TrialVariantKey) {
  return protocolKey === "trial" && variantKey ? `${protocolKey}-${variantKey}` : protocolKey;
}
