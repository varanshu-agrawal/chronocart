"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { useAuth } from "./AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";

const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({ children }: any) => {
  const [ wishlist, setWishlist ] = useState<string[]>([]);
  const { user } = useAuth();

  // load from local
  useEffect(() => {
    const local = localStorage.getItem("wishlist");
    if (local) setWishlist(JSON.parse(local));
  }, []);

  // load from firestore if logged in
  useEffect(() => {
    const load = async () => {
      if (!user) return;

      const ref = doc(db, "wishlists", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setWishlist(snap.data().items || []);
      }
    };

    load();
  }, [ user ]);

  // sync
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    if (user) {
      setDoc(doc(db, "wishlists", user.uid), {
        items: wishlist,
      });
    }
  }, [ wishlist, user ]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [ ...prev, id ]
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
