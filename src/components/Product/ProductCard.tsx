"use client";
import React, { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import useCartStore from "@/stores/useCartStore";

interface ProductCardProps {
  name: string;
  price: string;
  description: string;
  image?: string;
  originalPrice?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  isNew?: boolean;
  slug?: string;
  small?: boolean;
}

// i used memo here to prevent unnecessary re-renders when parent component updates
// this helps with performance when we have lots of product cards
const ProductCard: React.FC<ProductCardProps> = memo(
  ({
    name,
    price,
    description,
    image,
    originalPrice,
    rating = 4.5,
    reviews = 124,
    discount,
    isNew = false,
    slug,
    small = false,
  }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { addItem } = useCartStore();

    // generate a slug from the product name if one isn't provided
    // this is useful for creating URLs and unique IDs
    const productSlug =
      slug ??
      name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");

    // handle adding items to cart - this is the main functionality
    const handleAddToCart = React.useCallback(() => {
      let id: number;
      if (typeof slug === "string" && !isNaN(Number(slug))) {
        id = Number(slug);
      } else {
        // create a simple hash from the slug for unique ID
        id = Array.from(productSlug).reduce(
          (acc, char) => acc + char.charCodeAt(0),
          0
        );
      }
      addItem(
        {
          id,
          slug: productSlug,
          name,
          price:
            typeof price === "string"
              ? parseFloat(price.replace(/[^\d.]/g, ""))
              : price,
          image: image || "",
          description,
          features: [],
          rating: rating ?? 4.5,
          reviews: reviews ?? 124,
          category: "",
        },
        1
      );
    }, [
      addItem,
      productSlug,
      name,
      price,
      image,
      description,
      rating,
      reviews,
      slug,
    ]);

    // simple like/unlike functionality
    const handleLike = React.useCallback(() => {
      setIsLiked(!isLiked);
    }, [isLiked]);

    // track hover state for showing action buttons
    const handleMouseEnter = React.useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
      setIsHovered(false);
    }, []);

    // track when image finishes loading for better UX
    const handleImageLoad = React.useCallback(() => {
      setIsImageLoaded(true);
    }, []);

    return (
      <div
        className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-2 ${
          small ? "max-w-xs p-2" : ""
        }`}
        style={small ? { fontSize: "0.92rem", minWidth: 0 } : {}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* badges for new products and discounts */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {discount && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* wishlist button - heart icon */}
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isLiked
              ? "bg-red-500 text-white scale-110"
              : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500"
          } shadow-lg hover:scale-110`}
        >
          <Heart size={16} className={isLiked ? "fill-current" : ""} />
        </button>

        {/* product image container */}
        <div
          className={`relative w-full ${
            small ? "h-36" : "h-56"
          } overflow-hidden`}
        >
          {image && (
            <>
              {/* skeleton loader while image is loading */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer bg-[length:200%_100%]" />
                </div>
              )}

              <Image
                src={image}
                alt={name}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onLoad={handleImageLoad}
                priority={false}
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </>
          )}

          {/* action buttons that appear on hover */}
          <div
            className={`absolute bottom-3 right-3 flex gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link
              href={`/product/${productSlug}`}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <Eye size={18} />
            </Link>
            <Link
              href="/cart"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <ShoppingCart size={18} />
            </Link>
          </div>
        </div>

        {/* product content section */}
        <div className={`${small ? "p-3 space-y-2" : "p-5 space-y-3"}`}>
          {/* star rating display */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>

          {/* product name */}
          <h3
            className={`font-bold ${
              small ? "text-base" : "text-lg"
            } text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300`}
          >
            {name}
          </h3>

          {/* product description */}
          <p
            className={`text-gray-600 ${
              small ? "text-xs" : "text-sm"
            } line-clamp-2 leading-relaxed`}
          >
            {description}
          </p>

          {/* price display with original price if there's a discount */}
          <div className="flex items-center gap-2 pt-2">
            <span
              className={`${
                small ? "text-lg" : "text-xl"
              } font-bold text-orange-600`}
            >
              {(() => {
                let p: number;
                if (typeof price === "string") {
                  p = parseFloat(price.replace(/[^\d.]/g, ""));
                } else {
                  p = price as number;
                }
                if (typeof p === "number" && !isNaN(p))
                  return `$${p.toFixed(2)}`;
                return "N/A";
              })()}
            </span>
            {originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {typeof originalPrice === "string"
                  ? (() => {
                      const op = parseFloat(
                        originalPrice.replace(/[^\d.]/g, "")
                      );
                      return !isNaN(op) ? `$${op.toFixed(2)}` : "N/A";
                    })()
                  : originalPrice}
              </span>
            )}
          </div>

          {/* add to cart button */}
          <button
            className={`w-full mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold ${
              small ? "py-2 px-2 text-xs rounded-lg" : "py-3 px-4 rounded-xl"
            } transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group/btn`}
            onClick={handleAddToCart}
          >
            <ShoppingCart
              size={small ? 15 : 18}
              className="transition-transform group-hover/btn:scale-110"
            />
            Add to Cart
          </button>
        </div>

        {/* animated border effect on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-200 transition-all duration-300 pointer-events-none" />
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
