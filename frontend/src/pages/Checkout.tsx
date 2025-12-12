import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import qrCode from "../assets/qr.png";
import axios from "axios";
import { QrCode, CreditCard, Lock, CheckCircle, Check } from "lucide-react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentRef, setPaymentRef] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Controls the animation

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  useEffect(() => {
    // Prevent redirect if we are in the "Success" state (cart might be empty by then)
    if (!isSuccess && (!cart || cart.length === 0)) {
      navigate("/cart");
    }
  }, [cart, navigate, isSuccess]);

  const handleOrder = async () => {
    if (!paymentRef.trim()) {
      alert("Please enter payment reference ID");
      return;
    }

    try {
      const items = cart.map((c) => ({
        product: c.productId,
        quantity: c.quantity,
      }));

      // 1. API Call
      await axios.post(
        "http://localhost:5000/api/orders/create",
        {
          items,
          totalAmount: total,
          paymentProof: paymentRef,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // 2. Trigger Success Animation
      setIsSuccess(true);
      clearCart();

      // 3. Wait for animation (3 seconds) then redirect
      setTimeout(() => {
        navigate("/orders");
      }, 3000);
    } catch (err) {
      alert("Order failed. Please try again.");
    }
  };

  // --- SUCCESS ANIMATION OVERLAY ---
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#2E1A47] flex flex-col items-center justify-center animate-fade-in">
        {/* Pulsing Circles */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-40 h-40 bg-[#D4AF37] rounded-full opacity-20 animate-ping"></div>
          <div
            className="absolute w-52 h-52 bg-[#D4AF37] rounded-full opacity-10 animate-ping"
            style={{ animationDelay: "0.2s" }}
          ></div>

          {/* Main Checkmark Circle */}
          <div className="relative w-32 h-32 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.6)] animate-bounce-short">
            <Check className="text-[#2E1A47] w-16 h-16 stroke-[4]" />
          </div>
        </div>

        {/* Text */}
        <h2 className="mt-10 text-3xl font-serif font-bold text-[#F3E5AB] animate-slide-up">
          Payment Successful
        </h2>
        <p
          className="text-[#CAB8D9] mt-2 text-lg animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          Redirecting to your orders...
        </p>
      </div>
    );
  }

  // --- STANDARD CHECKOUT UI ---
  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] py-24 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT COLUMN: PAYMENT */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
              <CreditCard className="text-[#D4AF37]" size={24} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#D4AF37]">
              Checkout
            </h1>
          </div>

          <div className="bg-[#3D2459] p-8 rounded-xl border border-[#D4AF37]/20 shadow-lg">
            {/* QR Section - Zoomed In */}
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-lg font-semibold mb-4 text-[#CAB8D9] flex items-center gap-2">
                <QrCode size={18} /> Scan to Pay
              </h2>
              <div className="p-4 bg-white rounded-2xl border-4 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10">
                <img
                  src={qrCode}
                  alt="QR Code"
                  className="w-72 h-72 object-contain"
                />
              </div>
              <p className="text-sm text-[#CAB8D9] mt-4 font-medium">
                Accepting UPI / GPay / Paytm
              </p>
            </div>

            {/* Input Section */}
            <div>
              <label className="block text-[#D4AF37] text-sm font-bold mb-2 tracking-wide uppercase">
                Payment Reference ID
              </label>
              <input
                value={paymentRef}
                onChange={(e) => setPaymentRef(e.target.value)}
                className="w-full bg-[#2E1A47] border border-[#D4AF37]/40 text-[#F3E5AB] p-4 rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition placeholder-[#CAB8D9]/30"
                placeholder="Enter Transaction ID (e.g. UPI/123456)"
              />
              <p className="text-xs text-[#CAB8D9]/60 mt-2 flex items-center gap-1">
                <Lock size={10} /> Your transaction reference is required for
                verification.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-serif font-bold text-[#F3E5AB] mb-6 flex items-center gap-2">
            Order Summary
          </h2>

          <div className="bg-[#F3E5AB] text-[#2E1A47] p-8 rounded-xl shadow-2xl flex-1 flex flex-col relative overflow-hidden">
            {/* Receipt Decorative Top */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37]"></div>

            <h3 className="text-center font-serif text-xl font-bold mb-6 text-[#2E1A47] tracking-widest border-b-2 border-[#2E1A47]/10 pb-4">
              RECEIPT
            </h3>

            <div className="flex-1 overflow-y-auto space-y-4 mb-6 scrollbar-thin scrollbar-thumb-[#2E1A47]/20 max-h-[400px]">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center text-sm border-b border-[#2E1A47]/5 pb-2"
                >
                  <span className="font-medium">
                    {item.name}{" "}
                    <span className="text-[#2E1A47]/60">x {item.quantity}</span>
                  </span>
                  <span className="font-bold">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-[#2E1A47]/20 pt-4 mt-auto">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <p className="text-xs text-[#2E1A47]/50 mt-1 text-center">
                Inclusive of all taxes
              </p>
            </div>

            <button
              onClick={handleOrder}
              className="w-full bg-[#2E1A47] text-[#D4AF37] py-4 rounded-lg font-bold mt-8 hover:bg-[#402E54] transition shadow-lg flex justify-center items-center gap-2 group"
            >
              <CheckCircle
                size={20}
                className="group-hover:scale-110 transition"
              />{" "}
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
