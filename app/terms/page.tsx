import type { Metadata } from "next";

const pageTitle = "Terms of Service | GutGuard";
const pageDescription =
  "Terms governing access to the GutGuard website, products, and doctor-reviewed health guidance services.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="bg-[#fbfaf7] px-6 py-16 text-[#101010] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4 border-b border-[#d9d4c7] pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7b84aa]">GutGuard Legal</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#0e1658]">Terms of Service</h1>
          <p className="max-w-3xl text-base text-[#3b3b45]">
            These Terms of Service govern your access to and use of GutGuard&apos;s website, content,
            scoring tools, consultations, and product-related services.
          </p>
        </header>

        <section className="space-y-8 text-sm leading-7 text-[#2e2e36] sm:text-[15px]">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Use of the service</h2>
            <p>
              By using the GutGuard website, you agree to use the service only for lawful purposes and in a
              way that does not interfere with the platform, its users, or its operations. You are
              responsible for ensuring that information you submit is accurate and complete.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Health information and limitations</h2>
            <p>
              GutGuard provides educational content, wellness-oriented scoring tools, and doctor-reviewed
              guidance based on the information you submit. The website and products are not a substitute for
              emergency care, diagnosis, or treatment by your own licensed physician. Always seek direct
              medical advice for urgent or serious health concerns.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Orders and fulfillment</h2>
            <p>
              Product availability, pricing, shipping timelines, and order acceptance may change without
              notice. GutGuard reserves the right to cancel or refuse an order if information is inaccurate,
              payment cannot be processed, or fulfillment is not possible.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Accounts and access</h2>
            <p>
              If you create an account, you are responsible for maintaining the confidentiality of your login
              credentials and for all activity under your account. GutGuard may suspend or terminate access
              when necessary to protect the service, comply with legal requirements, or address misuse.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Intellectual property</h2>
            <p>
              All website content, branding, software, design elements, and service materials are owned by
              GutGuard or its licensors unless otherwise stated. You may not copy, modify, distribute, or
              commercially exploit these materials without prior written permission.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Disclaimers and liability</h2>
            <p>
              The service is provided on an as-available basis. To the maximum extent permitted by law,
              GutGuard disclaims warranties not expressly stated and is not liable for indirect, incidental,
              special, or consequential damages arising from your use of the website or services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Changes to these terms</h2>
            <p>
              GutGuard may update these Terms of Service from time to time. Continued use of the service
              after changes become effective constitutes acceptance of the updated terms.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0e1658]">Contact</h2>
            <p>
              Questions about these terms may be sent to{" "}
              <a className="text-[#2948ff] underline" href="mailto:support@gutguard.ph">
                support@gutguard.ph
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
