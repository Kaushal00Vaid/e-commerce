import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cart, increment, decrement, remove } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // --- EMPTY STATE ---
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#2E1A47] flex flex-col items-center justify-center px-6 text-center">
        <div className="bg-[#3D2459] p-8 rounded-full mb-6 border border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
          <ShoppingBag size={48} className="text-[#D4AF37]" />
        </div>
        <h1 className="text-4xl font-serif text-[#F3E5AB] mb-4">
          Your Collection is Empty
        </h1>
        <p className="text-[#CAB8D9] mb-8 max-w-md text-lg font-light">
          The artisans are waiting. Discover unique handcrafted pieces to add to
          your treasury.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-[#D4AF37] text-[#2E1A47] px-8 py-3 rounded-full font-bold hover:bg-[#C5A065] transition shadow-lg flex items-center gap-2"
        >
          Browse The Collection <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  // --- MAIN CART ---
  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] py-24 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-10 text-center text-[#D4AF37] border-b border-[#D4AF37]/20 pb-6">
          Your Selection
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT: CART ITEMS LIST */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row items-center gap-6 bg-[#3D2459] p-5 rounded-xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition duration-300 shadow-md group"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-[#2E1A47] rounded-lg overflow-hidden border border-[#D4AF37]/20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 text-center sm:text-left w-full">
                  <h2 className="text-xl font-serif text-[#F3E5AB]">
                    {item.name}
                  </h2>
                  <p className="text-[#D4AF37] mt-1 font-medium">
                    Unit: ₹{item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center sm:justify-start mt-4 space-x-3">
                    <button
                      onClick={() => decrement(item.productId)}
                      className="w-8 h-8 flex items-center justify-center border border-[#D4AF37]/50 rounded hover:bg-[#D4AF37] hover:text-[#2E1A47] transition text-[#D4AF37]"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-2 text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increment(item.productId)}
                      className="w-8 h-8 flex items-center justify-center border border-[#D4AF37]/50 rounded hover:bg-[#D4AF37] hover:text-[#2E1A47] transition text-[#D4AF37]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Total & Remove */}
                <div className="flex flex-col items-center sm:items-end gap-3 min-w-[100px]">
                  <p className="text-xl font-bold text-[#F3E5AB]">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => remove(item.productId)}
                    className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 opacity-70 hover:opacity-100 transition"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY PANEL */}
          <div className="lg:col-span-1">
            <div className="bg-[#3D2459]/50 backdrop-blur-sm p-6 rounded-xl border border-[#D4AF37]/30 sticky top-24">
              <h3 className="text-xl font-serif text-[#D4AF37] mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#CAB8D9]">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-[#CAB8D9]">
                  <span>Shipping</span>
                  <span className="text-[#D4AF37] text-xs">
                    Calculated at Checkout
                  </span>
                </div>
                <div className="h-[1px] bg-[#D4AF37]/20 my-2"></div>
                <div className="flex justify-between text-2xl font-bold text-[#F3E5AB]">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#D4AF37] text-[#2E1A47] py-3.5 rounded-lg font-bold hover:bg-[#C5A065] transition shadow-lg flex justify-center items-center gap-2 group"
              >
                Proceed to Checkout{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </button>

              <p className="text-center text-[#CAB8D9]/50 text-xs mt-4">
                Secure Checkout • Authentic Handcrafts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
