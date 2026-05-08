import type {
  ChipItem,
  ComparisonRowItem,
  DoctorMetricItem,
  FooterBadgeItem,
  FooterColumnItem,
  FaqItem,
  HeroBulletItem,
  JourneyStepItem,
  KnowledgeCardItem,
  KnowledgeTabItem,
  MarkerCardItem,
  NavLinkItem,
  ProtocolCardItem,
  ReviewCardItem,
  ScoreRangeItem,
  ScienceBlurbItem,
  StageCardItem,
  TrustStatItem,
} from "./types";

export const gutGuardNavLinks: NavLinkItem[] = [
  { href: "#journey-anchor", label: "How It Works" },
  { href: "#science-anchor", label: "The Science" },
  { href: "#pricing-anchor", label: "Pricing" },
];

export const heroBullets: HeroBulletItem[] = [
  { label: "Doctor review within 24 hours" },
  { label: "Any Philippine lab accepted" },
  { label: "Free shipping nationwide" },
];

export const trustStats: TrustStatItem[] = [
  {
    value: "68%",
    label: "of Philippine deaths involve chronic disease with inflammatory drivers",
  },
  {
    value: "94%",
    label: "of GutGuard patients (n=127) show measurable GLIIS improvement after one full protocol",
  },
  {
    value: "<24h",
    label: "Doctor review & protocol assigned",
  },
];

export const categoryChips: ChipItem[] = [
  { label: "Inflammation" },
  { label: "Methylation response" },
  { label: "HPA axis" },
  { label: "Neuroinflammation" },
  { label: "Microbiome" },
  { label: "Physician review" },
];

export const journeySteps: JourneyStepItem[] = [
  {
    step: "STEP 01",
    title: "",
    description:
      "Photo or upload. CBC, lipid panel, metabolic panel. Any format. Works with all Philippine labs.",
  },
  {
    step: "STEP 02",
    title: "",
    description:
      "Your Lifestyle Inflammation Score calculated from 8 clinical markers. See exactly which are elevated.",
  },
  {
    step: "STEP 03",
    title: "",
    description:
      "Dr. Shane reviews your scan within 24 hours. Protocol assigned. Portal activates.",
  },
];

export const journeyLabs: ChipItem[] = [
  { label: "Hi-Precision Diagnostics" },
  { label: "MedLab GenSan" },
  { label: "Philippine Red Cross Labs" },
  { label: "LabCorp Philippines" },
  { label: "St. Luke's Medical Labs" },
  { label: "The Medical City" },
  { label: "Makati Medical Center" },
  { label: "Any accredited PH lab" },
];

export const bioScanMarkers: MarkerCardItem[] = [
  {
    code: "CRP",
    marker: "C-Reactive Protein",
    description:
      "The primary direct marker of systemic inflammation. The clearest signal that your body is in a state of chronic stress.",
    normalRange: "Normal: <1.0 mg/L",
  },
  {
    code: "WBC",
    marker: "White Blood Cells",
    description:
      "Elevated WBC with no active infection signals chronic low-grade inflammation — your immune system is quietly overactivated.",
    normalRange: "Normal: 4.5–11.0 ×10^9/L",
  },
  {
    code: "NEUT",
    marker: "Neutrophils",
    description:
      "High neutrophils with high CRP confirms an active inflammatory burden. A key immune imbalance signal.",
    normalRange: "Normal: 50–70%",
  },
  {
    code: "LYMPH",
    marker: "Lymphocytes",
    description:
      "Low lymphocytes alongside high neutrophils — a hallmark of chronic gut-driven inflammation.",
    normalRange: "Normal: 20–40%",
  },
  {
    code: "GLU",
    marker: "Fasting Glucose",
    description:
      "Elevated fasting glucose is both a cause and consequence of gut inflammation. Your microbiome directly regulates insulin sensitivity.",
    normalRange: "Normal: 70–99 mg/dL",
  },
  {
    code: "TRIG",
    marker: "Triglycerides",
    description:
      "High triglycerides signal metabolic inflammation — one of the most commonly elevated markers in Filipino patients.",
    normalRange: "Normal: <150 mg/dL",
  },
  {
    code: "HDL",
    marker: "HDL Cholesterol",
    description:
      "Low HDL is strongly linked to gut dysbiosis. GutGuard consistently raises HDL as the microbiome restores.",
    normalRange: "Normal: >40 (M) / >50 (F)",
  },
  {
    code: "ALT",
    marker: "Alanine Aminotransferase",
    description:
      "Elevated ALT indicates gut-liver axis inflammation — a direct result of gut permeability allowing toxins to reach the liver.",
    normalRange: "Normal: 7–56 U/L",
  },
];

