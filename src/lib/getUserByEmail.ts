import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getUserByEmail = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    return snapshot.docs[ 0 ].id; // userId
  }
  return null;
};
