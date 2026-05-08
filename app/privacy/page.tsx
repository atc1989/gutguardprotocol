import type { Metadata } from "next";

const pageTitle = "Privacy Policy | GutGuard";
const pageDescription =
  "How GutGuard collects, uses, stores, and protects personal information submitted through the website.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#fbfaf7] px-6 py-16 text-[#101010] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4 border-b border-[#d9d4c7] pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7b84aa]">GutGuard Legal</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#0e1658]">Privacy Policy</h1>
          <p className="max-w-3xl text-base text-[#3b3b45]">
            This Privacy Policy explains how GutGuard collects, uses, stores, and protects personal
            information when you use our website, submit health-related information, or contact our team.
          </p>
        </header>

        <section className="space-y-8 text-sm leading-7 text-[#2e2e36] sm:text-[15px]">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Information we collect</h2>
            <p>
              We may collect contact details such as your name, email address, phone number, shipping
              address, and payment-related order information. If you choose to use GutGuard&apos;s scoring or
              protocol services, we may also collect health-related information you submit, including lab
              values, symptoms, and questionnaire responses.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">How we use your information</h2>
            <p>We use your information to operate the website and deliver GutGuard services, including to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>create and manage your account;</li>
              <li>review submitted health and lab information;</li>
              <li>generate your inflammation score and protocol guidance;</li>
              <li>fulfill orders and coordinate delivery;</li>
              <li>respond to support requests and service questions; and</li>
              <li>improve site performance, security, and user experience.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Health information</h2>
            <p>
              Any health-related information you provide is used only for the services you request and is
              handled with additional care. GutGuard does not sell submitted health information to third
              parties. Access is limited to personnel, providers, or service partners who need it to operate
              the service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Cookies and analytics</h2>
            <p>
              We use cookies and similar technologies to remember preferences, analyze site usage, and
              improve the performance of the website. You may adjust browser settings to block cookies, but
              some parts of the site may not function properly.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Sharing of information</h2>
            <p>
              We may share data with service providers who help us operate the website, process payments,
              manage fulfillment, host infrastructure, or provide analytics. We may also disclose information
              when required by law or to protect the rights, safety, and security of GutGuard and its users.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Data retention and security</h2>
            <p>
              We retain information only as long as reasonably necessary for the purposes described here,
              including service delivery, legal compliance, dispute resolution, and recordkeeping. We use
              administrative, technical, and organizational safeguards designed to protect personal
              information from unauthorized access, disclosure, or misuse.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Your choices</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information, subject to
              applicable legal and operational requirements. To make a request, contact us using the details
              below.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Contact</h2>
            <p>
              For privacy questions or requests, contact GutGuard through the contact details published on
              the website or by email at <a className="text-[#2948ff] underline" href="mailto:support@gutguard.ph">support@gutguard.ph</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
