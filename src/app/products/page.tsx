"use client";

import React from "react";
import ProductGrid from "@/components/Product/ProductGrid";
import Layout from "@/components/Layout/layout";

const ProductsPage: React.FC = () => {
  return (
    <>
      <Layout>
        <ProductGrid search="" />
      </Layout>
    </>
  );
};

export default ProductsPage;
