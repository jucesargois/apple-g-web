export interface ContentfulLink<T extends 'Entry' | 'Asset'> {
  sys: {
    type: 'Link';
    linkType: T;
    id: string;
  };
}

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      fileName: string;
      contentType: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface ContentfulEntry<TFields> {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
    contentType?: {
      sys: {
        id: string;
        type: string;
      };
    };
  };
  fields: TFields;
}

export interface ProductFields {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  image: ContentfulLink<'Asset'>;
  isNew: boolean;
  category: ContentfulLink<'Entry'>;
  featured: boolean;
  stock: number;
}

export interface CategoryFields {
  name: string;
  slug: string;
  description?: string;
  productCount?: number;
}

export interface StoreSettingsFields {
  storeName: string;
  whatsappNumber: string;
  instagramUrl: string;
  phoneNumber: string;
  email: string;
  logo?: ContentfulLink<'Asset'>;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroBackground?: ContentfulLink<'Asset'>;
  heroHighlight?: string;
}

export interface ContentfulCollection<T> {
  total: number;
  skip: number;
  limit: number;
  items: Array<ContentfulEntry<T>>;
  includes?: {
    Asset?: ContentfulAsset[];
    Entry?: Array<ContentfulEntry<Record<string, unknown>>>;
  };
}

export interface StorefrontCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
}

export interface StorefrontProduct {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  isNew: boolean;
  category: StorefrontCategory;
  featured: boolean;
  stock: number;
}

export interface StorefrontSettings {
  storeName: string;
  whatsappNumber: string;
  instagramUrl: string;
  phoneNumber: string;
  email: string;
  logoUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroBackgroundUrl?: string;
  heroHighlight?: string;
}

export interface StorefrontContent {
  products: StorefrontProduct[];
  categories: StorefrontCategory[];
  settings: StorefrontSettings | null;
}

export interface ContentfulError {
  status: number;
  statusText: string;
  message: string;
}

export interface ContentModelField {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  validations?: unknown[];
  linkType?: string;
}

export interface ContentModelDefinition {
  id: string;
  name: string;
  description?: string;
  displayField?: string;
  fields: ContentModelField[];
}

export const contentModels: ContentModelDefinition[] = [
  {
    id: 'storeSettings',
    name: 'Configurações da Loja',
    description: 'Informações gerais e canais de contato exibidos no site.',
    displayField: 'storeName',
    fields: [
      { id: 'storeName', name: 'Nome da loja', type: 'Symbol', required: true },
      { id: 'whatsappNumber', name: 'Número do WhatsApp', type: 'Symbol', required: true },
      { id: 'instagramUrl', name: 'URL do Instagram', type: 'Symbol', required: true },
      { id: 'phoneNumber', name: 'Telefone', type: 'Symbol', required: true },
      { id: 'email', name: 'E-mail', type: 'Symbol', required: true },
      { id: 'logo', name: 'Logo', type: 'Link', linkType: 'Asset' },
      { id: 'heroTitle', name: 'Título do Hero', type: 'Symbol' },
      { id: 'heroSubtitle', name: 'Subtítulo do Hero', type: 'Symbol' },
      { id: 'heroDescription', name: 'Descrição do Hero', type: 'Text' },
      { id: 'heroBackground', name: 'Imagem de Fundo do Hero', type: 'Link', linkType: 'Asset' },
      { id: 'heroHighlight', name: 'Texto em destaque do Hero', type: 'Symbol' },
    ],
  },
  {
    id: 'category',
    name: 'Categoria',
    description: 'Categorias de produtos utilizadas para filtro no catálogo.',
    displayField: 'name',
    fields: [
      { id: 'name', name: 'Nome', type: 'Symbol', required: true },
      { id: 'slug', name: 'Slug', type: 'Symbol', required: true },
      { id: 'description', name: 'Descrição', type: 'Text' },
      {
        id: 'productCount',
        name: 'Quantidade de produtos',
        type: 'Integer',
        description: 'Campo opcional para sobrescrever a contagem automática de produtos.',
      } as ContentModelField,
    ],
  },
  {
    id: 'product',
    name: 'Produto',
    description: 'Produtos exibidos no catálogo da loja.',
    displayField: 'name',
    fields: [
      { id: 'name', name: 'Nome', type: 'Symbol', required: true },
      { id: 'shortDescription', name: 'Descrição curta', type: 'Symbol', required: true },
      { id: 'description', name: 'Descrição completa', type: 'Text', required: true },
      { id: 'price', name: 'Preço atual', type: 'Number', required: true },
      { id: 'originalPrice', name: 'Preço original', type: 'Number' },
      { id: 'image', name: 'Imagem principal', type: 'Link', linkType: 'Asset', required: true },
      { id: 'isNew', name: 'Produto novo?', type: 'Boolean', required: true },
      {
        id: 'category',
        name: 'Categoria',
        type: 'Link',
        linkType: 'Entry',
        required: true,
        validations: [
          {
            linkContentType: ['category'],
          },
        ],
      } as ContentModelField,
      { id: 'featured', name: 'Produto em destaque?', type: 'Boolean', required: true },
      { id: 'stock', name: 'Estoque', type: 'Integer', required: true },
    ],
  },
];
