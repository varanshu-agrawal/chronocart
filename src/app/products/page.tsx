import React, { Suspense } from "react";
import { watches } from "@/data/watches";
import ProductsClient from "@/components/product/ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="px-10 py-20">Loading products…</div>}>
      <ProductsClient products={watches} />
    </Suspense>
  );
}
