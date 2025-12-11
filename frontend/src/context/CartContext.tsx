import { createContext, useContext, useState, useEffect } from "react";
import { getCartItems, saveCartItems, type CartItem } from "../utils/cart";

interface CartContextType {
  cart: CartItem[];
  add: (item: CartItem, stock?: number) => void; // stock added
  remove: (productId: string) => void;
  increment: (productId: string, stock?: number) => void; // stock added
  decrement: (productId: string) => void;
  clearCart: () => void;
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

  const clearCart = () => {
    sync([]);
  };

  const add = (item: CartItem, stock: number = Infinity) => {
    const existing = cart.find((c) => c.productId === item.productId);

    if (existing) {
      if (existing.quantity < stock) {
        existing.quantity += 1;
        sync([...cart]);
      } else {
        alert("Cannot add more than available stock!");
      }
    } else {
      if (stock > 0) sync([...cart, item]);
      else alert("Out of stock!");
    }
  };

  const remove = (productId: string) => {
    sync(cart.filter((c) => c.productId !== productId));
  };

  const increment = (productId: string, stock: number = Infinity) => {
    sync(
      cart.map((c) => {
        if (c.productId === productId) {
          if (c.quantity < stock) return { ...c, quantity: c.quantity + 1 };
          else {
            alert("Cannot exceed available stock!");
            return c;
          }
        }
        return c;
      })
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
    <CartContext.Provider
      value={{ cart, add, remove, increment, decrement, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext)!;
