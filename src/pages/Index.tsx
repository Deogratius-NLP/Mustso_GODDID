import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MinistryCards from '@/components/MinistryCards';
import LeadersSection from '@/components/LeadersSection';
import CollegeSection from '@/components/CollegeSection';
import NewsroomSection from '@/components/NewsroomSection';
import Footer from '@/components/Footer';

type ActiveSection = 'home' | 'contacts' | 'colleges' | 'newsroom';

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
            <MinistryCards />
          </>
        )}
        {activeSection === 'contacts' && <LeadersSection />}
        {activeSection === 'colleges' && <CollegeSection />}
        {activeSection === 'newsroom' && <NewsroomSection />}
      </main>
      <Footer activeSection={activeSection} onNavigate={handleNavigation} />
    </div>
  );
};

export default Index;
