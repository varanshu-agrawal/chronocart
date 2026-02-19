"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { db, auth } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
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

  const total = cart.reduce((t, i) => t + i.price * i.qty, 0);

  // 🔥 MAIN ORDER FUNCTION
  const handleOrder = async () => {
    try {
      let userId = user?.uid || null;

      // 🔍 check if email already exists
      const q = query(collection(db, "users"), where("email", "==", email));
      const snap = await getDocs(q);

      if (!snap.empty) {
        userId = snap.docs[ 0 ].id;
      }

      // 🟢 create new account
      if (!userId && createAccount) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        userId = res.user.uid;

        await setDoc(doc(db, "users", userId), {
          name,
          email,
          phone,
          createdAt: new Date(),
        });
      }

      // 🟢 if user exists → store under user orders
      if (userId) {
        await addDoc(collection(db, "orders", userId, "userOrders"), {
          items: cart,
          total,
          address,
          createdAt: new Date(),
        });

        // 🔥 move guest orders
        const guestQuery = query(
          collection(db, "guestOrders"),
          where("email", "==", email)
        );

        const guestSnap = await getDocs(guestQuery);

        for (const g of guestSnap.docs) {
          await addDoc(collection(db, "orders", userId, "userOrders"), g.data());
          await deleteDoc(g.ref);
        }
      } else {
        // guest order
        await addDoc(collection(db, "guestOrders"), {
          name,
          email,
          phone,
          address,
          items: cart,
          total,
          createdAt: new Date(),
        });
      }

      alert("Order placed successfully 🚀");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-10 py-20 grid lg:grid-cols-2 gap-16">
      {/* FORM */}
      <div>
        <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

        <input className="input mb-3" placeholder="Name" onChange={e => setName(e.target.value)} />
        <input className="input mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="input mb-3" placeholder="Phone" onChange={e => setPhone(e.target.value)} />
        <textarea className="input mb-3" placeholder="Address" onChange={e => setAddress(e.target.value)} />

        {!user && (
          <div className="my-4">
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={() => setCreateAccount(!createAccount)}
              />
              Create account with these details
            </label>
          </div>
        )}

        {createAccount && !user && (
          <input
            type="password"
            placeholder="Create password"
            className="input mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <button
          onClick={handleOrder}
          className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-[#d4af37]"
        >
          Place Order
        </button>
      </div>

      {/* SUMMARY */}
      <div className="bg-[#111] p-8 rounded-2xl h-fit">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-2">
            <span>{item.name} × {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <div className="border-t border-[#222] mt-6 pt-6 text-lg font-semibold">
          Total: ₹{total.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
