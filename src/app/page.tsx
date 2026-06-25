import { Hero } from '@/components/Hero';
import { TrustSection, ServicesSection } from '@/components/MainSections';
import { CommunicationSection, ApplicationSection, DataIntelligenceSection } from '@/components/MiddleSections';
import { OperationSection, DataScienceSection, WhySection } from '@/components/FinalSections';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <ServicesSection />
      <CommunicationSection />
      <ApplicationSection />
      <DataIntelligenceSection />
      <OperationSection />
      <DataScienceSection />
      <WhySection />
    </>
  );
}
