import { Shield, Truck, CreditCard, CheckCircle } from 'lucide-react';

const trustFeatures = [
  {
    icon: Shield,
    title: 'Garantia Total',
    description: 'Todos os produtos com garantia oficial Apple',
  },
  {
    icon: Truck,
    title: 'Entrega Segura',
    description: 'Entrega rápida em todo o Brasil com rastreamento',
  },
  {
    icon: CreditCard,
    title: 'Pagamento Flexível',
    description: 'PIX, cartão ou parcelamento em até 12x sem juros',
  },
  {
    icon: CheckCircle,
    title: 'Produtos Originais',
    description: 'Importados diretamente da Apple, lacrados de fábrica',
  },
];

export function TrustSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Por que{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Confiar
            </span>{' '}
            em nós?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sua satisfação e segurança são nossas prioridades
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-secondary rounded-full mb-6 group-hover:shadow-strong transition-all duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}