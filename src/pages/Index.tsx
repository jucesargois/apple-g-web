import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { TrustSection } from '@/components/TrustSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={() => {}} />
      <Hero />
      <ProductGrid />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
