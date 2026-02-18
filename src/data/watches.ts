import { Product } from "@/types/product";

export const watches: Product[] = [
  {
    id: "rolex-sub",
    name: "Rolex Submariner",
    brand: "Rolex",
    price: 89999,
    description: "Luxury diving watch",
    images: ["/watches/rolex.png"],
    category: "Luxury",
  },
  {
    id: "omega-speed",
    name: "Omega Speedmaster",
    brand: "Omega",
    price: 69999,
    description: "Moonwatch legend",
    images: ["/watches/omega.png"],
    category: "Sport",
  }
];
