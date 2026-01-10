import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TopExecutivesSection from '@/components/TopExecutivesSection';
import MinistryCards from '@/components/MinistryCards';
import USRCSection from '@/components/USRCSection';
import JudiciarySection from '@/components/JudiciarySection';
import NewsroomSection from '@/components/NewsroomSection';
import PastLeadersSection from '@/components/PastLeadersSection';
import Footer from '@/components/Footer';

type ActiveSection = 'home' | 'usrc' | 'judiciary' | 'newsroom' | 'pastleaders';

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  const handleNavigation = (section: ActiveSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} onNavigate={handleNavigation} />
      <main>
        {activeSection === 'home' && (
          <>
            <HeroSection />
            <TopExecutivesSection />
            <MinistryCards />
          </>
        )}
        {activeSection === 'usrc' && <USRCSection />}
        {activeSection === 'judiciary' && <JudiciarySection />}
        {activeSection === 'newsroom' && <NewsroomSection />}
        {activeSection === 'pastleaders' && <PastLeadersSection />}
      </main>
      <Footer activeSection={activeSection} onNavigate={handleNavigation} />
    </div>
  );
};

export default Index;
