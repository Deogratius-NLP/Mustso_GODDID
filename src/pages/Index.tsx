import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TopExecutivesSection from '@/components/TopExecutivesSection';
import MinistryCards from '@/components/MinistryCards';
import JudiciarySection from '@/components/JudiciarySection';
import NewsroomSection from '@/components/NewsroomSection';
import PastLeadersSection from '@/components/PastLeadersSection';
import USRCSection from '@/components/USRCSection';
import CollegeDetailSection from '@/components/CollegeDetailSection';
import Footer from '@/components/Footer';

type ActiveSection = 'home' | 'judiciary' | 'newsroom' | 'pastleaders' | 'usrc' | 'college';

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);

  const handleNavigation = (section: ActiveSection) => {
    setActiveSection(section);
    setSelectedCollegeId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollege = (collegeId: string) => {
    setSelectedCollegeId(collegeId);
    setActiveSection('college');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToUSRC = () => {
    setSelectedCollegeId(null);
    setActiveSection('usrc');
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
        {activeSection === 'judiciary' && <JudiciarySection />}
        {activeSection === 'newsroom' && <NewsroomSection />}
        {activeSection === 'pastleaders' && <PastLeadersSection />}
        {activeSection === 'usrc' && <USRCSection onSelectCollege={handleSelectCollege} />}
        {activeSection === 'college' && selectedCollegeId && (
          <CollegeDetailSection collegeId={selectedCollegeId} onBack={handleBackToUSRC} />
        )}
      </main>
      <Footer activeSection={activeSection} onNavigate={handleNavigation} />
    </div>
  );
};

export default Index;
