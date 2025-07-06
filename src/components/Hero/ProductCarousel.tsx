import Image from "next/image";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// i did this to make the carousel load super fast - using tiny placeholder first, then full quality
// this is a trick i learned to improve LCP scores
const images = [
  {
    src: "/assets/images/carousel-images-optimized/carousel-image3-lcp.webp", // tiny placeholder for instant load
    alt: "Flash sale product 1",
    fullSrc: "/assets/images/carousel-images-optimized/carousel-image3.webp", // full quality image
  },
  {
    src: "/assets/images/carousel-images-optimized/carousel-image1.webp",
    alt: "Flash sale product 2",
    fullSrc: "/assets/images/carousel-images-optimized/carousel-image1.webp",
  },
  {
    src: "/assets/images/carousel-images-optimized/carousel-image2.webp",
    alt: "Flash sale product 3",
    fullSrc: "/assets/images/carousel-images-optimized/carousel-image2.webp",
  },
];

const ProductCarousel: React.FC = React.memo(() => {
  const [current, setCurrent] = React.useState(0);
  const [loadedFullImage, setLoadedFullImage] = React.useState(false);

  // simple carousel navigation - just cycling through images
  const next = React.useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    []
  );

  const prev = React.useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    []
  );

  // auto-advance carousel every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // this is the magic part - load the full quality image after the tiny placeholder shows
  // this way users see something instantly, then get the nice quality
  React.useEffect(() => {
    if (current === 0) {
      const img = new window.Image();
      img.onload = () => setLoadedFullImage(true);
      img.src = images[0].fullSrc;
    }
  }, [current]);

  return (
    <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden group shadow-2xl">
      {/* navigation buttons - only show on hover */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-20 opacity-0 group-hover:opacity-100 transform hover:scale-110"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-20 opacity-0 group-hover:opacity-100 transform hover:scale-110"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      {/* the main carousel content - only render current image for better performance */}
      <div className="relative w-full h-full">
        {images.map((image, index) => {
          // only show the current image - this helps with LCP a lot
          if (index !== current) {
            return null;
          }

          return (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-700 ease-out opacity-100 scale-100"
            >
              {/* tiny placeholder loads instantly for good LCP */}
              <Image
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transition-all duration-700 opacity-100"
                draggable={false}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                priority={index === 0} // only the first image gets priority loading
                quality={30} // low quality for fast loading
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />

              {/* full quality image loads on top after placeholder */}
              {index === 0 && loadedFullImage && (
                <Image
                  src={image.fullSrc}
                  alt={image.alt}
                  className="object-cover w-full h-full transition-all duration-700 opacity-100"
                  draggable={false}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                  quality={60}
                />
              )}

              {/* dark gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

              {/* the text content on top of the image */}
              <div className="absolute inset-0 flex flex-col justify-center pl-8 lg:pl-16">
                <div className="max-w-xl space-y-4">
                  <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                    Flash
                    <span className="block text-orange-400 font-light">
                      Sales
                    </span>
                  </h2>
                  <p className="text-white/90 text-lg lg:text-xl font-light leading-relaxed max-w-md">
                    Discover amazing deals you don&apos;t want to miss. Limited
                    time offers.
                  </p>
                  <button className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/25">
                    <span>Shop Now</span>
                    <ChevronRight
                      size={20}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* dots indicator at the bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === idx
                ? "bg-orange-500 scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

ProductCarousel.displayName = "ProductCarousel";

export default ProductCarousel;
