"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";

import Container from "../ui/Container";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

type PanelKey = "dosing" | "bioscan" | "shipping" | "compliance" | "safety";

type Panel = {
  key: PanelKey;
  label: string;
  cards: ReactNode[];
};

function KnowledgeCard({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: string;
  title: string;
}) {
  return (
    <div className="rounded-[20px] border border-[rgba(255,255,255,0.71)] bg-[#020B41] px-[20px] py-[20px] text-white">
      <div className="space-y-5">
        <div className="flex items-center gap-[10px]">
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[rgba(255,255,255,0.08)] text-[13px]">
            {icon}
          </div>
          <h3
            className={[
              plusJakartaSans.className,
              "text-[16px] font-bold leading-[1.4] text-white",
            ].join(" ")}
          >
            {title}
          </h3>
        </div>

        {children}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-[10px]">
      {items.map((item, index) => (
        <li
          key={index}
          className={[inter.className, "flex gap-[8px] text-[14px] font-normal leading-[1.55] text-[#A3A3A8]"].join(" ")}
        >
          <span className="pt-[7px] text-[8px] leading-none text-[#5B8EF0]">{"\u2022"}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const panels: Panel[] = [
  {
    key: "dosing",
    label: "Dosing",
    cards: [
      <KnowledgeCard icon="\uD83D\uDC8A" key="dosing-schedule" title="Protocol dosing schedule">
        <div className="overflow-hidden rounded-[14px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                {["PROTOCOL", "MORNING", "EVENING", "DURATION"].map((label) => (
                  <th
                    key={label}
                    className={[
                      inter.className,
                      "px-[10px] py-[8px] text-left text-[11px] font-bold tracking-[0] text-[#A3A3A8]",
                    ].join(" ")}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Trial", "1 cap", "1 cap", "5 days"],
                ["Start", "1\u20132 caps", "1 cap", "15 days"],
                ["Grow", "2 caps", "2 caps", "30 days"],
                ["Power", "2\u20133 caps", "2\u20133 caps", "90 days"],
              ].map((row) => (
                <tr key={row[0]}>
                  <td
                    className={[
                      inter.className,
                      "px-[10px] py-[10px] text-[14px] font-semibold text-[#FFFFFF]",
                    ].join(" ")}
                  >
                    {row[0]}
                  </td>
                  <td className="px-[10px] py-[10px] text-[14px] font-normal text-[#A3A3A8]">{row[1]}</td>
                  <td className="px-[10px] py-[10px] text-[14px] font-normal text-[#A3A3A8]">{row[2]}</td>
                  <td className="px-[10px] py-[10px] text-[14px] font-normal text-[#A3A3A8]">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </KnowledgeCard>,
      <KnowledgeCard icon="⏰" key="dosing-how" title="How to take it correctly">
        <BulletList
          items={[
            "Take with a full glass of water, 30 minutes before or after a meal",
            "Morning dose: before breakfast for maximum Urolithin-A absorption",
            "Evening dose: 1 hour before sleep for L-Tryptophan's sleep effect",
            "Do not crush or split capsules \u2014 nano-encapsulation requires intact delivery",
            "If you miss a dose, resume normally \u2014 do not double-dose",
          ]}
        />
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83D\uDCC8" key="dosing-week" title="What to expect in the first week">
        <div className="space-y-[8px]">
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            Some patients experience mild digestive changes during days 1\u20134 as the microbiome shifts.{" "}
            <span className="text-[14px] font-semibold text-[#EBEBEF]">This is normal.</span>
          </p>
          <BulletList
            items={[
              "Slightly looser stools (Day 1\u20134) \u2014 resolves by Day 5",
              "Noticeably better sleep often begins Day 3\u20135",
              "Energy improvement typically felt Day 7 onwards",
            ]}
          />
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            If symptoms persist beyond 7 days, message Dr. Shane through your portal.
          </p>
        </div>
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83D\uDCE6" key="dosing-storage" title="Storage & handling">
        <BulletList
          items={[
            "Store below 30\u00B0C, away from direct sunlight and moisture",
            "Do not refrigerate unless instructed by Dr. Shane",
            "Shelf life: 24 months from manufacture date (printed on pack)",
            "Keep out of reach of children",
          ]}
        />
      </KnowledgeCard>,
    ],
  },
  {
    key: "bioscan",
    label: "BioScan",
    cards: [
      <KnowledgeCard icon="\uD83D\uDD2C" key="bioscan-accept" title="What lab results does BioScan accept?">
        <p
          className={[
            inter.className,
            "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
          ].join(" ")}
        >
          BioScan reads: <strong className="text-[#EBEBEF]">CBC with differential</strong> (WBC,
          neutrophils, lymphocytes), <strong className="text-[#EBEBEF]">Lipid panel</strong>{" "}
          (triglycerides, HDL), <strong className="text-[#EBEBEF]">Fasting blood glucose</strong>,{" "}
          <strong className="text-[#EBEBEF]">CRP or hs-CRP</strong>, and{" "}
          <strong className="text-[#EBEBEF]">ALT</strong>. You do not need all 8 \u2014 BioScan
          scores from whatever is available.
        </p>
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83D\uDCC5" key="bioscan-recency" title="How recent do my labs need to be?">
        <p
          className={[
            inter.className,
            "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
          ].join(" ")}
        >
          Labs within the last <strong className="text-[#EBEBEF]">90 days</strong> produce the
          most accurate GLIS. Older labs can still be submitted \u2014 Dr. Shane will indicate
          whether a fresh panel is needed before prescribing.
        </p>
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83D\uDD04" key="bioscan-rescan" title="How often should I re-scan?">
        <div className="space-y-[10px]">
          <BulletList
            items={[
              <><strong className="text-[#EBEBEF]">Trial & Start:</strong> 1 BioScan (baseline)</>,
              <><strong className="text-[#EBEBEF]">Grow:</strong> 3 BioScans \u2014 Day 0, 15, 30</>,
              <><strong className="text-[#EBEBEF]">Power:</strong> 3 BioScans \u2014 Day 0, 30, 90</>,
            ]}
          />
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            Your portal tracks all scans and shows your score trajectory. Dr. Shane reviews each
            one.
          </p>
        </div>
      </KnowledgeCard>,
      <KnowledgeCard icon="➕" key="bioscan-extra" title="Can I take additional BioScans?">
        <p
          className={[
            inter.className,
            "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
          ].join(" ")}
        >
          Yes. Additional BioScans can be purchased through your portal at any time. Many
          patients re-scan at 6 and 12 months after completing a protocol. Your full scan history
          is always visible to Dr. Shane.
        </p>
      </KnowledgeCard>,
    ],
  },
  {
    key: "shipping",
    label: "Shipping",
    cards: [
      <KnowledgeCard icon="\uD83D\uDE9A" key="shipping-ph" title="Shipping across the Philippines">
        <div className="space-y-[10px]">
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            <strong className="text-[#EBEBEF]">All protocol orders ship free nationwide.</strong>
          </p>
          <BulletList
            items={[
              "Metro Manila: 1\u20132 business days",
              "Luzon provincial: 2\u20133 business days",
              "Visayas: 3\u20135 business days",
              "Mindanao (incl. GenSan): 3\u20135 business days",
              "Island provinces: 5\u20137 business days",
            ]}
          />
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            Tracking sent via SMS within 24 hours of dispatch.
          </p>
        </div>
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83D\uDCEB" key="shipping-packaging" title="Packaging & privacy">
        <p
          className={[
            inter.className,
            "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
          ].join(" ")}
        >
          All orders ship in plain, discreet packaging. No product name or medical content on the
          outside. The label shows only &quot;GG Philippines&quot; and your address. Each pack includes a
          temperature indicator strip.
        </p>
      </KnowledgeCard>,
      <KnowledgeCard icon="✅" key="shipping-returns" title="Returns & guarantee">
        <div className="space-y-[10px]">
          <BulletList
            items={[
              <><strong className="text-[#EBEBEF]">Trial:</strong> No returns (5-day supply)</>,
              <><strong className="text-[#EBEBEF]">Start:</strong> 15-day satisfaction guarantee</>,
              <><strong className="text-[#EBEBEF]">Grow:</strong> 30-day satisfaction guarantee</>,
              <><strong className="text-[#EBEBEF]">Power:</strong> 90-day satisfaction guarantee</>,
            ]}
          />
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            Submit your BioScan showing no improvement. Dr. Shane reviews and issues a full refund
            within 5 business days.
          </p>
        </div>
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83D\uDCB3" key="shipping-payment" title="Payment methods">
        <BulletList
          items={[
            "GCash (preferred)",
            "Maya (PayMaya)",
            "Bank transfer (BDO, BPI, UnionBank, Metrobank)",
            "Credit/debit card (Visa, Mastercard)",
            "Cash on delivery (Metro Manila, subject to availability)",
          ]}
        />
      </KnowledgeCard>,
    ],
  },
  {
    key: "compliance",
    label: "Compliance",
    cards: [
      <KnowledgeCard icon="\uD83C\uDFDB" key="compliance-registration" title="Regulatory registration">
        <div className="space-y-[12px]">
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            GutGuard SynBIOTIC+ is a licensed lifestyle supplement.
          </p>
          <div className="flex flex-wrap gap-[6px]">
            {["SEC Registered", "FDA Notified", "LTO Licensed", "Halal Certified"].map((label) => (
              <span
                key={label}
                className={[
                  inter.className,
                  "rounded-[6px] border border-[#3A3A3A] bg-[#232323] px-[8px] py-[4px] text-[10px] font-medium leading-none text-[#8F8F8F]",
                ].join(" ")}
              >
                {label}
              </span>
            ))}
          </div>
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            This product is a dietary supplement, not a pharmaceutical drug. Full registration
            numbers at gutguard.ph/legal.
          </p>
        </div>
      </KnowledgeCard>,
      <KnowledgeCard icon="⚖️" key="compliance-doctor" title="What the doctor relationship means">
        <p
          className={[
            inter.className,
            "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
          ].join(" ")}
        >
          Dr. Shane reviews your BioScan as a{" "}
          <strong className="text-[#EBEBEF]">lifestyle health assessment</strong>, not a medical
          consultation. His protocol assignment is a supplement recommendation. GutGuard does not
          replace your primary care physician.
        </p>
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83D\uDD12" key="compliance-privacy" title="Your data & privacy">
        <BulletList
          items={[
            "Lab results encrypted on Philippine-compliant servers",
            "Never shared with third parties or advertisers",
            "Only Dr. Shane and assigned doctors access your scan data",
            "Request deletion anytime through your portal",
            "Complies with RA 10173 (Philippine Data Privacy Act)",
          ]}
        />
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83E\uDDEC" key="compliance-ingredients" title="Ingredient transparency">
        <div className="space-y-[10px]">
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            Key active ingredients per capsule:
          </p>
          <BulletList
            items={[
              <><strong className="text-[#EBEBEF]">Urolithin-A</strong> \u2014 250mg (mitophagy activator)</>,
              <><strong className="text-[#EBEBEF]">L-Tryptophan</strong> \u2014 150mg (gut-brain axis)</>,
              <><strong className="text-[#EBEBEF]">Patented Prebiotic Complex</strong> \u2014 proprietary blend</>,
              <><strong className="text-[#EBEBEF]">Nano-encapsulated Probiotics</strong> \u2014 &gt;10B CFU</>,
            ]}
          />
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            No artificial colours, fillers, or pork-derived ingredients. Plant-based capsule
            (HPMC).
          </p>
        </div>
      </KnowledgeCard>,
    ],
  },
  {
    key: "safety",
    label: "Safety",
    cards: [
      <KnowledgeCard icon="⚠️" key="safety-who" title="Who should NOT take GutGuard">
        <div className="space-y-[10px]">
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            Consult your physician before starting if you are:
          </p>
          <BulletList
            items={[
              "Pregnant or breastfeeding",
              "Undergoing chemotherapy or radiation",
              "Taking immunosuppressant medications",
              "Diagnosed with active IBD (Crohn's, ulcerative colitis)",
              "Under 18 years old",
            ]}
          />
        </div>
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83D\uDC8A" key="safety-interactions" title="Known interactions">
        <BulletList
          items={[
            <><strong className="text-[#EBEBEF]">Blood thinners (warfarin, aspirin):</strong> Inform your physician \u2014 Urolithin-A may have mild anticoagulant properties</>,
            <><strong className="text-[#EBEBEF]">SSRIs / antidepressants:</strong> L-Tryptophan requires caution \u2014 consult your psychiatrist before Grow or Power Protocol</>,
            <><strong className="text-[#EBEBEF]">Statins:</strong> No known interaction</>,
            <><strong className="text-[#EBEBEF]">Metformin:</strong> No known interaction</>,
          ]}
        />
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83D\uDCCB" key="safety-reporting" title="Reporting adverse reactions">
        <p
          className={[
            inter.className,
            "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
          ].join(" ")}
        >
          Report through your <strong className="text-[#EBEBEF]">patient portal</strong> (Dr.
          Shane is notified instantly), via Telegram to the GutGuard support channel, or by
          calling the support line. Serious reactions should also be reported to the{" "}
          <strong className="text-[#EBEBEF]">Philippine FDA ADRM</strong> at fda.gov.ph.
        </p>
      </KnowledgeCard>,
      <KnowledgeCard icon="\uD83D\uDCDA" key="safety-evidence" title="Clinical evidence">
        <div className="space-y-[10px]">
          <BulletList
            items={[
              <><strong className="text-[#EBEBEF]">Urolithin-A:</strong> Demonstrated mitophagy activation and anti-inflammatory effects in 4 human clinical trials (2019\u20132023)</>,
              <><strong className="text-[#EBEBEF]">L-Tryptophan:</strong> Established precursor to serotonin and melatonin; gut-brain signalling well-documented</>,
              <><strong className="text-[#EBEBEF]">Postbiotics:</strong> Growing evidence showing superior bioavailability vs. live probiotics alone</>,
            ]}
          />
          <p
            className={[
              inter.className,
              "text-[14px] font-normal leading-[1.55] text-[#A3A3A8]",
            ].join(" ")}
          >
            Full references at gutguard.ph/science.
          </p>
        </div>
      </KnowledgeCard>,
    ],
  },
];

export default function KnowledgeHub() {
  const [activePanel, setActivePanel] = useState<PanelKey>("dosing");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = panels.findIndex((panel) => panel.key === activePanel);

  function focusTab(nextIndex: number) {
    const wrappedIndex = (nextIndex + panels.length) % panels.length;
    const nextPanel = panels[wrappedIndex];
    setActivePanel(nextPanel.key);
    tabRefs.current[wrappedIndex]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(panels.length - 1);
        break;
    }
  }

  return (
    <section className="bg-white py-16 sm:py-0" id="knowledge">
      <div aria-hidden="true" className="sr-only" id="vital" />
      <Container>
        <div className="space-y-8 lg:pb-[96px] lg:pt-[155.91px]">
          <div className="space-y-3">
            <p
              className={[
                firaCode.className,
                "min-h-[11px] w-[146.06px] text-[11px] font-bold uppercase leading-[18.15px] tracking-[1.98px] text-[#5B8EF0]",
              ].join(" ")}
            >
              Vital information
            </p>
            <h2
              className={[
                plusJakartaSans.className,
                "w-full max-w-[695px] text-[40px] font-bold leading-[1.05] tracking-[-0.04em] text-[#0305C6] sm:text-[52px] sm:leading-[57.2px] sm:tracking-[-1.56px] lg:h-[66px]",
              ].join(" ")}
            >
              Everything you need to know
            </h2>
            <p
              className={[
                inter.className,
                "w-full max-w-[559.73px] text-[18px] font-normal leading-[31.5px] tracking-[0] text-[#1C1C1E] lg:h-[31.5px]",
              ].join(" ")}
            >
              Dosing, safety, shipping, compliance, and your rights as a patient.
            </p>
          </div>

          <div aria-label="Vital information categories" className="flex w-full max-w-[1040px] flex-wrap items-center gap-[26px] rounded-[14px]" role="tablist">
            {panels.map((panel, index) => {
              const isActive = panel.key === activePanel;

              return (
                <button
                  key={panel.key}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  aria-controls={`knowledge-panel-${panel.key}`}
                  aria-selected={isActive}
                  className={[
                    inter.className,
                    "rounded-[10px] px-[2px] py-[6px] text-[14px] font-semibold leading-none transition-colors",
                    isActive ? "text-[#0305C6]" : "text-[#1C1C1E]",
                  ].join(" ")}
                  id={`knowledge-tab-${panel.key}`}
                  onClick={() => setActivePanel(panel.key)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  {panel.label}
                </button>
              );
            })}
          </div>

          {panels.map((panel) => {
            const isActive = panel.key === activePanel;

            return (
              <div
                key={panel.key}
                aria-labelledby={`knowledge-tab-${panel.key}`}
                className={isActive ? "block" : "hidden"}
                id={`knowledge-panel-${panel.key}`}
                role="tabpanel"
                tabIndex={0}
              >
                <div className="grid w-full max-w-[1040px] gap-5 lg:grid-cols-2">
                  {panel.cards}
                </div>
              </div>
            );
          })}

          <p className="sr-only">Currently selected tab: {panels[activeIndex]?.label}</p>
        </div>
      </Container>
    </section>
  );
}
