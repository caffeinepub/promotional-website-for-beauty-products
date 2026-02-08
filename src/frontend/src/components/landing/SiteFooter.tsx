import { Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export default function SiteFooter() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Radiance</h3>
            <p className="text-muted-foreground">
              Elevating natural beauty through science-backed skincare solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('products')}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-8 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            © 2026. Built with <Heart className="w-4 h-4 text-primary fill-primary" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
