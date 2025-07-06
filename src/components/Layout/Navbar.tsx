"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaHome, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import SearchBar from "@/components/SearchBar";
import { Inter } from "next/font/google";

import useCartStore from "@/stores/useCartStore";
import Logo from "../Logos/Logo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const links = [
  { name: "Home", href: "/", icon: <FaHome /> },
  { name: "Products", href: "/products", icon: <FaBoxOpen /> },
  // removed this for better UI
  // { name: "Cart", href: "/cart", icon: <FaShoppingCart /> },
];

const Navbar = () => {
  // Use search context for global search state
  const { search, setSearch } = require("@/context/SearchContext").useSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: products } = require("@/hooks/useProducts").default();
  const filtered =
    search.trim() && Array.isArray(products)
      ? products.filter((p: any) =>
          p.name.toLowerCase().includes(search.trim().toLowerCase())
        )
      : [];
  // Fixed hydration error:because it only shows cart badge after mount so server and client match
  // (If you render Zustand/localStorage state on the server, it will always be 0): first time experiencing this
  // so This ensures the badge only appears after hydration, preventing UI mismatch
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <nav className="w-full h-16 border-b border-gray-200 bg-gray-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <Logo />
        {/* SearchBar */}
        <div className="hidden md:block ml-20 w-[32.25rem] relative">
          <SearchBar
            value={search}
            onChange={(v) => {
              setSearch(v);
              setShowDropdown(!!v);
            }}
            onFocus={() => setShowDropdown(!!search)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
          {showDropdown && filtered.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {filtered.map((p: any) => (
                <Link
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  className="block px-4 py-2 text-gray-800 hover:bg-orange-100 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Navigation links */}
        <div className="flex gap-4 items-center">
          <div className="flex gap-4 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1 text-white hover:text-orange-400 transition-colors px-2 py-1 rounded-md focus:outline-none ${inter.className}`}
              >
                {link.icon}
                <span className="hidden sm:inline font-light text-[0.8rem]">
                  {link.name}
                </span>
              </Link>
            ))}
            {/* Cart badge - position relative to Cart link */}
            <div className="relative">
              <Link
                href="/cart"
                className={`flex items-center gap-1 text-white hover:text-orange-400 transition-colors px-2 py-1 rounded-md focus:outline-none ${inter.className}`}
              >
                <span className="relative">
                  <FaShoppingCart className="text-orange-400 text-xl" />
                  {/* Only show badge after mount to avoid hydration mismatch */}
                  {mounted && totalItemsInCart > 0 && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 flex items-center justify-center rounded-full bg-blue-900 text-white font-light text-xs border border-white">
                      {totalItemsInCart}
                    </span>
                  )}
                </span>
                <span className="hidden sm:inline font-light text-[0.8rem]">
                  Cart
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
