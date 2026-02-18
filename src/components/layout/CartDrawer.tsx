"use client";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, toggleCart, removeFromCart } = useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleCart}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
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
