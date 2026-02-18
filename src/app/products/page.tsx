"use client";

import { watches } from "@/data/watches";
import ProductCard from "@/components/product/ProductCard";
import { useEffect, useState } from "react";
import gsap from "gsap";

export default function ProductsPage() {
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, [])
  useEffect(() => {
    gsap.from(".reveal", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    })
  }, [])


  return (
    <div className="p-10 grid grid-cols-3 gap-10 reveal">
      {loading ? (
        <div className="grid grid-cols-3 gap-8">
          {[ 1, 2, 3, 4, 5, 6 ].map(i => (
            <div key={i} className="h-60 bg-[#111] animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        watches.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}
