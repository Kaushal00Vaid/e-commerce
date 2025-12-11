export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_KEY = "cartItems";

export const getCartItems = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCartItems = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (item: CartItem) => {
  const cart = getCartItems();

  const existing = cart.find((c) => c.productId === item.productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(item);
  }

  saveCartItems(cart);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
