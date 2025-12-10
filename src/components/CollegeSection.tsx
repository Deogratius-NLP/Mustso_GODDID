import { useState } from 'react';
import { ChevronDown, ChevronUp, User, Phone, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import mustsoData from '@/data/mustsoData.json';

// Leader images - reuse for college leaders
import leaderImage1 from '@/assets/leader-1.png';
import leaderImage2 from '@/assets/leader-2.png';
import leaderImage3 from '@/assets/leader-3.png';
import leaderImage4 from '@/assets/leader-4.png';

const leaderImages = [leaderImage1, leaderImage2, leaderImage3, leaderImage4];

interface CollegeLeader {
  name: string;
  title: string;
  phone: string;
  image?: string;
}

interface DeptLeader {
  name: string;
  phone: string;
}

interface Department {
  name: string;
  leader?: DeptLeader;
}

interface College {
  id: string;
  name: string;
  leader?: CollegeLeader;
  departments: Department[];
}

const CollegeSection = () => {
  const [openColleges, setOpenColleges] = useState<string[]>([]);

  const toggleCollege = (collegeId: string) => {
    setOpenColleges((prev) =>
      prev.includes(collegeId)
        ? prev.filter((id) => id !== collegeId)
        : [...prev, collegeId]
    );
  };

  const colleges = mustsoData.colleges as College[];

  return (
    <section id="colleges" className="pt-24 pb-16 md:pt-28 md:pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            College <span className="gradient-text">Representatives</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Student leadership across all colleges and departments at MUST.
          </p>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {colleges.map((college, index) => (
            <Card
              key={college.id}
              className="card-hover animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <Collapsible
                open={openColleges.includes(college.id)}
                onOpenChange={() => toggleCollege(college.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-secondary text-secondary-foreground">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg leading-tight text-card-foreground">
                          {college.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {college.departments.length} Departments
                        </p>
                      </div>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        {openColleges.includes(college.id) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  {/* College Leader - Large Image Card */}
                  {college.leader && college.leader.name && (
                    <div className="mt-4 p-4 rounded-lg bg-accent">
                      <div className="flex items-center gap-4">
                        {/* Large Image - Uses imported images */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-primary flex-shrink-0">
                          <img 
                            src={leaderImages[index % leaderImages.length]} 
                            alt={college.leader.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-accent-foreground text-lg">
                            {college.leader.name}
                          </h4>
                          <p className="text-sm text-primary font-medium">
                            {college.leader.title}
                          </p>
                          <a
                            href={`tel:${college.leader.phone}`}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mt-2"
                          >
                            <Phone className="w-4 h-4" />
                            {college.leader.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </CardHeader>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <h4 className="font-semibold text-foreground mb-4">Department Representatives</h4>
                    <div className="space-y-2">
                      {college.departments.map((dept, dIndex) => (
                        <div
                          key={dIndex}
                          className="p-3 rounded-lg bg-muted"
                        >
                          <h5 className="font-medium text-foreground text-sm mb-1">
                            {dept.name}
                          </h5>
                          {dept.leader && dept.leader.name && (
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <span>{dept.leader.name}</span>
                              {dept.leader.phone && (
                                <a
                                  href={`tel:${dept.leader.phone}`}
                                  className="flex items-center gap-1 hover:text-primary transition-colors"
                                >
                                  <Phone className="w-3 h-3" />
                                  {dept.leader.phone}
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeSection;