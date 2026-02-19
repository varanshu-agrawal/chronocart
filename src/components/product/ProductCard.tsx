"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [ hovered, setHovered ] = useState(false);
  const [ wishlist, setWishlist ] = useState(false);
  const [ quickView, setQuickView ] = useState(false);

  const isLowStock = product.stock <= 3;

  return (
    <>
      <div
        className="group relative bg-[#111] border border-[#222] rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-[#333]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* LOW STOCK BADGE */}
        {isLowStock && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full z-10">
            Only {product.stock} left
          </div>
        )}

        {/* WISHLIST BUTTON */}
        <button
          onClick={() => setWishlist(!wishlist)}
          className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur px-2 py-1 rounded-full"
        >
          <span className={wishlist ? "text-red-500" : "text-white"}>
            ♥
          </span>
        </button>

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

        {/* PRICE SECTION */}
        <div className="flex justify-between items-center mt-3">
          <div>
            {product.salePrice ? (
              <>
                <p className="text-xl font-bold text-white">
                  ₹{product.salePrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  ₹{product.price.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-white">
                ₹{product.price.toLocaleString()}
              </p>
            )}
          </div>

          <div className="text-xs text-yellow-400">
            ★ {product.rating}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.salePrice || product.price,
                image: product.images[ 0 ],
                qty: 1,
              })
            }
            className="flex-1 bg-white text-black py-3 rounded-xl font-medium transition hover:bg-[#d4af37]"
          >
            Add
          </button>

          <button
            onClick={() => setQuickView(true)}
            className="flex-1 border border-[#333] py-3 rounded-xl hover:bg-[#222] transition"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-[#111] p-8 rounded-2xl w-[500px] relative">
            <button
              onClick={() => setQuickView(false)}
              className="absolute top-4 right-4 text-gray-400"
            >
              ✕
            </button>

            <div className="flex flex-col items-center text-center">
              <Image
                src={product.images[ 0 ]}
                alt={product.name}
                width={300}
                height={300}
                className="object-contain mb-6"
              />

              <h2 className="text-2xl font-semibold mb-3">
                {product.name}
              </h2>

              <p className="text-gray-400 mb-4">
                {product.description}
              </p>

              <p className="text-xl font-bold mb-6">
                ₹{(product.salePrice || product.price).toLocaleString()}
              </p>

              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.salePrice || product.price,
                    image: product.images[ 0 ],
                    qty: 1,
                  });
                  setQuickView(false);
                }}
                className="bg-white text-black px-8 py-3 rounded-xl hover:bg-[#d4af37] transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
