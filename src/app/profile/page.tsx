"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface OrderType {
  id: string;
  total: number;
  items: any[];
  createdAt: any;
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [ orders, setOrders ] = useState<OrderType[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const snapshot = await getDocs(
        collection(db, "orders", user.uid, "userOrders")
      );

      const data: OrderType[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any),
      }));

      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, [ user ]);

  if (!user) {
    return (
      <div className="p-20 text-center text-xl">
        Please login to view profile
      </div>
    );
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      {/* USER INFO */}
      <div className="bg-black text-white p-8 rounded-xl mb-10 flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold">My Profile</h1>
          <p className="opacity-70 mt-2">{user.email}</p>
        </div>

        <button
          onClick={logout}
          className="bg-white text-black px-6 py-2 h-fit"
        >
          Logout
        </button>
      </div>

      {/* ORDERS */}
      <h2 className="text-2xl font-semibold mb-6">Order History</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="border p-6 rounded-xl shadow-sm"
            >
              <div className="flex justify-between mb-4">
                <p className="font-semibold">Order #{order.id.slice(0, 6)}</p>
                <p className="font-semibold">₹{order.total}</p>
              </div>

              <div className="space-y-2">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{item.name} x {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-3">
                {order.createdAt?.toDate?.().toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
