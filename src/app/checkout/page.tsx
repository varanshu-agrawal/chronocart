"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { db, auth } from "@/firebase/firebase";
import { doc, setDoc, addDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getUserByEmail } from "@/lib/getUserByEmail";

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

      // 🔍 Check if email already registered
      const existingUserId = await getUserByEmail(email);
      if (existingUserId) {
        userId = existingUserId;
      }

      // 🟢 If user creating account new
      if (!userId && createAccount) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        userId = res.user.uid;

        // create user doc
        await setDoc(doc(db, "users", userId), {
          name,
          email,
          phone,
          createdAt: new Date(),
        });
      }

      // 🟢 If user exists → store inside user orders
      if (userId) {
        const orderRef = doc(collection(db, "orders", userId, "userOrders"));
        await setDoc(orderRef, {
          items: cart,
          total,
          createdAt: new Date(),
        });

        // 🔥 MOVE old guest orders of same email
        const guestQuery = query(
          collection(db, "guestOrders"),
          where("email", "==", email)
        );

        const guestSnap = await getDocs(guestQuery);

        for (const g of guestSnap.docs) {
          const data = g.data();

          const newRef = doc(collection(db, "orders", userId, "userOrders"));
          await setDoc(newRef, data);

          await deleteDoc(g.ref); // remove guest order
        }
      }
      else {
        // 🟡 Pure guest order
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
      alert("Order error");
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
