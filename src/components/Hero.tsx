import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
          iPhones{' '}
          <span className="bg-gradient-accent bg-clip-text text-transparent">
            Originais
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl lg:text-3xl mb-4 opacity-90 animate-fade-in">
          com Garantia Total
        </p>
        
        <p className="text-lg sm:text-xl mb-12 opacity-80 max-w-2xl mx-auto animate-fade-in">
          Entrega rápida e segura • Produtos originais • Suporte completo
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => scrollToSection('catalogo')}
            className="min-w-[200px]"
          >
            Ver Catálogo
          </Button>
          
          <Button
            variant="outline"
            size="xl"
            className="min-w-[200px] border-white/40 text-white hover:bg-white/10"
            onClick={() => scrollToSection('contato')}
          >
            Falar Conosco
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/80" />
      </div>
    </section>
  );
}