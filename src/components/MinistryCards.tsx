import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Heart, Scale, Users, Wallet, Trophy, Megaphone, Shield, Building, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import mustsoData from '@/data/mustsoData.json';

const iconMap: Record<string, React.ReactNode> = {
  education: <BookOpen className="h-8 w-8" />,
  health_food_environment: <Heart className="h-8 w-8" />,
  legal_affairs: <Scale className="h-8 w-8" />,
  gender_religion_ethics: <Users className="h-8 w-8" />,
  finance_planning: <Wallet className="h-8 w-8" />,
  sports_entertainment_culture: <Trophy className="h-8 w-8" />,
  information_public_relations: <Megaphone className="h-8 w-8" />,
  defense_security_disaster: <Shield className="h-8 w-8" />,
  infrastructure_accommodation: <Building className="h-8 w-8" />,
  student_loans: <GraduationCap className="h-8 w-8" />,
};

const MinistryCards = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="gradient-text">Ministries</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            MUSTSO operates through various ministries, each dedicated to serving specific student needs and promoting excellence.
          </p>
        </div>

        {/* Ministry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mustsoData.ministries.map((ministry, index) => (
            <Card
              key={ministry.id}
              className="card-hover overflow-hidden animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent text-accent-foreground">
                    {iconMap[ministry.id] || <BookOpen className="h-8 w-8" />}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight text-card-foreground">
                      {ministry.name}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4">
                  {ministry.summary}
                </CardDescription>

                {/* Expandable Functions */}
                {expandedId === ministry.id && (
                  <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                    <h4 className="font-semibold text-sm text-foreground mb-3">Key Functions:</h4>
                    <ul className="space-y-2">
                      {ministry.functions.map((func, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {func}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(ministry.id)}
                  className="w-full mt-4 text-primary hover:text-primary hover:bg-accent"
                >
                  {expandedId === ministry.id ? (
                    <>
                      Show Less <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View Details <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinistryCards;
