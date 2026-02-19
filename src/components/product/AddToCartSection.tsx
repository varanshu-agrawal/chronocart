"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartSection({ product }: any) {
  const { addToCart } = useCart();
  const [ wish, setWish ] = useState(false);

  return (
    <div className="flex gap-4 mt-4">

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
        className="flex-1 cursor-pointer bg-white text-black py-4 rounded-xl font-semibold hover:bg-[#d4af37] transition"
      >
        Add to Cart
      </button>

      <button
        onClick={() => setWish(!wish)}
        className="px-6 py-4 border border-[#333] rounded-xl hover:bg-[#111]"
      >
        {wish ? "♥ Wishlisted" : "♡ Wishlist"}
      </button>
    </div>
  );
}
