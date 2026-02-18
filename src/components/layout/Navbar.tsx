"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const { toggleCart } = useCart();

  return (
    <nav
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`fixed top-0 left-0 w-full bg-black text-white transition-all duration-300 z-50 ${
        expanded ? "h-40" : "h-16"
      }`}
    >
      <div className="flex justify-between items-center px-10 h-16">
        <Link href="/" className="text-xl font-semibold">
          ChronoCart
        </Link>

        <div className="flex gap-8">
          <Link href="/products">Watches</Link>
          <Link href="/about">About</Link>
          <button onClick={toggleCart}>Cart</button>
        </div>
      </div>

      {expanded && (
        <div className="flex gap-12 px-10 pt-4 text-sm opacity-80">
          <Link href="/products?category=Luxury">Luxury</Link>
          <Link href="/products?category=Sport">Sport</Link>
          <Link href="/products?category=Smart">Smart</Link>
        </div>
      )}
    </nav>
  );
}
