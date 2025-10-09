import { useQuery } from '@tanstack/react-query';
import { getStorefrontContent } from '@/lib/contentful';

const CONTENT_QUERY_KEY = ['storefront-content'];

export function useStorefrontContent() {
  const query = useQuery({
    queryKey: CONTENT_QUERY_KEY,
    queryFn: getStorefrontContent,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
  });

  return {
    ...query,
    content: query.data,
  };
}
