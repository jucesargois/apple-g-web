import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductPagination } from '@/components/ProductPagination';
import type { StorefrontCategory, StorefrontProduct } from '@/types/contentful';

interface ProductGridProps {
  products: StorefrontProduct[];
  categories: StorefrontCategory[];
  whatsappNumber?: string;
  isLoading?: boolean;
  error?: string | null;
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function ProductGrid({
  products,
  categories,
  whatsappNumber,
  isLoading = false,
  error,
}: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const handleWhatsAppClick = (productName: string) => {
    if (!whatsappNumber) {
      return;
    }

    const message = encodeURIComponent(`Olá, tenho interesse neste produto: ${productName}`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const categoriesForFilter = categories.map((category) => ({
    id: category.id,
    name: category.name,
    count: category.productCount,
  }));

  // Filtrar produtos baseado na busca e categoria
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.shortDescription.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
      const matchesCategory =
        selectedCategory === null || product.category.id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Calcular paginação
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
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

  const isWhatsappDisabled = !whatsappNumber;

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
            categories={categoriesForFilter}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            isLoading={isLoading}
          />
        </div>

        <div className="flex gap-8 lg:gap-12">
          {/* Filtros laterais - desktop */}
          <div className="hidden lg:block flex-shrink-0">
            <CategoryFilter
              categories={categoriesForFilter}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              isLoading={isLoading}
            />
          </div>

          {/* Grid de produtos */}
          <div className="flex-1">
            {error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Não foi possível carregar o catálogo. Tente novamente mais tarde.
                </p>
                <p className="text-sm text-muted-foreground mt-2">{error}</p>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <Card
                    key={index}
                    className="border-0 bg-background/60 backdrop-blur-sm"
                  >
                    <div className="h-64 w-full bg-muted rounded-t-lg animate-pulse" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                    </div>
                    <div className="p-6 pt-0">
                      <div className="h-10 bg-muted rounded animate-pulse" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {searchTerm || selectedCategory
                    ? 'Nenhum produto encontrado com os filtros aplicados.'
                    : 'Nenhum produto disponível.'}
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
                            <Badge className="absolute top-3 left-3 z-10 bg-gradient-accent text-white border-0">
                              Novo
                            </Badge>
                          )}
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {product.shortDescription}
                          </p>

                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold text-primary">
                              {currencyFormatter.format(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {currencyFormatter.format(product.originalPrice)}
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
                          disabled={isWhatsappDisabled}
                        >
                          {isWhatsappDisabled ? 'Contato indisponível' : 'Quero este'}
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
