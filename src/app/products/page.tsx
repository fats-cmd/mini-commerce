'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/stores/useCartStore';
import ProductGrid from '@/components/Product/ProductGrid';

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('/data/products.json');
  if (!res.ok) throw new Error('Failed to fetch products');
  const products = await res.json();
  return products.map((p: { price: string | number } & Omit<Product, 'price'>) => ({
    ...p,
    price: typeof p.price === 'string' ? Number(p.price.replace(/[^\d.]/g, '')) : p.price
  }));
};

const ProductsPage: React.FC = () => {
  const { data: products = [], isLoading, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return <ProductGrid search=''/>;
};

export default ProductsPage;
