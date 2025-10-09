import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CategoryFilterProps {
  categories: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  isLoading?: boolean;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  isLoading = false,
}: CategoryFilterProps) {
  const totalProducts = categories.reduce((total, cat) => total + cat.count, 0);

  return (
    <div className="w-64 bg-background/60 backdrop-blur-sm rounded-lg border border-border/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Categorias</h3>
        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange(null)}
            className="h-auto p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Button
          variant={selectedCategory === null ? "secondary" : "ghost"}
          className="w-full justify-start h-auto py-2 px-3"
          onClick={() => onCategoryChange(null)}
          disabled={isLoading}
        >
          <span className="flex-1 text-left">Todos os produtos</span>
          <Badge variant="outline" className="ml-2">
            {totalProducts}
          </Badge>
        </Button>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-10 rounded-md bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => onCategoryChange(category.id)}
              disabled={category.count === 0}
            >
              <span className="flex-1 text-left">{category.name}</span>
              <Badge variant="outline" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))
        )}
      </div>
    </div>
  );
}