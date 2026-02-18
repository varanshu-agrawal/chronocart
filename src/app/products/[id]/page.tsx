import { watches } from "@/data/watches";
import { notFound } from "next/navigation";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = watches.find((p) => p.id === id);
  if (!product) return notFound();

  return (
    <div className="p-10">
      <h1 className="text-3xl">{product.name}</h1>
    </div>
  );
}
