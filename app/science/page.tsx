import type { Metadata } from "next";

const pageTitle = "Science | GutGuard";
const pageDescription =
  "Clinical rationale, biomarker framework, and ingredient evidence behind GutGuard's inflammation scoring and protocol assignment.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/science",
  },
};

const evidenceSections = [
  {
    body:
      "GutGuard uses eight common blood markers to look for patterns often associated with systemic inflammation, metabolic stress, and poor gut resilience: CRP, WBC, neutrophils, lymphocytes, fasting glucose, triglycerides, HDL, and ALT. These markers are not used to diagnose disease on this page. They are used to organize a practical risk picture and determine whether a user should stay at a maintenance level or escalate to a more intensive protocol.",
    title: "Why these markers",
  },
  {
    body:
      "The goal of the Lifestyle Inflammation Score is not to replace a physician or laboratory interpretation. It is a structured triage layer that converts familiar lab values into a simple severity range so a user can understand whether their pattern looks low, mild, moderate, or high. The doctor review step remains the final assignment layer.",
    title: "What the score is for",
  },
  {
    body:
      "The protocol logic follows a staged gut-support model: prebiotic substrate to improve microbial fuel availability, probiotic or synbiotic support where appropriate, and postbiotic or downstream support for recovery and tolerance. This is why the product and plan pages consistently describe the approach as a pre-pro-postbiotic cascade rather than a generic supplement bundle.",
    title: "Protocol model",
  },
];

const ingredientEvidence = [
  {
    evidence:
      "Human studies have explored its effect on mitophagy, muscle function, and inflammation-related pathways. GutGuard positions it as a metabolic and recovery support ingredient rather than a stand-alone treatment.",
    ingredient: "Urolithin-A",
    role: "Mitochondrial renewal and stress-response support",
  },
  {
    evidence:
      "Amino-acid support can influence gut-brain signaling, mood-related pathways, and sleep-related chemistry. It requires caution for users on serotonergic medications, which is why the site safety section already flags SSRI interaction risk.",
    ingredient: "L-Tryptophan",
    role: "Gut-brain axis and recovery support",
  },
  {
    evidence:
      "Prebiotic fibers and related substrates are used to encourage favorable microbial fermentation and help beneficial species persist instead of relying only on short-term supplementation.",
    ingredient: "Prebiotic complex",
    role: "Microbiome fuel and fermentation support",
  },
  {
    evidence:
      "Postbiotic and encapsulated probiotic strategies are used because survivability, delivery, and tolerance matter just as much as colony counts on the label.",
    ingredient: "Encapsulated probiotic and postbiotic support",
    role: "Delivery stability and downstream gut support",
  },
];

const references = [
  "Inflammatory marker interpretation frameworks commonly use CRP, leukocyte balance, lipids, fasting glucose, and liver stress markers as part of cardiometabolic risk assessment.",
  "Urolithin-A literature from 2019 onward focuses on mitophagy, mitochondrial function, and human performance or recovery endpoints.",
  "Tryptophan literature supports its relevance to serotonin and melatonin pathways as well as gut-brain communication.",
  "Prebiotic, probiotic, synbiotic, and postbiotic reviews consistently emphasize strain selection, substrate pairing, delivery, and tolerance rather than one-size-fits-all supplementation.",
];

export default function SciencePage() {
  return (
    <main className="bg-[#fbfaf7] px-6 py-16 text-[#101010] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-4 border-b border-[#d9d4c7] pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7b84aa]">GutGuard Science</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#0e1658]">The science behind GutGuard</h1>
          <p className="max-w-3xl text-base text-[#3b3b45]">
            This page explains the biomarker logic, protocol model, and ingredient rationale used on
            the GutGuard site. It is intended to make the product and scoring framework easier to
            audit, not to replace direct medical advice.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          {evidenceSections.map((section) => (
            <article key={section.title} className="rounded-[20px] border border-[#ded8ca] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#0e1658]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#2e2e36] sm:text-[15px]">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#0e1658]">Ingredient rationale</h2>
            <p className="max-w-3xl text-sm leading-7 text-[#2e2e36] sm:text-[15px]">
              GutGuard’s ingredient positioning is based on mechanism and support role. It should be
              understood as structured lifestyle supplementation rather than drug therapy.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {ingredientEvidence.map((item) => (
              <article key={item.ingredient} className="rounded-[18px] border border-[#ded8ca] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5b8ef0]">{item.role}</p>
                <h3 className="mt-2 text-xl font-semibold text-[#0e1658]">{item.ingredient}</h3>
                <p className="mt-3 text-sm leading-7 text-[#2e2e36] sm:text-[15px]">{item.evidence}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-[24px] border border-[#d9d4c7] bg-[#f4f2eb] p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#0e1658]">Evidence notes</h2>
          <ul className="list-disc space-y-3 pl-6 text-sm leading-7 text-[#2e2e36] sm:text-[15px]">
            {references.map((reference) => (
              <li key={reference}>{reference}</li>
            ))}
          </ul>
          <p className="text-sm leading-7 text-[#5c5c66] sm:text-[15px]">
            GutGuard should continue expanding this page with citation-level references, trial links,
            and product-specific documentation as the evidence library grows.
          </p>
        </section>
      </div>
    </main>
  );
}
