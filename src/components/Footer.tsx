import { MessageCircle, Instagram, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Configurações que virão do Contentful
const WHATSAPP_NUMBER = '5511999999999';
const INSTAGRAM_URL = 'https://instagram.com/istore';
const PHONE_NUMBER = '(11) 99999-9999';
const EMAIL = 'contato@istore.com.br';

export function Footer() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá, gostaria de saber mais sobre os produtos disponíveis!');
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramClick = () => {
    window.open(INSTAGRAM_URL, '_blank');
  };

  return (
    <footer id="contato" className="bg-gradient-primary text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Vamos{' '}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Conversar
            </span>
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Entre em contato conosco pelo WhatsApp ou Instagram para tirar suas dúvidas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* WhatsApp */}
          <div className="text-center group">
            <Button
              variant="whatsapp"
              size="xl"
              onClick={handleWhatsAppClick}
              className="w-full max-w-sm mb-4"
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              WhatsApp
            </Button>
            <p className="text-sm opacity-80">{PHONE_NUMBER}</p>
            <p className="text-xs opacity-60 mt-1">
              Atendimento de seg a sex, das 9h às 18h
            </p>
          </div>

          {/* Instagram */}
          <div className="text-center group">
            <Button
              variant="gradient"
              size="xl"
              onClick={handleInstagramClick}
              className="w-full max-w-sm mb-4"
            >
              <Instagram className="mr-2 h-6 w-6" />
              Instagram
            </Button>
            <p className="text-sm opacity-80">@istore</p>
            <p className="text-xs opacity-60 mt-1">
              Acompanhe nossas novidades e promoções
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm opacity-80 mb-8">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{PHONE_NUMBER}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{EMAIL}</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-sm opacity-80">
            © 2024 iStore. Todos os direitos reservados.
          </p>
          <p className="text-xs opacity-60 mt-2">
            CNPJ: 00.000.000/0001-00 • Apple e iPhone são marcas registradas da Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}