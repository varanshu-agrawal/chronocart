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
        className="fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-xl"
        style={{ transform: "translateX(400px)" }}
      >
        <div className="p-6 flex justify-between">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={toggleCart}>X</button>
        </div>

        <div className="px-6 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p>{item.name}</p>
                <p>₹{item.price} x {item.qty}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
