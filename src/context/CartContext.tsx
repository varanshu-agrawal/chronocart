"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
  const [ cart, setCart ] = useState<CartItem[]>([]);
  const [ isOpen, setIsOpen ] = useState(false);

  // 🔥 LOAD cart from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // 🔥 SAVE cart whenever changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [ cart ]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [ ...prev, item ];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <CartContext.Provider
      value={{ cart, isOpen, addToCart, removeFromCart, toggleCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartContext missing");
  return ctx;
};
