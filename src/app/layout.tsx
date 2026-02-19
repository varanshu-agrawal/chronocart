import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/layout/CartDrawer";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer";
import { WishlistProvider } from "@/context/WishlistContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pt-16">
        <CartProvider>
          <AuthProvider>
            <WishlistProvider>
              <Navbar />
              <CartDrawer />
              {children}
              <Footer />
            </WishlistProvider>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
