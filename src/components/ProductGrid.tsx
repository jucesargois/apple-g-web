import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductPagination } from '@/components/ProductPagination';

// Dados mock - serão substituídos pelo Contentful
const mockProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    description: '256GB, Titânio Natural',
    price: 'R$ 9.999',
    originalPrice: 'R$ 10.999',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&h=400&fit=crop&crop=center',
    isNew: true,
    category: 'iphone-15',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    description: '128GB, Azul Titânio',
    price: 'R$ 8.999',
    originalPrice: 'R$ 9.499',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&crop=center',
    isNew: true,
    category: 'iphone-15',
  },
  {
    id: 3,
    name: 'iPhone 15',
    description: '128GB, Rosa',
    price: 'R$ 6.999',
    originalPrice: 'R$ 7.299',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&crop=center',
    isNew: false,
    category: 'iphone-15',
  },
  {
    id: 4,
    name: 'iPhone 14 Pro',
    description: '256GB, Roxo Profundo',
    price: 'R$ 7.499',
    originalPrice: 'R$ 8.299',
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop&crop=center',
    isNew: false,
    category: 'iphone-14',
  },
  {
    id: 5,
    name: 'iPhone 14',
    description: '128GB, Azul',
    price: 'R$ 5.999',
    originalPrice: 'R$ 6.499',
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop&crop=center',
    isNew: false,
    category: 'iphone-14',
  },
  {
    id: 6,
    name: 'iPhone 13',
    description: '128GB, Meia-noite',
    price: 'R$ 4.999',
    originalPrice: 'R$ 5.299',
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=400&fit=crop&crop=center',
    isNew: false,
    category: 'iphone-13',
  },
];

// Número do WhatsApp - será configurável via Contentful
const WHATSAPP_NUMBER = '5511999999999';

interface ProductGridProps {
  // Futuramente receberá produtos do Contentful
}

export function ProductGrid({}: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const handleWhatsAppClick = (productName: string) => {
    const message = encodeURIComponent(`Olá, tenho interesse neste produto: ${productName}`);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Filtrar produtos baseado na busca e categoria
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === null || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Calcular paginação
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset página quando filtros mudarem
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <section id="catalogo" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Nosso{' '}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Catálogo
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Dispositivos originais com garantia total e entrega segura
          </p>
          
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* Filtros mobile - no topo */}
        <div className="lg:hidden mb-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <div className="flex gap-8 lg:gap-12">
          {/* Filtros laterais - desktop */}
          <div className="hidden lg:block flex-shrink-0">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Grid de produtos */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {searchTerm || selectedCategory ? 'Nenhum produto encontrado com os filtros aplicados.' : 'Nenhum produto disponível.'}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {paginatedProducts.map((product) => (
                    <Card 
                      key={product.id} 
                      className="group hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 border-0 bg-background/60 backdrop-blur-sm"
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          {product.isNew && (
                            <Badge 
                              className="absolute top-3 left-3 z-10 bg-gradient-accent text-white border-0"
                            >
                              Novo
                            </Badge>
                          )}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold text-primary">
                              {product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-6 pt-0">
                        <Button
                          variant="whatsapp"
                          className="w-full font-medium"
                          onClick={() => handleWhatsAppClick(product.name)}
                        >
                          Quero este
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}