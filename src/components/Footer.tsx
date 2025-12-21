import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import mustsoLogo from '@/assets/mustso-logo.png';

type ActiveSection = 'home' | 'usrc' | 'judiciary' | 'newsroom' | 'pastleaders';

interface FooterProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const quickLinks: { label: string; section: ActiveSection | 'services' }[] = [
    { label: 'Home', section: 'home' },
    { label: 'Services', section: 'services' },
    //{ label: 'USRC', section: 'usrc' },
    //{ label: 'Judiciary', section: 'judiciary' },
    { label: 'Newsroom', section: 'newsroom' },
    { label: 'Past Leaders', section: 'pastleaders' },
  ];

  const handleLinkClick = (section: ActiveSection | 'services') => {
    if (section === 'services') {
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
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={mustsoLogo} alt="MUSTSO Logo" className="h-14 w-14" />
              <div>
                <h3 className="font-bold text-xl">MUSTSO</h3>
                <p className="text-primary-foreground/70 text-sm">Mbeya University Students Organization</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed mb-6 max-w-md">
              The Mbeya University Students Organization (MUSTSO) is the official student government 
              dedicated to serving and empowering students through leadership, unity, and innovation 
              at Mbeya University of Science and Technology.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button onClick={() => handleLinkClick(link.section)} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-primary-foreground/70" />
                <span className="text-primary-foreground/70">
                  Mbeya University of Science and Technology,<br />
                  P.O. Box 131, Mbeya, Tanzania
                </span>
              </li>
              <li>
                <a href="tel:+255252502381" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Phone className="w-5 h-5" />
                  +255 252 502 381
                </a>
              </li>
              <li>
                <a href="mailto:mustso@must.ac.tz" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                  mustso@must.ac.tz
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} MUSTSO - Mbeya University Students Organization. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              Serving students with excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
