"use client";
import { useState } from "react";
import { watches } from "@/data/watches";
import ProductCard from "@/components/product/ProductCard";

export default function SearchPage() {
  const [ query, setQuery ] = useState("");

  const filtered = watches.filter(w =>
    w.name.toLowerCase().includes(query.toLowerCase()) ||
    w.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-10">
      <input
        placeholder="Search watches..."
        className="border p-4 w-full mb-8"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-8">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
