import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/layout/CartDrawer";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pt-16">
        <CartProvider>
          <AuthProvider>
            <Navbar />
            <CartDrawer />
            {children}
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
