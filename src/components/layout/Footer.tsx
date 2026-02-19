import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#222] mt-32">
      <div className="max-w-7xl mx-auto px-10 py-16 grid md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-semibold mb-4">ChronoCart</h2>
          <p className="text-gray-400 text-sm">
            This is a demo ecommerce project built for portfolio and
            educational purposes. No real transactions occur.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Pages</h3>
          <div className="flex flex-col gap-2 text-gray-400 text-sm">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/profile">Profile</Link>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ChronoCart. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-3">
            Built as a demonstration ecommerce platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
