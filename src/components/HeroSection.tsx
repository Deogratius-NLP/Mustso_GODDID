import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mustsoLogo from '@/assets/mustso-logo.png';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="University Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <img
              src={mustsoLogo}
              alt="MUSTSO Logo"
              className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full bg-primary-foreground/10 backdrop-blur-sm p-2"
            />
          </div>

          {/* Title */}
          <h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-up opacity-0"
            style={{ animationDelay: '0.2s' }}
          >
            Mbeya University Students Organization
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up opacity-0"
            style={{ animationDelay: '0.3s' }}
          >
            Serving and empowering students through leadership, unity, and innovation.
          </p>

          {/* CTA Button */}
          <div 
            className="animate-fade-up opacity-0"
            style={{ animationDelay: '0.4s' }}
          >
            <Button
              size="lg"
              onClick={scrollToServices}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-6 text-lg rounded-xl shadow-strong transition-all duration-300 hover:-translate-y-1"
            >
              Explore Services
              <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
