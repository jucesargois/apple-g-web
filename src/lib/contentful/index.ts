import { mockCategories, mockProducts, mockStoreSettings } from './mock-data';
import type {
  CategoryFields,
  ContentfulAsset,
  ContentfulCollection,
  ContentfulEntry,
  ProductFields,
  StoreSettingsFields,
  StorefrontCategory,
  StorefrontContent,
  StorefrontProduct,
  StorefrontSettings,
} from '@/types/contentful';

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT ?? 'master';
const DELIVERY_TOKEN = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN;

const BASE_URL = SPACE_ID
  ? `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`
  : null;

const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

interface CachedValue<T> {
  value: T;
  expiresAt: number;
}

const cache = new Map<string, CachedValue<unknown>>();

function getCachedValue<T>(key: string): T | null {
  const entry = cache.get(key) as CachedValue<T> | undefined;
  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.value;
}

function setCachedValue<T>(key: string, value: T) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL,
  });
}

async function fetchContentful<T>(
  path: string,
  searchParams: Record<string, string> = {},
): Promise<T | null> {
  if (!BASE_URL || !DELIVERY_TOKEN) {
    return null;
  }

  const params = new URLSearchParams({
    access_token: DELIVERY_TOKEN,
    locale: 'pt-BR',
    include: '2',
    ...searchParams,
  });

  const url = `${BASE_URL}${path}?${params.toString()}`;

  const cached = getCachedValue<T>(url);
  if (cached) {
    return cached;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Falha ao buscar dados do Contentful: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as T;
  setCachedValue(url, data);
  return data;
}

function getAssetUrl(asset: ContentfulAsset | undefined): string | undefined {
  if (!asset) {
    return undefined;
  }

  const url = asset.fields.file.url;
  if (!url) {
    return undefined;
  }

  return url.startsWith('http') ? url : `https:${url}`;
}

function mapCategoryEntry(entry: ContentfulEntry<CategoryFields>): StorefrontCategory {
  return {
    id: entry.sys.id,
    name: entry.fields.name,
    slug: entry.fields.slug,
    description: entry.fields.description,
    productCount: entry.fields.productCount ?? 0,
  };
}

function mapProductEntry(
  entry: ContentfulEntry<ProductFields>,
  assets: Map<string, ContentfulAsset>,
  linkedEntries: Map<string, ContentfulEntry<Record<string, unknown>>>,
  categoriesFallback: StorefrontCategory[],
): StorefrontProduct {
  const categoryLink = entry.fields.category.sys.id;
  const categoryEntry = linkedEntries.get(categoryLink) as ContentfulEntry<CategoryFields> | undefined;
  const category = categoryEntry
    ? mapCategoryEntry(categoryEntry)
    : categoriesFallback.find((cat) => cat.id === categoryLink) ?? {
        id: categoryLink,
        name: categoryLink,
        slug: categoryLink,
        productCount: 0,
      };

  const assetLink = entry.fields.image.sys.id;
  const asset = assets.get(assetLink);
  const imageUrl = getAssetUrl(asset);

  return {
    id: entry.sys.id,
    name: entry.fields.name,
    description: entry.fields.description,
    shortDescription: entry.fields.shortDescription,
    price: entry.fields.price,
    originalPrice: entry.fields.originalPrice,
    imageUrl: imageUrl ?? '',
    isNew: entry.fields.isNew,
    category,
    featured: entry.fields.featured,
    stock: entry.fields.stock,
  };
}

export async function getCategories(): Promise<StorefrontCategory[]> {
  if (!BASE_URL || !DELIVERY_TOKEN) {
    return mockCategories;
  }

  try {
    const data = await fetchContentful<ContentfulCollection<CategoryFields>>('/entries', {
      content_type: 'category',
      order: 'fields.name',
      include: '0',
    });

    if (!data) {
      return mockCategories;
    }

    return data.items.map(mapCategoryEntry);
  } catch (error) {
    console.warn('[Contentful] Falha ao carregar categorias, usando dados mock.', error);
    return mockCategories;
  }
}

export async function getStoreSettings(): Promise<StorefrontSettings | null> {
  if (!BASE_URL || !DELIVERY_TOKEN) {
    return mockStoreSettings;
  }

  try {
    const data = await fetchContentful<ContentfulCollection<StoreSettingsFields>>('/entries', {
      content_type: 'storeSettings',
      limit: '1',
    });

    if (!data || data.items.length === 0) {
      return mockStoreSettings;
    }

    const entry = data.items[0];

    const assetsMap = new Map<string, ContentfulAsset>();
    data.includes?.Asset?.forEach((asset) => {
      assetsMap.set(asset.sys.id, asset);
    });

    return {
      storeName: entry.fields.storeName,
      whatsappNumber: entry.fields.whatsappNumber,
      instagramUrl: entry.fields.instagramUrl,
      phoneNumber: entry.fields.phoneNumber,
      email: entry.fields.email,
      logoUrl: entry.fields.logo ? getAssetUrl(assetsMap.get(entry.fields.logo.sys.id)) : undefined,
      heroTitle: entry.fields.heroTitle,
      heroSubtitle: entry.fields.heroSubtitle,
      heroDescription: entry.fields.heroDescription,
      heroBackgroundUrl: entry.fields.heroBackground
        ? getAssetUrl(assetsMap.get(entry.fields.heroBackground.sys.id))
        : undefined,
      heroHighlight: entry.fields.heroHighlight,
    };
  } catch (error) {
    console.warn('[Contentful] Falha ao carregar configurações, usando dados mock.', error);
    return mockStoreSettings;
  }
}

export async function getProducts(): Promise<StorefrontProduct[]> {
  if (!BASE_URL || !DELIVERY_TOKEN) {
    return mockProducts;
  }

  try {
    const data = await fetchContentful<ContentfulCollection<ProductFields>>('/entries', {
      content_type: 'product',
      order: 'fields.name',
    });

    if (!data) {
      return mockProducts;
    }

    const assetsMap = new Map<string, ContentfulAsset>();
    data.includes?.Asset?.forEach((asset) => {
      assetsMap.set(asset.sys.id, asset);
    });

    const linkedEntries = new Map<string, ContentfulEntry<Record<string, unknown>>>();
    data.includes?.Entry?.forEach((entry) => {
      linkedEntries.set(entry.sys.id, entry);
    });

    const categoriesFallback = await getCategories();

    return data.items.map((item) =>
      mapProductEntry(item, assetsMap, linkedEntries, categoriesFallback),
    );
  } catch (error) {
    console.warn('[Contentful] Falha ao carregar produtos, usando dados mock.', error);
    return mockProducts;
  }
}

export async function getStorefrontContent() {
  const [products, categories, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getStoreSettings(),
  ]);

  const categoriesWithCounts = categories.map((category) => {
    const countFromProducts = products.filter((product) => product.category.id === category.id).length;
    return {
      ...category,
      productCount: category.productCount > 0 ? category.productCount : countFromProducts,
    };
  });

  return {
    products,
    categories: categoriesWithCounts,
    settings,
  } satisfies StorefrontContent;
}
