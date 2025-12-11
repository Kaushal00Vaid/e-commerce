import { createContext, useContext, useState, useEffect } from "react";
import { getCartItems, saveCartItems, type CartItem } from "../utils/cart";

interface CartContextType {
  cart: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCartItems());
  }, []);

  const sync = (items: CartItem[]) => {
    setCart(items);
    saveCartItems(items);
  };

  const add = (item: CartItem) => {
    const existing = cart.find((c) => c.productId === item.productId);

    if (existing) {
      existing.quantity += 1;
      sync([...cart]);
    } else {
      sync([...cart, item]);
    }
  };

  const remove = (productId: string) => {
    sync(cart.filter((c) => c.productId !== productId));
  };

  const increment = (productId: string) => {
    sync(
      cart.map((c) =>
        c.productId === productId ? { ...c, quantity: c.quantity + 1 } : c
      )
    );
  };

  const decrement = (productId: string) => {
    const updated = cart
      .map((c) =>
        c.productId === productId
          ? { ...c, quantity: Math.max(1, c.quantity - 1) }
          : c
      )
      .filter((c) => c.quantity > 0);

    sync(updated);
  };

  return (
    <CartContext.Provider value={{ cart, add, remove, increment, decrement }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext)!;
