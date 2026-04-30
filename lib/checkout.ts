export type ProtocolKey = "trial" | "start" | "grow" | "power";

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

export const protocolCatalog: Record<ProtocolKey, ProtocolDetails> = {
  trial: {
    ctaLabel: "Enroll: Trial",
    detail: "10 capsules · 5-day supply · 1 BioScan",
    displayName: "Trial Protocol",
    duration: "5 days",
    emoji: "🌱",
    includes: [
      "1 BioScan (baseline)",
      "Doctor review",
      "Starter protocol access",
      "Free nationwide shipping",
    ],
    perCap: "₱130",
    price: "₱1,290",
    quantity: "10 capsules",
    scanLine: "1 included",
  },
  start: {
    ctaLabel: "Enroll Now",
    detail: "40 capsules · 15-day supply · 1 BioScan",
    displayName: "Start Protocol",
    duration: "15 days",
    emoji: "⚡",
    includes: [
      "1 BioScan (baseline)",
      "Doctor review & assignment",
      "Patient portal access",
      "Free nationwide shipping",
    ],
    perCap: "₱115",
    price: "₱4,599",
    quantity: "40 capsules",
    scanLine: "1 included",
  },
  grow: {
    ctaLabel: "Enroll Now",
    detail: "120 capsules · 30-day supply · 3 BioScans",
    displayName: "Grow Protocol",
    duration: "30 days",
    emoji: "🔥",
    includes: [
      "3 BioScans (Day 0, 15, 30)",
      "Assigned attending doctor",
      "Full patient portal access",
      "Telegram AI assistant",
      "Free nationwide shipping",
    ],
    perCap: "₱103",
    price: "₱12,399",
    quantity: "120 capsules",
    scanLine: "3 included",
  },
  power: {
    ctaLabel: "Enroll Now",
    detail: "400 capsules · 90-day supply · 3 BioScans",
    displayName: "Power Protocol",
    duration: "90 days",
    emoji: "👑",
    includes: [
      "3 BioScans (Day 0, 30, 90)",
      "Priority doctor response",
      "Full 90-day intervention",
      "Free nationwide shipping",
    ],
    perCap: "₱87",
    price: "₱34,999",
    quantity: "400 capsules",
    scanLine: "3 included",
  },
};
