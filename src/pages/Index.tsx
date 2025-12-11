import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MinistryCards from '@/components/MinistryCards';
import CollegeSection from '@/components/CollegeSection';
import NewsroomSection from '@/components/NewsroomSection';
import PastLeadersSection from '@/components/PastLeadersSection';
import Footer from '@/components/Footer';

type ActiveSection = 'home' | 'colleges' | 'newsroom' | 'pastleaders';

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
        {activeSection === 'colleges' && <CollegeSection />}
        {activeSection === 'newsroom' && <NewsroomSection />}
        {activeSection === 'pastleaders' && <PastLeadersSection />}
      </main>
      <Footer activeSection={activeSection} onNavigate={handleNavigation} />
    </div>
  );
};

export default Index;