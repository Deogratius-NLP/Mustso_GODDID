import { Card, CardContent } from '@/components/ui/card';
import placeholderImg from '@/assets/Gemini_Generated_Image_xgcqpnxgcqpnxgcq.png';

// USRC Top Leaders data
const usrcLeaders = [
  { name: 'Council Speaker', title: 'Speaker of the Council', image: null },
  { name: 'Deputy Speaker', title: 'Deputy Speaker', image: null },
  { name: 'Secretary USRC', title: 'Secretary – USRC', image: null },
  { name: 'Chairman USRC', title: 'Chairman – USRC', image: null },
];

// College data for the grid
const colleges = [
  { id: 'coict', name: 'CoICT', fullName: 'College of Information and Communication Technologies' },
  { id: 'coact', name: 'CoACT', fullName: 'College of Architecture and Construction Technology' },
  { id: 'cet', name: 'CET', fullName: 'College of Engineering and Technology' },
  { id: 'coast', name: 'CoAST', fullName: 'College of Applied Sciences and Technology' },
  { id: 'cohbs', name: 'CoHBS', fullName: 'College of Health and Biomedical Sciences' },
  { id: 'mrcc', name: 'MRCC', fullName: 'Mbeya Regional Campus College' },
  { id: 'coste', name: 'CoSTE', fullName: 'College of Science and Technology Education' },
  { id: 'off-campus', name: 'Off-Campus', fullName: 'Off-Campus Representatives' },
  { id: 'in-campus', name: 'In-Campus', fullName: 'In-Campus Representatives' },
];

// Diamond-shaped leader card component
const DiamondLeaderCard = ({ 
  name, 
  title, 
  image,
  animationDelay = 0 
}: { 
  name: string; 
  title: string; 
  image: string | null;
  animationDelay?: number;
}) => {
  const imageSrc = image || placeholderImg;
  
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
          />
        </div>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rotate-45 rounded-2xl bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
      </div>
      
      {/* Name and title */}
      <div className="mt-6 text-center">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary-foreground">{name}</h3>
        <p className="text-xs sm:text-sm md:text-base text-primary-foreground/70 mt-1">{title}</p>
      </div>
    </div>
  );
};

// College card component
const CollegeCard = ({ 
  name, 
  fullName,
  animationDelay = 0 
}: { 
  name: string; 
  fullName: string;
  animationDelay?: number;
}) => {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-up opacity-0"
      style={{ animationDelay: `${animationDelay}s`, animationFillMode: 'forwards' }}
    >
      <CardContent className="p-6 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
          {name}
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
  );
};

const USRCSection = () => {
  return (
    <div className="min-h-screen">
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
            {usrcLeaders.map((leader, index) => (
              <DiamondLeaderCard
                key={leader.title}
                name={leader.name}
                title={leader.title}
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
            {colleges.map((college, index) => (
              <CollegeCard
                key={college.id}
                name={college.name}
                fullName={college.fullName}
                animationDelay={0.1 + index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default USRCSection;
