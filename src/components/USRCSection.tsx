import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import mustsoData from '@/data/mustsoData.json';
import fallbackImage from '@/assets/Gemini_Generated_Image_xgcqpnxgcqpnxgcq.png';

interface College {
  id: string;
  name: string;
  leader: {
    name: string;
    title: string;
    phone: string;
  };
  departments: Array<{
    name: string;
    leader: {
      name: string;
      phone: string;
    };
  }>;
}

interface USRCLeader {
  id: number;
  name: string;
  title: string;
  image?: string;
}

// SVG Background Pattern Component - White slanted lines for visibility
const GeometricPattern = ({ id = "geometric-pattern" }: { id?: string }) => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.15]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id={id}
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-30)"
      >
        {/* Slanted parallel lines */}
        <line
          x1="0"
          y1="0"
          x2="40"
          y2="0"
          stroke="white"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="20"
          x2="40"
          y2="20"
          stroke="white"
          strokeWidth="0.5"
        />
        {/* Small diamond accents */}
        <path
          d="M20 5L25 10L20 15L15 10Z"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

// SVG Background Pattern Component - White slanted for dark backgrounds
const GreyGeometricPattern = ({ id = "grey-geometric-pattern" }: { id?: string }) => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.12]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id={id}
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-30)"
      >
        {/* Slanted parallel lines */}
        <line
          x1="0"
          y1="0"
          x2="40"
          y2="0"
          stroke="white"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="20"
          x2="40"
          y2="20"
          stroke="white"
          strokeWidth="0.5"
        />
        {/* Small diamond accents */}
        <path
          d="M20 5L25 10L20 15L15 10Z"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

export { GeometricPattern, GreyGeometricPattern };

// Rounded square leader card component - matches TopExecutivesSection pattern
const USRCLeaderCard = ({ 
  name, 
  position, 
  image,
  animationDelay = 0 
}: { 
  name: string; 
  position: string; 
  image?: string;
  animationDelay?: number;
}) => {
  const imageSrc = image || fallbackImage;
  
  return (
    <div 
      className="flex flex-col items-center animate-fade-up opacity-0"
      style={{ animationDelay: `${animationDelay}s`, animationFillMode: 'forwards' }}
    >
      {/* Rounded square container with hover effect */}
      <div className="relative group">
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 overflow-hidden bg-white rounded-2xl border-2 border-transparent shadow-lg transition-all duration-300 group-hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/20">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
        </div>
        {/* Decorative border on hover */}
        <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-primary/0 rounded-2xl -z-10 transition-all duration-300 group-hover:border-primary/30" />
      </div>
      
      {/* Name and Position with white rounded rectangle */}
      <div className="mt-5 md:mt-6 text-center">
        <span className="inline-block bg-white/95 px-4 py-2 rounded-full shadow-sm">
          <p className="text-sm sm:text-base text-secondary font-bold">{name}</p>
          <p className="text-xs sm:text-sm text-primary font-semibold uppercase tracking-wide">{position}</p>
        </span>
      </div>
    </div>
  );
};

// Stacking college card component with scroll effect
const StackingCollegeCard = ({ 
  college,
  onClick,
  index,
  totalCards,
  scrollProgress
}: { 
  college: { id: string; name: string };
  onClick: () => void;
  index: number;
  totalCards: number;
  scrollProgress: number;
}) => {
  const shortName = college.id.toUpperCase();
  
  const displayName = shortName === 'COICT' ? 'CoICT' : 
    shortName === 'COACT' ? 'CoACT' :
    shortName === 'CET' ? 'CET' :
    shortName === 'COAST' ? 'CoAST' :
    shortName === 'COHBS' ? 'CoHBS' :
    shortName === 'COSTE' ? 'CoSTE' :
    shortName;

  // Calculate the card's position in the stack based on scroll progress
  const cardProgress = scrollProgress * totalCards;
  const cardOffset = index - cardProgress;
  
  // Calculate transforms
  const translateY = Math.max(0, cardOffset * 20); // Stack offset
  const scale = Math.max(0.85, 1 - Math.max(0, cardOffset) * 0.03);
  const opacity = Math.max(0, Math.min(1, 1 - Math.max(0, cardOffset - (totalCards - 2)) * 0.5));
  const zIndex = totalCards - index;

  return (
    <button
      onClick={onClick}
      className="w-full transition-all duration-300 ease-out"
      style={{ 
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        zIndex,
      }}
    >
      <Card 
        className="group cursor-pointer overflow-hidden bg-card border border-border/30 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
      >
        <CardContent className="p-5 md:p-6 lg:p-7 flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px] gap-1.5">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {displayName}
          </h3>
          <span className="text-xs md:text-sm text-primary/70 font-medium group-hover:text-primary transition-colors">
            View Leaders
          </span>
        </CardContent>
      </Card>
    </button>
  );
};

