"use client";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="border p-6 rounded-lg hover:shadow-xl transition">
      <Link href={`/product/${product.id}`}>
        <h2 className="text-lg font-semibold">{product.name}</h2>
      </Link>
      <p className="text-gray-500">₹{product.price}</p>

      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            qty: 1,
          })
        }
        className="mt-4 bg-black text-white px-4 py-2"
      >
        Add to Cart
      </button>
    </div>
  );
}
