import { useState } from 'react';
import { Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import mustsoData from '@/data/mustsoData.json';

interface Leader {
  title: string;
  name: string;
  phone: string;
  email: string;
}

interface Ministry {
  id: string;
  name: string;
  leaders: Leader[];
}

const LeadersSection = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<string>('all');

  const ministriesWithLeaders = mustsoData.ministries.filter(
    (ministry) => ministry.leaders && ministry.leaders.length > 0
  ) as Ministry[];

  const filteredMinistries = selectedMinistry === 'all'
    ? ministriesWithLeaders
    : ministriesWithLeaders.filter((m) => m.id === selectedMinistry);

  return (
    <section id="contacts" className="section-padding bg-muted">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="gradient-text">Leaders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Meet the dedicated leaders serving in various MUSTSO ministries.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={selectedMinistry === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMinistry('all')}
            className="rounded-full"
          >
            All Ministries
          </Button>
          {ministriesWithLeaders.map((ministry) => (
            <Button
              key={ministry.id}
              variant={selectedMinistry === ministry.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMinistry(ministry.id)}
              className="rounded-full"
            >
              {ministry.name.replace('Ministry of ', '')}
            </Button>
          ))}
        </div>

        {/* Leaders Grid */}
        <div className="space-y-12">
          {filteredMinistries.map((ministry, mIndex) => (
            <div
              key={ministry.id}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${mIndex * 0.1}s` }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                {ministry.name}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {ministry.leaders.map((leader, lIndex) => (
                  <Card
                    key={lIndex}
                    className="profile-card group"
                  >
                    <CardContent className="p-4 text-center">
                      {/* Avatar */}
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                        <User className="w-8 h-8 text-accent-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>

                      {/* Info */}
                      <h4 className="font-semibold text-card-foreground text-sm mb-1">
                        {leader.name}
                      </h4>
                      <p className="text-xs text-primary font-medium mb-3">
                        {leader.title}
                      </p>

                      {/* Contact */}
                      <div className="space-y-1">
                        <a
                          href={`tel:${leader.phone}`}
                          className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          {leader.phone}
                        </a>
                        <a
                          href={`mailto:${leader.email}`}
                          className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors truncate"
                        >
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{leader.email}</span>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadersSection;
