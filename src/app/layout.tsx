import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Mini Commerce",
  description: "A simple e-commerce application built with Next.js",
  keywords: [
    "e-commerce",
    "next.js",
    "mini commerce",
    "shop",
    "store",
    "online shopping",
  ],
  authors: [{ name: "Ronald Okpara", url: "https://mini-commerce.vercel.app" }],
  creator: "Ronald Okpara",
  openGraph: {
    title: "Mini Commerce",
    description: "A simple e-commerce application built with Next.js",
    siteName: "Mini Commerce",
    images: [
      {
        url: "https://mini-commerce.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mini Commerce Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Commerce",
    description: "A simple e-commerce application built with Next.js",
    creator: "@no-code-intended",
    images: ["https://mini-commerce.vercel.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import { ScrollContextProvider } from "@/context/scrollContextProvider";
import { SearchProvider } from "@/context/SearchContext";
import ThemeProvider from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/images/carousel-images-optimized/carousel-image3-lcp.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/data/products.json"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
      </head>
      <body className={`${inter.variable} antialiased font-sans bg-background text-foreground`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <SearchProvider>
              <ScrollContextProvider>{children}</ScrollContextProvider>
            </SearchProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
