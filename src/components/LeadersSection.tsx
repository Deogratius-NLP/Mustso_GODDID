import { useState } from 'react';
import { Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import mustsoData from '@/data/mustsoData.json';

// Leader images
import leaderImage1 from '@/assets/leader-1.png';
import leaderImage2 from '@/assets/leader-2.png';
import leaderImage3 from '@/assets/leader-3.png';
import leaderImage4 from '@/assets/leader-4.png';

const leaderImages = [leaderImage1, leaderImage2, leaderImage3, leaderImage4];

interface Leader {
  title: string;
  name: string;
  phone: string;
  image?: string;
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

  // Check if leader is a Minister (main position with image)
  const isMinister = (title: string) => {
    return title.toLowerCase() === 'minister';
  };

  return (
    <section id="contacts" className="pt-24 pb-16 md:pt-28 md:pb-20 bg-muted min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="gradient-text">Leaders</span>
          </h1>
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
          {filteredMinistries.map((ministry, mIndex) => {
            const minister = ministry.leaders.find(l => isMinister(l.title));
            // If no minister, use the first deputy/other leader as the featured leader
            const featuredLeader = minister || ministry.leaders[0];
            const otherLeaders = ministry.leaders.filter(l => l !== featuredLeader);

            return (
              <div
                key={ministry.id}
                className="animate-fade-up opacity-0"
                style={{ animationDelay: `${mIndex * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                  {ministry.name}
                </h3>

                {/* Featured Leader - Large Profile Card with Image */}
                {featuredLeader && (
                  <Card className="mb-6 profile-card">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        {/* Large Image - Uses imported images */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 border-primary flex-shrink-0">
                          <img 
                            src={leaderImages[mIndex % leaderImages.length]} 
                            alt={featuredLeader.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-primary font-semibold mb-1">
                            {featuredLeader.title}
                          </p>
                          <h4 className="text-xl md:text-2xl font-bold text-card-foreground mb-2">
                            {featuredLeader.name}
                          </h4>
                          <a
                            href={`tel:${featuredLeader.phone}`}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {featuredLeader.phone}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Deputy Ministers & Secretaries - Text Only */}
                {otherLeaders.length > 0 && (
                  <div className="bg-card rounded-lg border p-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                      Ministry Team
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {otherLeaders.map((leader, lIndex) => (
                        <div
                          key={lIndex}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-accent transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-card-foreground text-sm truncate">
                              {leader.name}
                            </p>
                            <p className="text-xs text-primary">
                              {leader.title}
                            </p>
                          </div>
                          <a
                            href={`tel:${leader.phone}`}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors flex-shrink-0 ml-2"
                          >
                            <Phone className="w-3 h-3" />
                            <span className="hidden sm:inline">{leader.phone}</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LeadersSection;