import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { TrustSection } from '@/components/TrustSection';
import { Footer } from '@/components/Footer';
import { useStorefrontContent } from '@/hooks/useStorefrontContent';

const Index = () => {
  const { content, isLoading, error } = useStorefrontContent();
  const products = content?.products ?? [];
  const categories = content?.categories ?? [];
  const settings = content?.settings;
  const heroTitle = settings?.heroTitle ?? 'iPhones';
  const heroSubtitle = settings?.heroSubtitle ?? 'com Garantia Total';
  const heroDescription = settings?.heroDescription ??
    'Entrega rápida e segura • Produtos originais • Suporte completo';
  const heroHighlight = settings?.heroHighlight ?? 'Originais';

  return (
    <div className="min-h-screen bg-background">
      <Header
        onNavigate={() => {}}
        storeName={settings?.storeName}
        logoUrl={settings?.logoUrl}
      />
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        description={heroDescription}
        backgroundUrl={settings?.heroBackgroundUrl}
        highlight={heroHighlight}
      />
      <ProductGrid
        products={products}
        categories={categories}
        whatsappNumber={settings?.whatsappNumber}
        isLoading={isLoading && !content}
        error={error instanceof Error ? error.message : null}
      />
      <TrustSection />
      <Footer
        whatsappNumber={settings?.whatsappNumber}
        instagramUrl={settings?.instagramUrl}
        phoneNumber={settings?.phoneNumber}
        email={settings?.email}
      />
    </div>
  );
};

export default Index;
