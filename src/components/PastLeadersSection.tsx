import LeaderCard from '@/components/LeaderCard';
import mustsoData from '@/data/mustsoData.json';

interface PastLeader {
  id: number;
  name: string;
  title: string;
}

const PastLeadersSection = () => {
  const pastLeaders: PastLeader[] = (mustsoData as any).pastLeaders || [];

  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Past <span className="gradient-text">Leaders</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Honoring those who served and contributed to the growth of MUSTSO.
          </p>
        </div>

        {/* Past Leaders Grid - 13 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {pastLeaders.map((leader, index) => (
            <LeaderCard
              key={leader.id}
              name={leader.name}
              title={leader.title}
              showContact={false}
              animationDelay={index * 0.05}
            />
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
