import LeaderCard from '@/components/LeaderCard';
import mustsoData from '@/data/mustsoData.json';
import Presda from '@/assets/Presda.jpg';
import VicePresda from '@/assets/Vice_presda.jpeg';
import Godfrey from '@/assets/godfrey.jpeg';
import Venance from '@/assets/Venance.png';
import placeholderImg from '@/assets/Gemini_Generated_Image_xgcqpnxgcqpnxgcq.png';

interface Executive {
  id: number;
  name: string;
  title: string;
  image: string;
}

const imageMap: Record<string, string> = {
  "Presda.jpg": Presda,
  "Vice_presda.jpeg": VicePresda,
  "godfrey.jpeg": Godfrey,
  "Venance.png": Venance
};
  
const TopExecutivesSection = () => {
  const executives: Executive[] = (mustsoData as any).executives || [];

  return (
    <section className="section-padding relative" style={{ background: 'var(--gradient-executives)' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Top <span className="gradient-text">Executives</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The executive leadership of MUSTSO student government.
          </p>
        </div>

        {/* Executives Grid - 5 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {executives.map((executive, index) => (
            <LeaderCard
              key={executive.id}
              name={executive.name}
              title={executive.title}
              image={executive.image}
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
