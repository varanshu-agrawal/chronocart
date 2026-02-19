"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";

type Props = {
  products: Product[];
};

export default function ProductsClient({ products }: Props) {
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams?.get("category") || "All";

  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("default");

  // sync URL → state
  useEffect(() => {
    setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const filteredProducts = useMemo(() => {
    let filtered =
      category === "All"
        ? products
        : products.filter((w) => w.category.toLowerCase() === category.toLowerCase());

    if (sort === "low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [category, sort, products]);

  return (
    <div className="px-10 py-20">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold">
          {category === "All" ? "All Watches" : category + " Watches"}
        </h1>

        <div className="flex gap-4">
          {/* CATEGORY FILTER */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#111] border border-[#222] p-2 rounded-md"
          >
            <option>All</option>
            <option>Luxury</option>
            <option>Sport</option>
            <option>Smart</option>
            <option>Limited</option>
          </select>

          {/* SORT */}
          <select
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#111] border border-[#222] p-2 rounded-md"
          >
            <option value="default">Sort</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-20 text-center text-gray-500">No products found</p>
      )}
    </div>
  );
}
