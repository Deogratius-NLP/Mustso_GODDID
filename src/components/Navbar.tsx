import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mustsoLogo from '@/assets/mustso-logo.png';

type ActiveSection = 'home' | 'usrc' | 'judiciary' | 'newsroom' | 'pastleaders';

interface NavbarProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
}

const navItems: { label: string; section: ActiveSection | 'services' }[] = [
  { label: 'Home', section: 'home' },
  { label: 'Services', section: 'services' },
  // USRC (temporarily hidden)
  // { label: 'USRC', section: 'usrc' },
  // Judiciary (temporarily hidden)
  // { label: 'Judiciary', section: 'judiciary' },
  { label: 'Newsroom', section: 'newsroom' },
  { label: 'Past Leaders', section: 'pastleaders' },
];

const Navbar = ({ activeSection, onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: ActiveSection | 'services') => {
    if (section === 'services') {
      // Navigate to home and scroll to services
      onNavigate('home');
      setTimeout(() => {
        const element = document.querySelector('#services');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      onNavigate(section);
    }
    setIsOpen(false);
  };

  const isActive = (section: ActiveSection | 'services') => {
    if (section === 'services') return false;
    return activeSection === section;
  };

  // Show transparent bg only on home page when not scrolled
  const showTransparent = activeSection === 'home' && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showTransparent
          ? 'bg-transparent'
          : 'bg-card/95 backdrop-blur-md shadow-medium'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3"
          >
            <img src={mustsoLogo} alt="MUSTSO Logo" className="h-10 md:h-12 w-auto" />
            <span className={`font-bold text-lg hidden sm:block transition-colors ${
              showTransparent ? 'text-primary-foreground' : 'text-primary'
            }`}>
              MUSTSO
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.section)
                    ? 'bg-primary text-primary-foreground'
                    : showTransparent
                    ? 'text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10'
                    : 'text-foreground hover:text-primary hover:bg-accent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${showTransparent ? 'text-primary-foreground' : 'text-foreground'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-card shadow-strong animate-fade-in">
            <div className="flex flex-col py-4">
              {navItems.map((item, index) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className={`px-6 py-3 text-left transition-colors ${
                    isActive(item.section)
                      ? 'text-primary bg-accent'
                      : 'text-foreground hover:text-primary hover:bg-accent'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
