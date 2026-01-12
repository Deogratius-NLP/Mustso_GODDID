import { Card, CardContent } from '@/components/ui/card';
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

// SVG Background Pattern Component
const GeometricPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.03]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="geometric-pattern"
        x="0"
        y="0"
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M30 0L60 30L30 60L0 30Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
        />
        <circle
          cx="30"
          cy="30"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
  </svg>
);

// Diamond-shaped leader card component
const DiamondLeaderCard = ({ 
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
      {/* Diamond shape container with hover effect */}
      <div className="relative group">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rotate-45 overflow-hidden bg-white border-2 border-transparent shadow-lg transition-all duration-300 group-hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/20">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover -rotate-45 scale-[1.42]"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
        </div>
      </div>
      
      {/* Position title with white rounded rectangle */}
      <div className="mt-6 md:mt-8 text-center">
        <span className="inline-block bg-white/95 px-4 py-1.5 rounded-full shadow-sm">
          <p className="text-xs sm:text-sm text-secondary font-semibold uppercase tracking-wide">{position}</p>
        </span>
      </div>
    </div>
  );
};

// College card component
const CollegeCard = ({ 
  college,
  onClick,
  animationDelay = 0 
}: { 
  college: College;
  onClick: () => void;
  animationDelay?: number;
}) => {
  const shortName = college.id.toUpperCase();
  
  const displayName = shortName === 'COICT' ? 'CoICT' : 
    shortName === 'COACT' ? 'CoACT' :
    shortName === 'CET' ? 'CET' :
    shortName === 'COAST' ? 'CoAST' :
    shortName === 'COHBS' ? 'CoHBS' :
    shortName === 'COSTE' ? 'CoSTE' :
    shortName;
  
  return (
    <button
      onClick={onClick}
      className="w-full animate-fade-up opacity-0"
      style={{ animationDelay: `${animationDelay}s`, animationFillMode: 'forwards' }}
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

  const additionalAreas = [
    { id: 'mrcc', name: 'MRCC' },
    { id: 'off-campus', name: 'Off-Campus' },
    { id: 'in-campus', name: 'In-Campus' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section - Two Column Layout */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/90 py-16 md:py-24 overflow-hidden">
        <GeometricPattern />
        <div className="container mx-auto px-4 relative z-10">
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
            <div className="flex justify-center lg:justify-end animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="relative">
                <img
                  src={fallbackImage}
                  alt="USRC Representative"
                  className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl shadow-black/30"
                />
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/30 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USRC Leaders Section */}
      <section className="relative py-16 md:py-20 bg-muted/30 overflow-hidden">
        <GeometricPattern />
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
              <DiamondLeaderCard
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

      {/* Student Representatives Section */}
      <section className="relative py-16 md:py-24 bg-muted/30 overflow-hidden">
        <GeometricPattern />
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center mb-12 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Student Representatives
            </h2>
            <p className="text-muted-foreground text-base italic">
              "Find your leader easily based on your college or location"
            </p>
          </div>
          
          {/* Colleges grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 max-w-6xl mx-auto">
            {colleges.map((college, index) => (
              <CollegeCard
                key={college.id}
                college={college}
                onClick={() => onSelectCollege(college.id)}
                animationDelay={0.1 + index * 0.05}
              />
            ))}
            {/* Additional areas */}
            {additionalAreas.map((area, index) => (
              <button
                key={area.id}
                onClick={() => onSelectCollege(area.id)}
                className="w-full animate-fade-up opacity-0"
                style={{ animationDelay: `${0.1 + (colleges.length + index) * 0.05}s`, animationFillMode: 'forwards' }}
              >
                <Card className="group cursor-pointer overflow-hidden bg-card border border-border/30 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <CardContent className="p-5 md:p-6 lg:p-7 flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px] gap-1.5">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {area.name}
                    </h3>
                    <span className="text-xs md:text-sm text-primary/70 font-medium group-hover:text-primary transition-colors">
                      View Leaders
                    </span>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default USRCSection;
