import { watches } from "@/data/watches";
import ProductCard from "@/components/product/ProductCard";

export default function ProductsPage() {
  return (
    <div className="p-10 grid grid-cols-3 gap-10">
      {watches.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
