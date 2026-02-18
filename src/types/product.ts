export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  readonly rating: number;
  stock: number;
  features: string[];
}
