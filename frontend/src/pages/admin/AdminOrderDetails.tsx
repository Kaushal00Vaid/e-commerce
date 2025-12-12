import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Box,
  CreditCard,
  ChevronLeft,
  Calendar,
  FileText,
} from "lucide-react";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);

  const fetchOrder = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    setOrder(res.data.order);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order)
    return (
      <div className="min-h-screen bg-[#2E1A47] flex items-center justify-center text-[#D4AF37] font-serif animate-pulse">
        Loading Manifesto...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] p-6 pt-24 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#CAB8D9] hover:text-[#D4AF37] mb-6 transition"
        >
          <ChevronLeft size={20} /> Back to Orders
        </button>

        {/* Invoice Card */}
        <div className="bg-[#F3E5AB] text-[#2E1A47] rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#24123a] text-[#F3E5AB] p-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-[#D4AF37]">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#D4AF37]">
                Order Invoice
              </h1>
              <p className="font-mono text-sm opacity-70 mt-1">#{order._id}</p>
            </div>
            <div className="mt-4 md:mt-0 px-4 py-2 bg-[#D4AF37] text-[#2E1A47] font-bold rounded uppercase tracking-wider text-sm shadow-lg">
              {order.status}
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Customer Info */}
            <div>
              <h3 className="text-[#2E1A47] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-[#2E1A47]/10 pb-2">
                <User size={14} /> Customer Details
              </h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2 font-bold text-lg">
                  {order.user?.name || "Guest User"}
                </p>
                <p className="flex items-center gap-2 text-[#2E1A47]/70 text-sm">
                  <Mail size={14} /> {order.user?.email || "N/A"}
                </p>
                <p className="flex items-center gap-2 text-[#2E1A47]/70 text-sm">
                  <Calendar size={14} />{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h3 className="text-[#2E1A47] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-[#2E1A47]/10 pb-2">
                <CreditCard size={14} /> Payment Summary
              </h3>
              <div className="bg-[#2E1A47]/5 p-4 rounded-lg">
                <div className="flex justify-between mb-2 text-sm">
                  <span className="opacity-70">Payment Ref:</span>
                  <span className="font-mono font-bold">
                    {order.paymentProof || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-[#2E1A47]/10 pt-2 mt-2">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="px-8 pb-8">
            <h3 className="text-[#2E1A47] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-[#2E1A47]/10 pb-2">
              <Box size={14} /> Purchased Items
            </h3>

            <div className="space-y-3">
              {order.items.map((i: any) => (
                <div
                  key={i._id}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-[#2E1A47]/10 shadow-sm"
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={i.product?.images?.[0]?.url}
                      alt={i.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-serif font-bold text-lg text-[#2E1A47]">
                      {i.product?.name}
                    </p>
                    <div className="flex items-center gap-4 text-sm mt-1 text-[#2E1A47]/60">
                      <span>Qty: {i.quantity}</span>
                      <span>Price: ₹{i.product?.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center px-4 font-bold text-lg text-[#D4AF37]">
                    ₹{i.product?.price * i.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#2E1A47]/5 p-4 text-center text-[#2E1A47]/40 text-xs uppercase tracking-widest">
            End of Invoice • Hind Cultural Crafts
          </div>
        </div>
      </div>
    </div>
  );
}
