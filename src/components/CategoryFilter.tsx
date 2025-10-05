import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// Mock categories - será substituído pelo Contentful
const mockCategories = [
  { id: 'iphone-15', name: 'iPhone 15 Series', count: 3 },
  { id: 'iphone-14', name: 'iPhone 14 Series', count: 2 },
  { id: 'iphone-13', name: 'iPhone 13 Series', count: 1 },
  { id: 'acessorios', name: 'Acessórios', count: 0 },
];

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
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
        >
          <span className="flex-1 text-left">Todos os produtos</span>
          <Badge variant="outline" className="ml-2">
            {mockCategories.reduce((total, cat) => total + cat.count, 0)}
          </Badge>
        </Button>
        
        {mockCategories.map((category) => (
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
        ))}
      </div>
    </div>
  );
}