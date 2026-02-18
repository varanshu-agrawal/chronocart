"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const { toggleCart } = useCart();
  const navRef = useRef<HTMLDivElement>(null);
  const [ expanded, setExpanded ] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      height: expanded ? 140 : 64,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [ expanded ]);

  return (
    <div
      ref={navRef}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="fixed top-0 left-0 w-full bg-black text-white z-50 overflow-hidden"
      style={{ height: 64 }}
    >
      <div className="flex justify-between items-center px-12 h-16">
        <Link href="/" className="text-2xl font-semibold tracking-wide">
          ChronoCart
        </Link>

        <div className="flex gap-10 items-center text-sm">
          <Link href="/products">Watches</Link>
          <Link href="/search">Search</Link>
          <Link href="/about">About</Link>
          <button onClick={toggleCart}>Cart</button>
        </div>
      </div>

      {/* Expand section */}
      <div className="px-12 pt-4 flex gap-16 text-gray-300 text-sm">
        <Link href="/products?category=Luxury">Luxury</Link>
        <Link href="/products?category=Sport">Sport</Link>
        <Link href="/products?category=Smart">Smart</Link>
        <Link href="/products?category=Limited">Limited Edition</Link>
      </div>
    </div>
  );
}
