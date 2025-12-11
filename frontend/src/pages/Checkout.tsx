import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import qrCode from "../assets/qr.png";
import axios from "axios";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentRef, setPaymentRef] = useState("");

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

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

      const res = await axios.post(
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

      clearCart();
      navigate("/orders");
    } catch (err) {
      alert("Order failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <h2 className="text-xl mb-2 font-semibold">Scan to Pay</h2>
      <img src={qrCode} alt="QR Code" className="w-64 mb-4 border p-2" />

      <h2 className="font-semibold text-lg mt-4 mb-2">Enter Payment Ref ID</h2>
      <input
        value={paymentRef}
        onChange={(e) => setPaymentRef(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Eg: UPI/TRANS/123456"
      />

      <h2 className="font-semibold text-lg mt-4 mb-2">Order Summary</h2>
      <div className="border rounded p-4">
        {cart.map((item) => (
          <div key={item.productId} className="flex justify-between mb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-3 text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        onClick={handleOrder}
        className="bg-black text-white w-full py-3 rounded mt-6"
      >
        Confirm Order
      </button>
    </div>
  );
}
