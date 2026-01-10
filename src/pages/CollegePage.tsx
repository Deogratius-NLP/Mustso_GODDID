import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import usrcData from '@/data/usrcData.json';

const placeholderImage = '/fallback news image.png';

interface Leader {
  id: string;
  name: string;
  position: string;
  image: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
}

// Leader card component for college page
const LeaderCard = ({ 
  leader,
  animationDelay = 0 
}: { 
  leader: Leader;
  animationDelay?: number;
}) => {
  const imageSrc = leader.image || placeholderImage;
  
  return (
    <Card 
      className="group overflow-hidden bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg animate-fade-up opacity-0"
      style={{ animationDelay: `${animationDelay}s`, animationFillMode: 'forwards' }}
    >
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Diamond image */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rotate-45 overflow-hidden rounded-xl border-2 border-primary/30 shadow-md">
              <img
                src={imageSrc}
                alt={leader.name}
                className="w-full h-full object-cover -rotate-45 scale-[1.42]"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderImage;
                }}
              />
            </div>
          </div>
          
          {/* Leader info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-foreground">{leader.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{leader.position}</p>
            
            {/* Contact info */}
            <div className="mt-4 flex flex-col gap-2">
              {leader.phone && (
                <a 
                  href={`tel:${leader.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{leader.phone}</span>
                </a>
              )}
              {leader.whatsapp && (
                <a 
                  href={`https://wa.me/${leader.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
              {leader.email && (
                <a 
                  href={`mailto:${leader.email}`}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{leader.email}</span>
                </a>
              )}
              {!leader.phone && !leader.email && !leader.whatsapp && (
                <span className="text-sm text-muted-foreground italic">Contact info not available</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CollegePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const colleges = usrcData.usrc.colleges as Record<string, {
    name: string;
    shortName: string;
    slug: string;
    leaders: Leader[];
  }>;
  
  const college = slug ? colleges[slug] : null;

  if (!college) {
    return (
      <div className="min-h-screen">
        <Navbar activeSection="usrc" onNavigate={() => {}} />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">College Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The college you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/usrc">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to USRC
              </Button>
            </Link>
          </div>
        </main>
        <Footer activeSection="usrc" onNavigate={() => {}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar activeSection="usrc" onNavigate={() => {}} />
      
      {/* Hero Section */}
      <section className="relative bg-secondary pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <Link 
            to="/usrc" 
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to USRC</span>
          </Link>
          
          {/* Diamond image placeholder */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rotate-45 overflow-hidden rounded-2xl border-4 border-primary/30 shadow-lg bg-background/10">
                <div className="w-full h-full -rotate-45 scale-[1.42] flex items-center justify-center">
                  <span className="text-primary-foreground/50 text-4xl font-bold">{college.shortName}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Header text */}
          <div className="text-center animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              {college.name}
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/80 font-medium">
              Student Leaders
            </p>
          </div>
        </div>
      </section>

      {/* Leaders Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-12 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {college.shortName} Representatives
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet your student leaders and get in touch with them
            </p>
          </div>
          
          {/* Leaders grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {college.leaders.map((leader, index) => (
              <LeaderCard
                key={leader.id}
                leader={leader}
                animationDelay={0.1 + index * 0.05}
              />
            ))}
          </div>
          
          {college.leaders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No leaders have been added yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer activeSection="usrc" onNavigate={() => {}} />
    </div>
  );
};

export default CollegePage;
