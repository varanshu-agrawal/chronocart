import { watches } from "@/data/watches";
import { notFound } from "next/navigation";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = watches.find(p => p.id === params.id);
  if (!product) return notFound();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-4">₹{product.price}</p>
      <p className="mt-4">{product.description}</p>
    </div>
  );
}
