"use client";
import React from "react";

import ProductCard from "@/components/Product/ProductCard";
import { AlertCircle, RefreshCw } from "lucide-react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import useProducts from "@/hooks/useProducts";

interface ProductGridProps {
  search: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ search }) => {
  const {
    data: products,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useProducts();

  const [visibleCount, setVisibleCount] = React.useState(8);

  // Seed products to localStorage after fetch
  React.useEffect(() => {
    if (products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  // Loading State with Skeleton Cards
  if (isLoading || isFetching) {
    return (
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        {/* Header with loading indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Featured Products
            </h2>
            <div className="flex items-center gap-2 text-orange-500">
              <RefreshCw size={16} className="animate-spin" />
              <span className="text-sm font-medium">Loading...</span>
            </div>
          </div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
              className="animate-fade-in-up"
            >
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-red-800 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-600 mb-6">
            We couldn&apos;t load the products. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  let productList = Array.isArray(products) ? products : [];
  if (search.trim()) {
    const s = search.trim().toLowerCase();
    productList = productList.filter((p) =>
      [p.name, p.description, p.category]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(s)),
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900 ">
            Featured Products
          </h2>
          <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-0.5 rounded-full">
            {productList.length} items
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs dark:text-white text-gray-500">
            Sort by:
          </span>
          <select className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option>Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {productList.slice(0, visibleCount).map((product, index: number) => (
          <div
            key={product.slug || index}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
            className="animate-fade-in-up"
          >
            <ProductCard
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
              originalPrice={product.originalPrice}
              rating={product.rating}
              reviews={product.reviews}
              discount={product.discount}
              isNew={product.isNew}
              small
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {productList.length > visibleCount && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount((c) => c + 8)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
