import type { Metadata } from "next";

const pageTitle = "Legal & Compliance | GutGuard";
const pageDescription =
  "Regulatory, business, safety, and doctor-relationship disclosures for GutGuard products and services.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/legal",
  },
};

const registrationItems = [
  {
    label: "SEC registration",
    value: "To be published with the live company registration number.",
  },
  {
    label: "FDA notification",
    value: "To be published with the active product notification reference.",
  },
  {
    label: "LTO license",
    value: "To be published with the licensed operator reference.",
  },
  {
    label: "Halal certification",
    value: "To be published with the current certificate issuer and number.",
  },
];

const complianceSections = [
  {
    body:
      "GutGuard SynBIOTIC+ is presented on this site as a lifestyle supplement. It is not marketed as a pharmaceutical drug and is not intended to diagnose, treat, cure, or prevent disease. Any registration or notification language on this page should be read together with the product disclaimer and the official product label.",
    title: "Product classification",
  },
  {
    body:
      "Dr. Shane’s role on the site is framed as doctor review of user-submitted biomarkers for lifestyle and supplement assignment. That review does not replace emergency care, formal diagnosis, or a continuing relationship with the user’s own physician.",
    title: "Doctor relationship disclosure",
  },
  {
    body:
      "The site collects personal, payment, and health-adjacent data to fulfill orders and support scoring or review workflows. Privacy and handling expectations are governed primarily by the Privacy Policy and by Philippine data privacy requirements.",
    title: "Data and privacy",
  },
];

export default function LegalPage() {
  return (
    <main className="bg-[#fbfaf7] px-6 py-16 text-[#101010] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-4 border-b border-[#d9d4c7] pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7b84aa]">GutGuard Legal</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#0e1658]">Legal and compliance</h1>
          <p className="max-w-3xl text-base text-[#3b3b45]">
            This page centralizes the business, product, and safety disclosures referenced throughout
            the GutGuard website. It should be treated as the main destination for trust and compliance
            details linked from the landing page.
          </p>
        </header>

        <section className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#0e1658]">Registration details</h2>
            <p className="max-w-3xl text-sm leading-7 text-[#2e2e36] sm:text-[15px]">
              Replace the placeholders below with the exact live registration details used by the
              business and product once they are finalized for publication.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {registrationItems.map((item) => (
              <article key={item.label} className="rounded-[18px] border border-[#ded8ca] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5b8ef0]">{item.label}</p>
                <p className="mt-3 text-sm leading-7 text-[#2e2e36] sm:text-[15px]">{item.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {complianceSections.map((section) => (
            <article key={section.title} className="rounded-[20px] border border-[#ded8ca] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#0e1658]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#2e2e36] sm:text-[15px]">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4 rounded-[24px] border border-[#d9d4c7] bg-[#f4f2eb] p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#0e1658]">Required follow-up before launch at scale</h2>
          <ul className="list-disc space-y-3 pl-6 text-sm leading-7 text-[#2e2e36] sm:text-[15px]">
            <li>Replace every placeholder registration entry with a real published number or remove the claim.</li>
            <li>Publish doctor license and professional details in the exact form legal counsel is comfortable displaying.</li>
            <li>Make sure refund, shipping, and adverse event reporting instructions match actual operations.</li>
            <li>Keep this page aligned with the Privacy Policy, Terms of Service, and product packaging language.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
