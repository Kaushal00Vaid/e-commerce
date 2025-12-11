export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  tags: string[];
  images: { url: string; public_id: string }[];
}
