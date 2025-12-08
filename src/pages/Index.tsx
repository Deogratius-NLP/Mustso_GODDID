import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MinistryCards from '@/components/MinistryCards';
import LeadersSection from '@/components/LeadersSection';
import CollegeSection from '@/components/CollegeSection';
import NewsroomSection from '@/components/NewsroomSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <MinistryCards />
        <LeadersSection />
        <CollegeSection />
        <NewsroomSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
