export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  rating: number;
  stock: number;
  description: string;
  images: string[];
  features?: string[];
  category: string;
}
