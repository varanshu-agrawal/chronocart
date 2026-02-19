import Link from "next/link";
import { watches } from "@/data/watches";
import ProductCard from "@/components/product/ProductCard";

export default function Home() {
  return (
    <div className="px-10">

      {/* HERO */}
      <section className="h-[80vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-semibold mb-6">
          Timeless Luxury Watches
        </h1>
        <p className="text-gray-400 max-w-xl mb-8">
          Discover premium timepieces crafted for performance, elegance and legacy.
        </p>

        <Link
          href="/products"
          className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-[#d4af37] transition"
        >
          Shop Collection
        </Link>
      </section>

      {/* FEATURED */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold mb-8">Featured Watches</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {watches.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="bg-[#111] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
          <p className="text-gray-400 text-sm">
            Curated luxury watches from top global brands.
          </p>
        </div>

        <div className="bg-[#111] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Secure Checkout</h3>
          <p className="text-gray-400 text-sm">
            Safe and seamless checkout experience.
          </p>
        </div>

        <div className="bg-[#111] p-8 rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-400 text-sm">
            Delivered to your doorstep with care.
          </p>
        </div>
      </section>
    </div>
  );
}