export const scoreRanges: ScoreRangeItem[] = [
  {
    range: "0–25",
    label: "Optimal",
    description: "No significant inflammation detected. Maintenance protocol recommended.",
    action: "→ Trial or Start",
    tone: "mint",
  },
  {
    range: "26–50",
    label: "Mild Inflammation",
    description: "Early markers present. The ideal intervention window — fully reversible.",
    action: "→ Start Protocol",
    tone: "amber",
  },
  {
    range: "51–75",
    label: "Moderate",
    description: "Active systemic inflammation. Fatigue, poor sleep, bloating common. Measurable change within 30 days.",
    action: "→ Grow Protocol",
    tone: "orange",
  },
  {
    range: "76–100",
    label: "High Inflammation",
    description: "Significant inflammatory burden. Doctor review is priority. Full 90-day intervention needed.",
    action: "→ Power Protocol",
    tone: "rose",
  },
];

export const doctorMetrics: DoctorMetricItem[] = [
  { value: "94%", label: "protocol match rate" },
  { value: "127", label: "reviews this month" },
  { value: "4.9", label: "patient rating" },
];

export const doctorProcessChips: ChipItem[] = [
  { label: "Upload labs or test kit" },
  { label: "Request 24h review" },
  { label: "Review with BioScan" },
  { label: "Protocol assigned" },
  { label: "Re-score at maintenance" },
];

export const scienceStages: StageCardItem[] = [
  {
    step: "STAGE 01 - PREBIOTICS",
    title: "Feed the right bacteria",
    description:
      "Targeted fibers help beneficial species expand before precision strains are introduced.",
    action: "Supports resilience",
    tone: "blue",
  },
  {
    step: "STAGE 02 - PROBIOTICS",
    title: "Colonize with precision strains",
    description:
      "Specific strains are layered in once the inflammatory environment is easier to regulate.",
    action: "Precision matched",
    tone: "mint",
  },
  {
    step: "STAGE 03 - POSTBIOTICS",
    title: "Activate cellular regeneration",
    description:
      "Recovery support focuses on repair, signaling, and long-term gut barrier function.",
    action: "Recovery support",
    tone: "peach",
  },
];

export const scienceBlurbs: ScienceBlurbItem[] = [
  {
    title: "Activates Akkermansia pathways",
    description: "Supports barrier repair and mucus-layer health.",
  },
  {
    title: "Regenerates short-chain fatty acids",
    description: "Improves the environment for calmer digestion and immune signaling.",
  },
  {
    title: "Rebalances immune reactivity",
    description: "Helps the system move from chronic irritation to controlled recovery.",
  },
];

