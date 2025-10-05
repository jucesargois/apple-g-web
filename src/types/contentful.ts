// Tipos para integração futura com Contentful

export interface ContentfulAsset {
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface StoreSettings {
  fields: {
    logo: ContentfulAsset;
    storeName: string;
    whatsappNumber: string;
    instagramUrl: string;
    phoneNumber: string;
    email: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

export interface Product {
  fields: {
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    originalPrice?: number;
    image: ContentfulAsset;
    isNew: boolean;
    category: string;
    featured: boolean;
    stock: number;
  };
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Category {
  fields: {
    name: string;
    slug: string;
    description?: string;
    productCount: number;
  };
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ContentfulResponse<T> {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: T[];
}

// Estrutura das configurações do Contentful que você precisa criar:

/*
1. Content Type: "storeSettings" (Configurações da Loja)
   Fields:
   - logo (Media) - Logo da loja
   - storeName (Short text) - Nome da loja
   - whatsappNumber (Short text) - Número do WhatsApp (formato: 5511999999999)
   - instagramUrl (Short text) - URL do Instagram
   - phoneNumber (Short text) - Telefone formatado
   - email (Short text) - Email de contato
   - primaryColor (Short text) - Cor primária (HSL format)
   - secondaryColor (Short text) - Cor secundária (HSL format)
   - accentColor (Short text) - Cor de destaque (HSL format)

2. Content Type: "product" (Produto)
   Fields:
   - name (Short text) - Nome do produto
   - description (Long text) - Descrição completa
   - shortDescription (Short text) - Descrição curta para o card
   - price (Number) - Preço atual
   - originalPrice (Number, optional) - Preço original (para mostrar desconto)
   - image (Media) - Imagem principal do produto
   - isNew (Boolean) - Se é um produto novo
   - category (Reference to Category) - Categoria do produto
   - featured (Boolean) - Se é produto em destaque
   - stock (Number) - Quantidade em estoque

3. Content Type: "category" (Categoria)
   Fields:
   - name (Short text) - Nome da categoria
   - slug (Short text) - Slug único para URLs (ex: iphone-15-series)
   - description (Long text, optional) - Descrição da categoria
   - productCount (Number) - Contador automático de produtos

Para busca no Contentful use:
- Search API: https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?content_type=product&query=TERMO_BUSCA
- Filter by category: https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?content_type=product&fields.category.sys.id=CATEGORY_ID
*/