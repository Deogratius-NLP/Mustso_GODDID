import LeaderCard from '@/components/LeaderCard';
import mustsoData from '@/data/mustsoData.json';
import placeholderImg from '@/assets/Gemini_Generated_Image_xgcqpnxgcqpnxgcq.png';

const TopExecutivesSection = () => {
  const executives = (mustsoData as any).executives || [];

  return (
    <section className="section-padding relative" style={{ background: 'var(--gradient-executives)' }}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Top <span className="gradient-text">Executives</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The executive leadership of MUSTSO student government.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {executives.map((exec, index) => (
            <LeaderCard
              key={exec.id}
              name={exec.name}
              title={exec.title}
              image={imageMap[exec.image] ?? placeholderImg} // auto-resolve
              showContact={false}
              animationDelay={index * 0.1}
            />
          ))}
        </div>

        {executives.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Executive data coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopExecutivesSection;
