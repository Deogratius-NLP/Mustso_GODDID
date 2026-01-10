import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import usrcData from '@/data/usrcData.json';

const placeholderImage = '/fallback news image.png';

// Diamond-shaped leader card component
const DiamondLeaderCard = ({ 
  name, 
  position, 
  image,
  animationDelay = 0 
}: { 
  name: string; 
  position: string; 
  image: string;
  animationDelay?: number;
}) => {
  const imageSrc = image || placeholderImage;
  
  return (
    <div 
      className="flex flex-col items-center animate-fade-up opacity-0"
      style={{ animationDelay: `${animationDelay}s`, animationFillMode: 'forwards' }}
    >
      {/* Diamond shape container */}
      <div className="relative group">
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rotate-45 overflow-hidden rounded-2xl border-4 border-primary/30 shadow-lg transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-xl">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover -rotate-45 scale-[1.42]"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderImage;
            }}
          />
        </div>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rotate-45 rounded-2xl bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
      </div>
      
      {/* Name and position */}
      <div className="mt-6 text-center">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary-foreground">{name}</h3>
        <p className="text-xs sm:text-sm md:text-base text-primary-foreground/70 mt-1">{position}</p>
      </div>
    </div>
  );
};

// College card component
const CollegeCard = ({ 
  shortName, 
  fullName,
  slug,
  animationDelay = 0 
}: { 
  shortName: string; 
  fullName: string;
  slug: string;
  animationDelay?: number;
}) => {
  return (
    <Link to={`/usrc/colleges/${slug}`}>
      <Card 
        className="group cursor-pointer overflow-hidden bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-up opacity-0"
        style={{ animationDelay: `${animationDelay}s`, animationFillMode: 'forwards' }}
      >
        <CardContent className="p-6 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
            {shortName}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {fullName}
          </p>
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center text-xs font-medium text-primary/70 group-hover:text-primary transition-colors">
              View Leaders →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const USRCPage = () => {
  const { topLeaders, colleges } = usrcData.usrc;
  const collegeList = Object.values(colleges);

  return (
    <div className="min-h-screen">
      <Navbar activeSection="usrc" onNavigate={() => {}} />
      
      {/* Hero Section */}
      <section className="relative bg-secondary pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header text */}
          <div className="text-center mb-12 md:mb-16 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              University Student Representative Council
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/80 font-medium">
              (USRC)
            </p>
            <div className="mt-4">
              <span className="inline-block px-6 py-2 bg-primary/20 rounded-full text-primary-foreground/90 text-lg font-semibold">
                Bunge
              </span>
            </div>
          </div>
          
          {/* Leader cards in horizontal layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
            {topLeaders.map((leader, index) => (
              <DiamondLeaderCard
                key={leader.id}
                name={leader.name}
                position={leader.position}
                image={leader.image}
                animationDelay={0.1 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Colleges & Representation Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-12 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Student Representation by Colleges
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find your leader easily based on your college or location
            </p>
          </div>
          
          {/* Colleges grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {collegeList.map((college, index) => (
              <CollegeCard
                key={college.slug}
                shortName={college.shortName}
                fullName={college.name}
                slug={college.slug}
                animationDelay={0.1 + index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer activeSection="usrc" onNavigate={() => {}} />
    </div>
  );
};

export default USRCPage;