export const comparisonRows: ComparisonRowItem[] = [
  {
    feature: "Starting price",
    generic: "P750-P950",
    otherApps: "P700-P850",
    gutGuard: "P130 / day",
  },
  {
    feature: "Baseline inflammation score",
    generic: "No",
    otherApps: "No",
    gutGuard: "Personalized score",
  },
  {
    feature: "Doctor-reviewed results",
    generic: "No",
    otherApps: "One-time only",
    gutGuard: "Doctor review",
  },
  {
    feature: "Protocol matched to your score",
    generic: "No",
    otherApps: "Soft matching",
    gutGuard: "3 biomarker tiers",
  },
  {
    feature: "Progress tracking via re-scan",
    generic: "No",
    otherApps: "Partial",
    gutGuard: "Weekly map",
  },
  {
    feature: "Built-in probiotics",
    generic: "Sometimes",
    otherApps: "Limited",
    gutGuard: "Up to 60 days",
  },
  {
    feature: "Satisfaction guarantee",
    generic: "14-30 days",
    otherApps: "None",
    gutGuard: "1-to-1 support",
  },
];

export const protocolPlans: ProtocolCardItem[] = [
  {
    title: "Total Protocol",
    price: "P130",
    cadence: "/ day",
    summary: "Best for scores needing immediate and full-spectrum intervention.",
    cta: "Enroll Today",
    bullets: ["3-stage stack", "1:1 doctor review", "Priority shipment", "Free shipping"],
  },
  {
    title: "Start Protocol",
    price: "P115",
    cadence: "/ day",
    summary: "For mild scores that still need active gut and immune support.",
    cta: "Enroll Now",
    bullets: ["1 biomarker tier", "Starter review", "Gut repair blend", "Free shipping"],
  },
  {
    title: "Grow Protocol",
    price: "P103",
    cadence: "/ day",
    summary: "For the majority of patients who need layered support across multiple markers.",
    cta: "Enroll Now",
    bullets: ["2 biomarker tiers", "Assigned clinician", "Doctor follow-up", "Priority support"],
    badge: "MOST POPULAR",
    featured: true,
  },
  {
    title: "Power Protocol",
    price: "P87",
    cadence: "/ day",
    summary: "For maintenance once your inflammation score begins to settle.",
    cta: "Enroll Now",
    bullets: ["Recovery phase", "Microbiome support", "Re-score friendly", "Doctor reviewed"],
  },
];

export const patientReviews: ReviewCardItem[] = [
  {
    before: "82",
    after: "48",
    improvement: "↓34 pts",
    quote:
      '"My CRP dropped from 4.2 to 1.1 in one cycle. The fatigue I had been blaming on night shifts for two years — that was inflammation. It is gone."',
    initials: "MS",
    protocol: "Grow Protocol · name changed for privacy",
  },
  {
    before: "64",
    after: "32",
    improvement: "↓32 pts",
    quote:
      `"Three years of joint pain I assumed was age. Dr. Shane's first note after my scan said it was systemic inflammation, not arthritis. Six weeks later my score dropped 32 points and the pain was measurably better."`,
    initials: "LR",
    protocol: "Power Protocol · name changed for privacy",
  },
  {
    before: "55",
    after: "28",
    improvement: "↓27 pts",
    quote:
      '"55 down to 28 in one Grow Protocol cycle. My internist at my annual checkup asked what I had changed. I showed her the BioScan report."',
    initials: "CT",
    protocol: "Grow Protocol · name changed for privacy",
  },
];

export const knowledgeTabs: KnowledgeTabItem[] = [
  { label: "Protocol", active: true },
  { label: "Shipping" },
  { label: "Compliance" },
  { label: "Safety" },
];

