import { Card, CardContent } from '@/components/ui/card';
import mustsoData from '@/data/mustsoData.json';

// Import leader images for placeholders
import leader1 from '@/assets/leader-1.png';
import leader2 from '@/assets/leader-2.png';
import leader3 from '@/assets/leader-3.png';
import leader4 from '@/assets/leader-4.png';

const leaderImages = [leader1, leader2, leader3, leader4];

interface PastLeader {
  id: number;
  name: string;
  title: string;
}

const PastLeadersSection = () => {
  const pastLeaders: PastLeader[] = (mustsoData as any).pastLeaders || [];

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Past <span className="gradient-text">Leaders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Honoring those who served and contributed to the growth of MUSTSO.
          </p>
        </div>

        {/* Past Leaders Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {pastLeaders.map((leader, index) => (
            <Card
              key={leader.id}
              className="card-hover overflow-hidden animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-4 text-center">
                {/* Image Placeholder */}
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden border-2 border-primary mb-3">
                  <img 
                    src={leaderImages[index % leaderImages.length]} 
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Leader Info */}
                <h4 className="text-sm md:text-base font-bold text-card-foreground mb-1 line-clamp-2">
                  {leader.name}
                </h4>
                <p className="text-xs md:text-sm text-primary font-medium">
                  {leader.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {pastLeaders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Past leaders data coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PastLeadersSection;