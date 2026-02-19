import { watches } from "@/data/watches";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartSection from "@/components/product/AddToCartSection";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = watches.find((p) => p.id === id);
  if (!product) return notFound();

  const isLowStock = product.stock <= 3;

  return (
    <div className="px-10 py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT: IMAGE */}
        <div className="bg-[#111] rounded-3xl p-10 flex items-center justify-center relative">
          {isLowStock && (
            <div className="absolute top-6 left-6 bg-red-600 text-white text-xs px-4 py-2 rounded-full">
              Only {product.stock} left
            </div>
          )}

          <Image
            src={product.images[ 0 ]}
            alt={product.name}
            width={450}
            height={450}
            className="object-contain"
            priority
          />
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col justify-center">

          <p className="text-sm text-gray-400 uppercase tracking-widest">
            {product.brand}
          </p>

          <h1 className="text-4xl font-semibold mt-2 mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="text-yellow-400 mb-6">
            ★ {product.rating} rating
          </div>

          {/* PRICE */}
          <div className="mb-6">
            {product.salePrice ? (
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-white">
                  ₹{product.salePrice.toLocaleString()}
                </span>
                <span className="text-lg line-through text-gray-500">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-green-400 text-sm">
                  {Math.round(
                    ((product.price - product.salePrice) / product.price) * 100
                  )}
                  % OFF
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-white">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-400 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* ADD TO CART SECTION */}
          <AddToCartSection product={product} />

        </div>
      </div>
    </div>
  );
}
