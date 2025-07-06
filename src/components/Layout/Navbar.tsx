"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import SearchBar from "@/components/SearchBar";
import { Inter } from "next/font/google";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import useCartStore from "@/stores/useCartStore";
import Logo from "../Logos/Logo";
import { useSearch } from "@/context/SearchContext";
import useProducts from "@/hooks/useProducts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const links = [
  { name: "Home", href: "/", icon: <FaHome /> },
  { name: "Products", href: "/products", icon: <FaBoxOpen /> },
];

const Navbar = () => {
  const { search, setSearch } = useSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: products } = useProducts();
  const filtered =
    search.trim() && Array.isArray(products)
      ? products.filter((p) =>
          p.name.toLowerCase().includes(search.trim().toLowerCase()),
        )
      : [];

  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="w-full h-16 border-b border-border bg-card shadow-sm">
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
            <div className="absolute left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {filtered.map((p) => (
                <Link
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  className="block px-4 py-2 text-foreground hover:bg-primary/10 transition-colors"
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
                className={`flex items-center gap-1 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md focus:outline-none ${inter.className}`}
              >
                {link.icon}
                <span className="hidden sm:inline font-light text-[0.8rem]">
                  {link.name}
                </span>
              </Link>
            ))}
            {/* Cart badge */}
            <div className="relative">
              <Link
                href="/cart"
                className={`flex items-center gap-1 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md focus:outline-none ${inter.className}`}
              >
                <span className="relative">
                  <FaShoppingCart className="text-primary text-xl" />
                  {mounted && totalItemsInCart > 0 && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-light text-xs border border-background">
                      {totalItemsInCart}
                    </span>
                  )}
                </span>
                <span className="hidden sm:inline font-light text-[0.8rem]">
                  Cart
                </span>
              </Link>
            </div>
            {/* Theme Toggle Button */}
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
