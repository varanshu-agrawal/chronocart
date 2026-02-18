"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface UserType {
  uid: string;
  email: string | null;
}

interface AuthContextType {
  user: UserType | null;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser({ uid: u.uid, email: u.email });
      else setUser(null);
    });
    return () => unsub();
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      name,
      email,
      createdAt: new Date(),
    });
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext error");
  return context;
};
