import { useEffect, useState } from "react";
import axios from "axios";
import type { Order } from "../types/Order";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ShoppingBag,
} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => {});
  }, []);

  // Helper for Status Styles
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "shipped":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default: // pending or processing
        return "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle size={16} />;
      case "shipped":
        return <Package size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] py-24 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 border-b border-[#D4AF37]/20 pb-6">
          <div className="p-3 bg-[#3D2459] rounded-lg border border-[#D4AF37]/20">
            <ShoppingBag className="text-[#D4AF37]" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#F3E5AB]">
              My Order History
            </h1>
            <p className="text-[#CAB8D9] text-sm mt-1">
              Track your artisanal acquisitions
            </p>
          </div>
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-20 bg-[#3D2459]/50 rounded-xl border border-dashed border-[#D4AF37]/30">
            <Package size={48} className="mx-auto text-[#D4AF37]/50 mb-4" />
            <p className="text-[#CAB8D9] text-lg">No orders placed yet.</p>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-[#3D2459] rounded-xl overflow-hidden shadow-lg border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition duration-300"
            >
              {/* Order Header */}
              <div className="bg-[#24123a] p-4 md:p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-[#D4AF37]/10">
                <div className="flex flex-col gap-1">
                  <span className="text-[#CAB8D9] text-xs uppercase tracking-widest">
                    Order ID
                  </span>
                  <span className="font-mono text-[#F3E5AB] text-sm md:text-base">
                    #{o._id}
                  </span>
                </div>

                <div
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium w-fit ${getStatusStyle(
                    o.status
                  )}`}
                >
                  {getStatusIcon(o.status)}
                  <span className="capitalize">{o.status}</span>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-4 md:p-6">
                <h3 className="text-[#D4AF37] font-serif font-semibold mb-4 text-sm uppercase tracking-wide">
                  Items Purchased
                </h3>

                <div className="space-y-4">
                  {o.items.map((i) => (
                    <div
                      key={i._id}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#2E1A47]/50 transition"
                    >
                      {typeof i.product === "object" ? (
                        <>
                          <div className="h-16 w-16 flex-shrink-0 bg-[#2E1A47] rounded-md border border-[#D4AF37]/20 overflow-hidden">
                            <img
                              src={i.product.images?.[0]?.url}
                              alt={i.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[#F3E5AB] font-medium text-lg">
                              {i.product.name}
                            </p>
                            <p className="text-[#CAB8D9] text-sm">
                              Quantity: {i.quantity}
                            </p>
                          </div>
                        </>
                      ) : (
                        <span className="text-[#CAB8D9]">
                          Product data unavailable × {i.quantity}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="bg-[#2E1A47]/30 p-4 md:p-6 flex justify-between items-center border-t border-[#D4AF37]/10">
                <span className="text-[#CAB8D9] text-sm">Total Amount</span>
                <span className="text-xl md:text-2xl font-serif font-bold text-[#D4AF37]">
                  ₹{o.totalAmount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
