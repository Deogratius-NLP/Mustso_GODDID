import LeaderCard from '@/components/LeaderCard';
import mustsoData from '@/data/mustsoData.json';

interface Executive {
  id: number;
  name: string;
  title: string;
}

const TopExecutivesSection = () => {
  const executives: Executive[] = (mustsoData as any).executives || [];

  return (
    <section className="section-padding relative" style={{ background: 'var(--gradient-executives)' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Top <span className="gradient-text">Executives</span>
          </h2>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-lg">
            The executive leadership of MUSTSO student government.
          </p>
        </div>

        {/* Executives Grid - 5 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {executives.map((executive, index) => (
            <LeaderCard
              key={executive.id}
              name={executive.name}
              title={executive.title}
              showContact={false}
              animationDelay={index * 0.1}
            />
          ))}
        </div>

        {executives.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary-foreground/70">Executive data coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopExecutivesSection;
