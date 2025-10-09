import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

interface HeaderProps {
  onNavigate: (section: string) => void;
  storeName?: string;
  logoUrl?: string;
}

export function Header({ onNavigate, storeName = 'iStore', logoUrl }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={logoUrl || logo}
              alt={`Logo da ${storeName}`}
              className="h-10 w-10 object-contain rounded"
            />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {storeName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('catalogo')}
              className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Catálogo
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Contato
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('catalogo')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
              >
                Catálogo
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
              >
                Contato
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}