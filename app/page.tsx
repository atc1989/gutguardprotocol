import CheckoutModal from "@/components/app/CheckoutModal";
import BioScanReads from "@/components/sections/BioScanReads";
import CategoryChipRail from "@/components/sections/CategoryChipRail";
import ComparisonTable from "@/components/sections/ComparisonTable";
import DoctorCredibility from "@/components/sections/DoctorCredibility";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import KnowledgeHub from "@/components/sections/KnowledgeHub";
import LeadCapture from "@/components/sections/LeadCapture";
import PatientReviews from "@/components/sections/PatientReviews";
import ProtocolJourney from "@/components/sections/ProtocolJourney";
import ProtocolPlans from "@/components/sections/ProtocolPlans";
import ScienceStages from "@/components/sections/ScienceStages";
import ScoreMeaning from "@/components/sections/ScoreMeaning";
import TrustStats from "@/components/sections/TrustStats";

export default function HomePage() {
  return (
    <main className="bg-[#fbfaf7]">
      <Hero />
      <TrustStats />
      <CategoryChipRail />
      <ProtocolJourney />
      <BioScanReads />
      <ScoreMeaning />
      <DoctorCredibility />
      <ScienceStages />
      <ComparisonTable />
      <ProtocolPlans />
      <PatientReviews />
      <LeadCapture />
      <KnowledgeHub />
      <FAQ />
      <FinalCTA />
      <Footer />
      <CheckoutModal />
    </main>
  );
}
