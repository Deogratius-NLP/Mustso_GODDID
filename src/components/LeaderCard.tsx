import { Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import placeholderImg from '@/assets/Gemini_Generated_Image_xgcqpnxgcqpnxgcq.png';

interface LeaderCardProps {
  name: string;
  title: string;
  phone?: string;
  email?: string;
  showContact?: boolean;
  className?: string;
  animationDelay?: number;
  showAnimatedBorder?: boolean;
  image?: string;
}

const LeaderCard = ({ 
  name, 
  title, 
  phone, 
  email, 
  showContact = true,
  className = '',
  animationDelay = 0,
  showAnimatedBorder = true,
  image
}: LeaderCardProps) => {
  const imageSrc = image && image.trim() !== '' ? image : placeholderImg;

  return (
    <div
      className={`relative group animate-fade-up opacity-0 ${className}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Animated border container - only for leader cards */}
      {showAnimatedBorder && (
        <div className="absolute -inset-[2px] rounded-xl overflow-hidden">
          <div className="animated-border-glow" />
        </div>
      )}
      
      <Card className="relative overflow-hidden bg-card border-0 h-full">
        <CardContent className="p-4">
          {/* Large Image */}
          <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg mb-4">
            <img 
              src={imageSrc} 
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
    </div>
  );
};

export default LeaderCard;
