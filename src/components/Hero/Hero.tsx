import React from "react";
import CategoryList from "./CategoryList";
import ProductCarousel from "./ProductCarousel";

const Hero: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
      {/* Grid layout for desktop, stack for mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Category sidebar - takes 3 columns on desktop */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="sticky top-6">
            <CategoryList />
          </div>
        </div>

        {/* Main carousel - takes 9 columns on desktop */}
        <div className="lg:col-span-9 order-1 lg:order-2">
          <ProductCarousel />
        </div>
      </div>

      {/* Optional: Add some visual elements for modern design */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
};

export default Hero;
