"use client";

import Hero from "@/components/Hero/Hero";
import Layout from "@/components/Layout/layout";
import ProductGrid from "@/components/Product/ProductGrid";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import SearchBar from "@/components/SearchBar";

import React, { useState } from "react";

import { useSearch } from "@/context/SearchContext";

const Page = () => {
  const { search, setSearch } = useSearch();
  return (
    <ReactQueryProvider>
      <Layout>
        <Hero />
        <div className="w-full flex justify-center mb-4 mt-2">
          <div className="w-full max-w-2xl md:hidden flex">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
        <ProductGrid search={search} />
      </Layout>
    </ReactQueryProvider>
  );
};

export default Page;
