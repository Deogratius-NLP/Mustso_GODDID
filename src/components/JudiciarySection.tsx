import LeaderCard from '@/components/LeaderCard';
import mustsoData from '@/data/mustsoData.json';

interface JudiciaryLeader {
  id: number;
  name: string;
  title: string;
  phone?: string;
  email?: string;
}

const JudiciarySection = () => {
  const topLeaders: JudiciaryLeader[] = (mustsoData as any).judiciaryTopLeaders || [];
  const members: JudiciaryLeader[] = (mustsoData as any).judiciaryMembers || [];

  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The <span className="gradient-text">Judiciary</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The judicial arm of MUSTSO ensuring justice and upholding the constitution.
          </p>
        </div>

        {/* Top Judiciary Leaders - Executive Style (No Contacts) */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Top <span className="gradient-text">Judicial Leaders</span>
            </h2>
            <p className="text-muted-foreground">The highest ranking judicial officers.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {topLeaders.map((leader, index) => (
              <LeaderCard
                key={leader.id}
                name={leader.name}
                title={leader.title}
                showContact={false}
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Remaining Judiciary Members - With Contacts */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Judicial <span className="gradient-text">Members</span>
            </h2>
            <p className="text-muted-foreground">Members serving in the MUSTSO judiciary.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {members.map((member, index) => (
              <LeaderCard
                key={member.id}
                name={member.name}
                title={member.title}
                phone={member.phone}
                email={member.email}
                showContact={true}
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {members.length === 0 && topLeaders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Judiciary data coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default JudiciarySection;