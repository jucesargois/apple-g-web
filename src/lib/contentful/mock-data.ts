export const mockProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: '256GB, Titânio Natural',
    shortDescription: '256GB, Titânio Natural',
    price: 9999,
    originalPrice: 10999,
    imageUrl:
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&h=800&fit=crop&crop=center',
    isNew: true,
    category: {
      id: 'iphone-15',
      name: 'iPhone 15 Series',
      slug: 'iphone-15',
    },
    featured: true,
    stock: 10,
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    description: '128GB, Azul Titânio',
    shortDescription: '128GB, Azul Titânio',
    price: 8999,
    originalPrice: 9499,
    imageUrl:
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&crop=center',
    isNew: true,
    category: {
      id: 'iphone-15',
      name: 'iPhone 15 Series',
      slug: 'iphone-15',
    },
    featured: false,
    stock: 5,
  },
  {
    id: '3',
    name: 'iPhone 15',
    description: '128GB, Rosa',
    shortDescription: '128GB, Rosa',
    price: 6999,
    originalPrice: 7299,
    imageUrl:
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&crop=center',
    isNew: false,
    category: {
      id: 'iphone-15',
      name: 'iPhone 15 Series',
      slug: 'iphone-15',
    },
    featured: false,
    stock: 3,
  },
  {
    id: '4',
    name: 'iPhone 14 Pro',
    description: '256GB, Roxo Profundo',
    shortDescription: '256GB, Roxo Profundo',
    price: 7499,
    originalPrice: 8299,
    imageUrl:
      'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&h=800&fit=crop&crop=center',
    isNew: false,
    category: {
      id: 'iphone-14',
      name: 'iPhone 14 Series',
      slug: 'iphone-14',
    },
    featured: false,
    stock: 2,
  },
  {
    id: '5',
    name: 'iPhone 14',
    description: '128GB, Azul',
    shortDescription: '128GB, Azul',
    price: 5999,
    originalPrice: 6499,
    imageUrl:
      'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&h=800&fit=crop&crop=center',
    isNew: false,
    category: {
      id: 'iphone-14',
      name: 'iPhone 14 Series',
      slug: 'iphone-14',
    },
    featured: false,
    stock: 4,
  },
  {
    id: '6',
    name: 'iPhone 13',
    description: '128GB, Meia-noite',
    shortDescription: '128GB, Meia-noite',
    price: 4999,
    originalPrice: 5299,
    imageUrl:
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&h=800&fit=crop&crop=center',
    isNew: false,
    category: {
      id: 'iphone-13',
      name: 'iPhone 13 Series',
      slug: 'iphone-13',
    },
    featured: false,
    stock: 7,
  },
];

export const mockCategories = [
  {
    id: 'iphone-15',
    name: 'iPhone 15 Series',
    slug: 'iphone-15',
    description: 'Modelos da linha iPhone 15',
    productCount: 3,
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14 Series',
    slug: 'iphone-14',
    description: 'Modelos da linha iPhone 14',
    productCount: 2,
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13 Series',
    slug: 'iphone-13',
    description: 'Modelos da linha iPhone 13',
    productCount: 1,
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    slug: 'acessorios',
    description: 'Carregadores, cases e muito mais',
    productCount: 0,
  },
];

export const mockStoreSettings = {
  storeName: 'iStore',
  whatsappNumber: '5511999999999',
  instagramUrl: 'https://instagram.com/istore',
  phoneNumber: '(11) 99999-9999',
  email: 'contato@istore.com.br',
  logoUrl: '',
  heroTitle: 'iPhones',
  heroSubtitle: 'com Garantia Total',
  heroDescription: 'Entrega rápida e segura • Produtos originais • Suporte completo',
  heroHighlight: 'Originais',
};
