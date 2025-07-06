import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full h-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer bg-[length:200%_100%]" />

        {/* Badge skeletons */}
        <div className="absolute top-3 left-3 space-y-2">
          <div className="w-12 h-5 bg-gray-300 rounded-full" />
        </div>

        {/* Heart skeleton */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Rating skeleton */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-300 rounded-full" />
            ))}
          </div>
          <div className="w-8 h-3 bg-gray-300 rounded" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="w-3/4 h-5 bg-gray-300 rounded" />
          <div className="w-1/2 h-5 bg-gray-300 rounded" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-gray-300 rounded" />
          <div className="w-5/6 h-3 bg-gray-300 rounded" />
        </div>

        {/* Price skeleton */}
        <div className="flex items-center gap-2 pt-2">
          <div className="w-16 h-6 bg-gray-300 rounded" />
          <div className="w-12 h-4 bg-gray-300 rounded" />
        </div>

        {/* Button skeleton */}
        <div className="w-full h-12 bg-gray-300 rounded-xl mt-4" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
