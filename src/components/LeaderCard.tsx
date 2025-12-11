import { Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import leaderPlaceholder from '@/assets/leader-placeholder.png';

interface LeaderCardProps {
  name: string;
  title: string;
  phone?: string;
  email?: string;
  showContact?: boolean;
  className?: string;
  animationDelay?: number;
}

const LeaderCard = ({ 
  name, 
  title, 
  phone, 
  email, 
  showContact = true,
  className = '',
  animationDelay = 0
}: LeaderCardProps) => {
  return (
    <Card
      className={`card-hover overflow-hidden animate-fade-up opacity-0 ${className}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <CardContent className="p-4">
        {/* Large Image */}
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg mb-4">
          <img 
            src={leaderPlaceholder} 
            alt={name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
        
        {/* Leader Details */}
        <div className="text-center space-y-2">
          <h4 className="text-lg font-bold text-card-foreground line-clamp-2">
            {name}
          </h4>
          <p className="text-sm text-primary font-semibold">
            {title}
          </p>
          
          {showContact && (phone || email) && (
            <div className="pt-2 space-y-1">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {email}
                </a>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderCard;
