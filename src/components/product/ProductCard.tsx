"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [ hovered, setHovered ] = useState(false);

  return (
    <div
      className="group bg-[#111] border border-[#222] rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-[#333]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-64 mb-5 overflow-hidden rounded-xl bg-black flex items-center justify-center">
          <Image
            src={product.images[ 0 ]}
            alt={product.name}
            width={300}
            height={300}
            className={`object-contain transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"
              }`}
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </div>
      </Link>

      {/* BRAND */}
      <p className="text-xs text-gray-400 tracking-wide uppercase mb-1">
        {product.brand}
      </p>

      {/* NAME */}
      <Link href={`/products/${product.id}`}>
        <h2 className="text-lg font-semibold mb-2 group-hover:text-white transition">
          {product.name}
        </h2>
      </Link>

      {/* PRICE */}
      <div className="flex justify-between items-center mt-3">
        <p className="text-xl font-bold text-white">
          ₹{product.price.toLocaleString()}
        </p>

        {/* RATING */}
        <div className="text-xs text-yellow-400">
          ★ {product.rating}
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[ 0 ],
            qty: 1,
          })
        }
        className="mt-5 w-full bg-white text-black py-3 rounded-xl font-medium transition hover:bg-[#d4af37] hover:text-black"
      >
        Add to Cart
      </button>
    </div>
  );
}
