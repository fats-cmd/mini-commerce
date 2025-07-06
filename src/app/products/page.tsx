"use client";

import React, { useState } from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "@/components/Product/ProductCard";

const getCategories = (products: any[]) => {
  const cats = new Set<string>();
  products.forEach((p) => {
    if (p.category) cats.add(p.category);
  });
  return Array.from(cats);
};

import Layout from "@/components/Layout/layout";

const ProductsPage: React.FC = () => {
  const { data: products = [], isLoading, isError } = useProducts();
  const [activeTab, setActiveTab] = useState<string>("");

  const categories = getCategories(products);
  const filtered = activeTab
    ? products.filter((p: any) => p.category === activeTab)
    : products;

  React.useEffect(() => {
    if (categories.length && !activeTab) setActiveTab(categories[0]);
  }, [categories, activeTab]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full font-semibold border transition-colors duration-200 text-sm ${
                activeTab === cat
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {isLoading ? (
          <div className="text-center py-12 text-lg">Loading products...</div>
        ) : isError ? (
          <div className="text-center py-12 text-red-500">
            Failed to load products.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product: any) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
