import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Heart, Scale, Users, Wallet, Trophy, Megaphone, Shield, Building, GraduationCap, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import mustsoData from '@/data/mustsoData.json';
import leaderPlaceholder from '@/assets/Gemini_Generated_Image_xgcqpnxgcqpnxgcq.png';

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

const isMinister = (title: string) => {
  return title.toLowerCase() === 'minister';
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
          {mustsoData.ministries.map((ministry, index) => {
            const minister = ministry.leaders.find(l => isMinister(l.title));
            const featuredLeader = minister || ministry.leaders[0];
            const otherLeaders = ministry.leaders.filter(l => l !== featuredLeader);

            return (
              <Card
                key={ministry.id}
                className="card-hover overflow-hidden animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Ministry Title Header */}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-accent text-accent-foreground">
                      {iconMap[ministry.id] || <BookOpen className="h-6 w-6" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg leading-tight text-card-foreground">
                        {ministry.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-xs mt-0.5">
                        {ministry.leaders.length} Leaders
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Large Featured Leader Image */}
                  {featuredLeader && (
                    <div className="space-y-4">
                      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg">
                        <img 
                          src={featuredLeader.image || leaderPlaceholder} 
                          alt={featuredLeader.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                      </div>
                      
                      {/* Leader Details Below Image */}
                      <div className="text-center bg-accent/40 rounded-xl py-4 px-3">
                        <h5 className="text-lg font-bold text-card-foreground">
                          {featuredLeader.name}
                        </h5>
                        <p className="text-sm text-primary font-semibold mt-1">
                          {featuredLeader.title}
                        </p>
                        <div className="flex flex-col items-center gap-1 mt-2">
                          <a
                            href={`tel:${featuredLeader.phone}`}
                            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {featuredLeader.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expandable Content */}
                  {expandedId === ministry.id && (
                    <div className="pt-4 border-t border-border animate-fade-in space-y-6 mt-4">
                      {/* Ministry Summary */}
                      <p className="text-sm text-muted-foreground">{ministry.summary}</p>
                      
                      {/* Key Functions */}
                      <div>
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

                      {/* Other Leaders - Text Only */}
                      {otherLeaders.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm text-foreground mb-3">Other Leaders:</h4>
                          <div className="space-y-2">
                            {otherLeaders.map((leader, lIndex) => (
                              <div key={lIndex} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                                <div>
                                  <p className="text-sm font-medium text-card-foreground">{leader.name}</p>
                                  <p className="text-xs text-muted-foreground">{leader.title}</p>
                                </div>
                                <a
                                  href={`tel:${leader.phone}`}
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {leader.phone}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MinistryCards;
