"use client";

import { useMemo, useState } from "react";
import { watches } from "@/data/watches";
import ProductCard from "@/components/product/ProductCard";

export default function ProductsPage() {
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("default");

  const filteredProducts = useMemo(() => {
    let filtered =
      category === "All"
        ? watches
        : watches.filter((w) => w.category === category);

    if (sort === "low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [category, sort]);

  return (
    <div className="px-10 py-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold">All Watches</h1>

        <div className="flex gap-4">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#111] border border-[#222] p-2 rounded-md"
          >
            <option>All</option>
            <option>Luxury</option>
            <option>Sport</option>
            <option>Smart</option>
          </select>

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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
