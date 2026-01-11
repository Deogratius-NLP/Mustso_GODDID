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
      {/* Diamond shape container - larger on web */}
      <div className="relative group">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rotate-45 overflow-hidden bg-white border-2 border-white/30 shadow-lg transition-all duration-300 group-hover:border-white/60 group-hover:shadow-xl">
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
  // Get short name from the full name (e.g., "CoICT" from "College of Information...")
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
        className="group cursor-pointer overflow-hidden bg-muted/50 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      >
        <CardContent className="p-4 md:p-5 flex flex-col items-center justify-center min-h-[90px] gap-1">
          <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {displayName}
          </h3>
          <span className="text-xs text-primary/70 font-medium group-hover:text-primary transition-colors">
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

  // Additional representation areas
  const additionalAreas = [
    { id: 'mrcc', name: 'MRCC' },
    { id: 'off-campus', name: 'Off-Campus' },
    { id: 'in-campus', name: 'In-Campus' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-secondary py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Header text */}
          <div className="text-center mb-12 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-br from-primary via-primary to-white bg-clip-text text-transparent">
                Student University Representative Council
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white font-medium uppercase tracking-wider">
              BUNGE
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
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-12 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Student Representatives
            </h2>
            <p className="text-muted-foreground text-base italic">
              "Find your leader easily based on your college or location"
            </p>
          </div>
          
          {/* Colleges grid - tighter spacing on web */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
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
                <Card className="group cursor-pointer overflow-hidden bg-muted/50 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardContent className="p-6 flex items-center justify-center min-h-[80px]">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {area.name}
                    </h3>
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