export const knowledgeCards: KnowledgeCardItem[] = [
  {
    title: "Protocol dosing schedule",
    body: "A simple overview of when each stage starts and how the sequence is maintained.",
    bullets: ["Weeks 1-2: prep", "Weeks 3-6: colonize", "Weeks 7-12: repair"],
  },
  {
    title: "How to take it correctly",
    body: "Use the products with meals and keep the spacing consistent across the protocol window.",
    bullets: ["Take with breakfast", "Stay hydrated", "Avoid skipped days"],
  },
  {
    title: "What to expect in the first month",
    body: "Most patients notice digestion changes first, followed by steadier energy and less bloating.",
    bullets: ["Bloating may settle", "Energy usually stabilizes", "Markers improve with consistency"],
  },
  {
    title: "Storage and handling",
    body: "Keep the protocol away from heat and moisture. Refrigeration is only needed when specified.",
    bullets: ["Store below room temp", "Avoid direct sun", "Read each bottle label"],
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Do I need to buy anything to see my score?",
    answer:
      "No. The BioScan is free. Upload your existing blood panel, and your Lifestyle Inflammation Score calculates immediately from 8 markers. You only pay after Dr. Shane has reviewed your results, confirmed your protocol, and you choose to proceed. There is no payment required to find out your number.",
  },
  {
    question: "I already have a doctor. Why do I need Dr. Shane?",
    answer:
      "You do not need to replace your doctor. Dr. Shane reviews your blood markers specifically for inflammatory patterns that routine checkups rarely flag. He assigns a gut-targeted protocol based on your score - a service most GPs do not offer. Many patients share their GutGuard BioScan report with their regular doctor.",
  },
  {
    question: "How is this different from a probiotic I can buy at Mercury Drug?",
    answer:
      "Over-the-counter probiotics are generic. They do not know your CRP, your NLR, or your metabolic markers. GutGuard prescribes a protocol based on what your blood actually shows. The Urolithin-A postbiotic in Stage 3 is not available in any Philippine pharmacy - it is a clinical-grade compound documented in peer-reviewed research for mitochondrial regeneration.",
  },
  {
    question: "What if my score does not improve?",
    answer:
      "If your BioScan shows no measurable GLIS reduction after completing the full protocol, Dr. Shane reviews your case personally. If confirmed, you receive a full refund within 5 business days. The guarantee is based on your blood markers - not on how you feel, which is a subjective standard. A score that does not drop is a verifiable fact.",
  },
  {
    question: "Can I take SynBIOTIC+ alongside other supplements?",
    answer:
      "Generally yes. The two exceptions are high-dose standalone probiotics (redundant - GutGuard already contains precision strains) and SSRIs or antidepressants (due to L-Tryptophan interaction). Always declare all current medications and supplements during your BioScan review. Dr. Shane will flag any contraindications before assigning your protocol.",
  },
  {
    question: "Is GutGuard Halal?",
    answer:
      "Yes. GutGuard SynBIOTIC+ is Halal-certified. The capsule shell is plant-based (HPMC). No pork-derived ingredients are used in the formula or manufacturing process.",
  },
  {
    question: "Do I need a new blood test or can I use old results?",
    answer:
      "Any blood panel from a Philippine laboratory in the past 90 days is valid. Hi-Precision, Medicard, Philippine Red Cross, Davao Doctors, St. Luke's - all accepted. A CBC with differential, CRP, fasting glucose, lipid panel, and ALT covers all 8 markers. You do not need to get new tests unless your last labs are older than 90 days.",
  },
  {
    question: "What happens after I finish my protocol?",
    answer:
      "Dr. Shane sends a final review with a comparison of your first and last BioScan scores. If your GLIS is in the Optimal or Mild range, a maintenance protocol (Trial or Start) is usually recommended. If you have not reached your target, a new Grow or Power cycle may be advised. You are never auto-enrolled - every new cycle is a separate decision.",
  },
];

export const footerColumns: FooterColumnItem[] = [
  {
    title: "Protocol",
    links: [
      { href: "#top", label: "Check My Score" },
      { href: "#bioscan", label: "The 8 Markers" },
      { href: "#science", label: "The Science" },
      { href: "#plans", label: "Pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "#knowledge", label: "Dosing Guide" },
      { href: "#knowledge", label: "Shipping" },
      { href: "#knowledge", label: "Safety Info" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#top", label: "About GutGuard" },
      { href: "/science", label: "Science" },
      { href: "/legal", label: "Legal & Compliance" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export const footerBadges: FooterBadgeItem[] = [
  { label: "SEC Registered" },
  { label: "FDA Notified" },
  { label: "LTO Licensed" },
  { label: "Halal Certified" },
];
