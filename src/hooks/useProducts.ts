import { useQuery } from '@tanstack/react-query';

export const fetchProducts = async () => {
  const res = await fetch('/data/products.json');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export default function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
}
