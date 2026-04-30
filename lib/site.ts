const defaultSiteUrl = "https://gutguard.ph";

export const siteConfig = {
  description:
    "68% of Philippine deaths start with chronic inflammation. Upload your blood results, get your Lifestyle Inflammation Score in minutes. Doctor-assigned protocol. Free shipping nationwide.",
  locale: "en_PH",
  name: "GutGuard Protocol",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
  title: "GutGuard Protocol - Check Your Inflammation Score - Philippines",
};

export const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  description:
    "Doctor-monitored gut health protocol using the Lifestyle Inflammation Score to assign personalized Pre-Pro-Postbiotic protocols.",
  inLanguage: "en-PH",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
};
