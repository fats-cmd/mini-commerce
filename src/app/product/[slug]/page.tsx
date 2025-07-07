"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  Share2,
  Shield,
  Truck,
} from "lucide-react";
import useCartStore, { Product } from "@/stores/useCartStore";
import Image from "next/image";

// Fetch products.json and find product by slug
const fetchProductBySlug = async (slug: string): Promise<Product> => {
  const res = await fetch("/data/products.json");
  if (!res.ok) throw new Error("Failed to fetch products");

  const products: unknown = await res.json();

  if (!Array.isArray(products)) throw new Error("Invalid products data");
  const product = (products as Product[]).find(
    (p) => typeof p.slug === "string" && p.slug === slug,
  );
  if (!product) throw new Error("Product not found");

  // I am converting price to number if needed (products.json may have price as string)
  return {
    ...product,
    price:
      typeof product.price === "string"
        ? Number((product.price as string).replace(/[^\d.]/g, ""))
        : product.price,
  };
};

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  let slug = "";
  if (params && typeof params === "object" && "slug" in params) {
    const paramSlug = (params as Record<string, string | string[]>).slug;
    slug = Array.isArray(paramSlug) ? paramSlug[0] : paramSlug || "";
  }
  const router = useRouter();
  const { addItem, isInCart, getItemQuantity } = useCartStore();

  // Persist quantity per product in localStorage
  const [quantity, setQuantity] = useState<number>(() => {
    if (typeof window !== "undefined" && slug) {
      const stored = localStorage.getItem(`quantity-${slug}`);
      return stored ? parseInt(stored, 10) || 1 : 1;
    }
    return 1;
  });
  // Persist wishlist per product in localStorage
  const [isWishlisted, setIsWishlisted] = useState<boolean>(() => {
    if (typeof window !== "undefined" && slug) {
      return localStorage.getItem(`wishlist-${slug}`) === "true";
    }
    return false;
  });
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [showAddedToCart, setShowAddedToCart] = useState<boolean>(false);

  //React-query to fetch product by slug
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product, Error>({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const productImages: string[] =
    product && typeof product.image === "string" ? [product.image] : [];

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      if (typeof window !== "undefined" && slug) {
        localStorage.setItem(`quantity-${slug}`, String(newQuantity));
      }
      // Also update cart store if already in cart
      if (product && isInCart(product.id)) {
        useCartStore.getState().updateQuantity(product.id, newQuantity);
      }
    }
  };

  const handleAddToCart = () => {
    if (!product || !isValidProduct(product)) return;

    addItem(product, quantity);
    setShowAddedToCart(true);
    // Persist quantity for this product
    if (typeof window !== "undefined" && slug) {
      localStorage.setItem(`quantity-${slug}`, String(quantity));
    }
    // Hide the success message after 3 seconds
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  // Type guard to ensure product is a valid Product
  function isValidProduct(obj: unknown): obj is Product {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "id" in obj &&
      "slug" in obj &&
      "name" in obj &&
      "price" in obj &&
      typeof (obj as Product).slug === "string" &&
      typeof (obj as Product).name === "string" &&
      (typeof (obj as Product).id === "string" ||
        typeof (obj as Product).id === "number") &&
      typeof (obj as Product).price === "number"
    );
  }

  const handleWishlist = () => {
    setIsWishlisted((prev) => {
      if (typeof window !== "undefined" && slug) {
        localStorage.setItem(`wishlist-${slug}`, String(!prev));
      }
      return !prev;
    });
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="flex items-center mb-8">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-12 bg-gray-200 rounded w-24"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The product you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <button
              onClick={handleGoBack}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const currentCartQuantity = getItemQuantity(product.id);
  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Added to Cart Notification */}
      {showAddedToCart && (
        <div className="fixed top-4 right-4 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5" />
          <span>Added to cart!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                width={550}
                height={380}
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
                priority
              />
            </div>
            {productImages.length > 1 && (
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      draggable={false}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category and Share */}
            <div className="flex items-center justify-between">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {product.category}
              </span>
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {Array.isArray(product.features) && product.features.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Quantity and Add to Cart */}
            <div className="border-t pt-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
                    className="w-16 text-center border-0 focus:ring-0 focus:outline-none"
                    min="1"
                    max="10"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                    className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {currentCartQuantity > 0 && `${currentCartQuantity} in cart`}{" "}
                  go to cart{" "}
                  <Link href="/cart" className="text-blue-500 hover:underline">
                    here
                  </Link>
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart - ${totalPrice.toFixed(2)}</span>
                </button>
                <button
                  onClick={handleWishlist}
                  className={`p-4 rounded-lg border transition-colors ${
                    isWishlisted
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>2-year warranty</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ArrowLeft className="w-4 h-4" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
