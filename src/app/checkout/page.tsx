"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { db, auth } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ createAccount, setCreateAccount ] = useState(false);
  const [ password, setPassword ] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleOrder = async () => {
    try {
      let userId = user?.uid || null;

      // 🟢 If guest wants account
      if (!user && createAccount) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        userId = res.user.uid;
      }

      // 🟢 Save order
      await addDoc(collection(db, "orders"), {
        userId: userId || null,
        guestInfo: {
          name,
          email,
          phone,
          address,
        },
        items: cart,
        total,
        createdAt: new Date(),
      });

      alert("Order placed successfully 🚀");
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <input
        placeholder="Name"
        className="border p-3 w-full mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        className="border p-3 w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Phone"
        className="border p-3 w-full mb-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <textarea
        placeholder="Address"
        className="border p-3 w-full mb-3"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* Create account checkbox */}
      {!user && (
        <div className="mb-4">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={createAccount}
              onChange={() => setCreateAccount(!createAccount)}
            />
            Create account with these details
          </label>
        </div>
      )}

      {/* password field if create account */}
      {createAccount && !user && (
        <input
          type="password"
          placeholder="Create password"
          className="border p-3 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      <div className="mt-6 text-xl font-semibold">
        Total: ₹{total}
      </div>

      <button
        onClick={handleOrder}
        className="bg-black text-white px-6 py-3 mt-6 w-full"
      >
        Place Order
      </button>
    </div>
  );
}
