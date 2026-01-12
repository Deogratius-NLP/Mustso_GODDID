import { ArrowLeft, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mustsoData from '@/data/mustsoData.json';
import fallbackImage from '@/assets/Gemini_Generated_Image_xgcqpnxgcqpnxgcq.png';
import { GeometricPattern } from './USRCSection';

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

interface CollegeDetailSectionProps {
  collegeId: string;
  onBack: () => void;
}

const CollegeDetailSection = ({ collegeId, onBack }: CollegeDetailSectionProps) => {
  const colleges = mustsoData.colleges as College[];
  const college = colleges.find(c => c.id === collegeId);

  // Handle additional areas that aren't in the colleges data
  const additionalAreas: Record<string, { name: string; leader: { name: string; title: string }; departments: Array<{ name: string; leader: { name: string; phone: string } }> }> = {
    'mrcc': {
      name: 'Mbeya Regional Campus College (MRCC)',
      leader: { name: 'Representative TBA', title: 'MRCC Representative' },
      departments: []
    },
    'off-campus': {
      name: 'Off-Campus Students',
      leader: { name: 'Representative TBA', title: 'Off-Campus Representative' },
      departments: []
    },
    'in-campus': {
      name: 'In-Campus Students',
      leader: { name: 'Representative TBA', title: 'In-Campus Representative' },
      departments: []
    }
  };

  const collegeData = college || additionalAreas[collegeId];

  if (!collegeData) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">College Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The college you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to USRC
          </Button>
        </div>
      </div>
    );
  }

  // Extract short name from college name
  const getShortName = (name: string) => {
    const match = name.match(/\(([^)]+)\)/);
    return match ? match[1] : name;
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-secondary py-12 md:py-20 overflow-hidden">
        <GeometricPattern id="college-hero-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to USRC</span>
          </button>
          
          <div className="text-center">
            {/* College Full Name */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 animate-fade-up opacity-0 px-2" style={{ animationFillMode: 'forwards' }}>
              {collegeData.name}
            </h1>
            
            {/* Diamond image placeholder */}
            <div className="flex justify-center mb-6 animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <div className="relative">
                <div className="w-28 h-28 md:w-36 md:h-36 rotate-45 overflow-hidden bg-white border-2 border-white/30 shadow-lg">
                  <img
                    src={fallbackImage}
                    alt={collegeData.leader.name}
                    className="w-full h-full object-cover -rotate-45 scale-[1.42]"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* College Leader Name */}
            <p className="text-lg sm:text-xl text-white/90 font-medium animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              {collegeData.leader.name}
            </p>
          </div>
        </div>
      </section>

      {/* Departments List Section */}
      <section className="relative py-8 md:py-12 bg-muted/30 overflow-hidden">
        <GeometricPattern id="college-depts-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Departments Card */}
            <div className="bg-muted/30 rounded-2xl overflow-hidden shadow-sm animate-fade-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              {collegeData.departments && collegeData.departments.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {collegeData.departments.map((dept, index) => (
                    <div 
                      key={index} 
                      className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm md:text-base">
                          {dept.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Name: {dept.leader.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a 
                          href={`tel:${dept.leader.phone}`}
                          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{dept.leader.phone}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No department leaders have been added yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollegeDetailSection;
