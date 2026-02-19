"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CartDrawer() {
  const { cart, isOpen, toggleCart, removeFromCart } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current) return;

    if (isOpen) {
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(drawerRef.current, { x: 400, duration: 0.4 });
    }
  }, [ isOpen ]);


  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleCart}
        />
      )}

      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-[420px] bg-[#0b0b0c] text-white z-50 shadow-2xl border-l border-[#222] p-6 flex flex-col"
        style={{ transform: "translateX(420px)" }}
      >
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto space-y-5">
          {cart.length === 0 && (
            <p className="text-gray-500">Cart is empty</p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-[#222] pb-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">
                  ₹{item.price} × {item.qty}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="mt-6">
          <p className="text-lg font-semibold mb-4">
            Total: ₹
            {cart.reduce((t, i) => t + i.price * i.qty, 0).toLocaleString()}
          </p>

          <a
            href="/checkout"
            onClick={toggleCart}
            className="block text-center bg-white text-black py-3 rounded-xl font-semibold hover:bg-[#d4af37] transition"
          >
            Checkout
          </a>
        </div>
      </div>

    </>
  );
}