interface USRCSectionProps {
  onSelectCollege: (collegeId: string) => void;
}

const USRCSection = ({ onSelectCollege }: USRCSectionProps) => {
  const usrcLeaders = mustsoData.usrcLeaders as USRCLeader[];
  const colleges = mustsoData.colleges as College[];
  const [scrollProgress, setScrollProgress] = useState(0);
  const collegesSectionRef = useRef<HTMLDivElement>(null);

  // MRCC, Off-Campus, In-Campus are now in the colleges array in mustsoData.json
  const allCards = colleges.map(c => ({ id: c.id, name: c.name }));

  useEffect(() => {
    const handleScroll = () => {
      if (!collegesSectionRef.current) return;
      
      const section = collegesSectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      const scrollStart = viewportHeight * 0.3;
      const scrollEnd = -sectionHeight + viewportHeight * 0.7;
      
      const progress = (scrollStart - rect.top) / (scrollStart - scrollEnd);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          backgroundImage: `url('/usrc-hero-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark blue overlay - matching landing page transparency */}
        <div className="absolute inset-0 bg-secondary/70" />
        <GeometricPattern id="hero-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text */}
              <div className="text-center lg:text-left animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-primary">University Students</span>
                  <br />
                  <span className="text-white">Representative Council</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/70 font-light italic tracking-wide">
                  Bunge la Wanafunzi
                </p>
              </div>
              
              {/* Right Column - Image */}
              <div className="flex justify-center lg:justify-center animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                <div className="relative">
                  <img
                    src={/Spika.jpg}
                    alt="USRC Representative"
                    className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl shadow-black/30"
                  />
                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/30 rounded-2xl -z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USRC Leaders Section - No changes */}
      <section className="relative py-16 md:py-20 bg-muted/30 overflow-hidden">
        <GeometricPattern id="leaders-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center mb-12 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Council Leadership
            </h2>
            <p className="text-muted-foreground text-base">
              The executive team leading the student council
            </p>
          </div>
          
          {/* Leader cards in horizontal layout */}
          <div className="flex justify-center items-start gap-8 md:gap-12 lg:gap-16 flex-wrap">
            {usrcLeaders.map((leader, index) => (
              <USRCLeaderCard
                key={leader.id}
                name={leader.name}
                position={leader.title}
                image={leader.image}
                animationDelay={0.1 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Student Representatives Section - Dark Blue with Grey Pattern */}
      <section 
        ref={collegesSectionRef}
        className="relative py-16 md:py-24 bg-secondary overflow-hidden"
      >
        <GreyGeometricPattern id="colleges-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center mb-12 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              Student Representatives
            </h2>
            <p className="text-white/60 text-base italic">
              "Find your leader easily based on your college or location"
            </p>
          </div>
          
          {/* Colleges grid with stacking effect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 max-w-6xl mx-auto">
            {allCards.map((card, index) => (
              <StackingCollegeCard
                key={card.id}
                college={card}
                onClick={() => onSelectCollege(card.id)}
                index={index}
                totalCards={allCards.length}
                scrollProgress={scrollProgress}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default USRCSection;
