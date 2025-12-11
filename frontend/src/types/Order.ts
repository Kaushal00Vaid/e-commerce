// Product inside order item (populated from backend)
export interface OrderProduct {
  _id: string;
  name: string;
  price: number;
  images?: { url: string }[];
}

// Each item inside order
export interface OrderItem {
  _id?: string;
  product: string | OrderProduct; // before populate = string ID, after = full product object
  quantity: number;
}

// Main Order type
export interface Order {
  _id: string;
  user: string; // user ID or populated user (if you want full object, tell me)
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  paymentProof?: string;
  createdAt: string;
  updatedAt: string;
}
