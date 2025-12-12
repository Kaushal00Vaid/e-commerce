import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardList,
  User,
  Box,
  CreditCard,
  ChevronRight,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Filter,
} from "lucide-react";

const FILTERS = {
  pending: ["pending"],
  progress: ["paid", "shipped"],
  completed: ["delivered", "cancelled"],
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState<keyof typeof FILTERS>("pending");

  const fetchOrders = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/orders`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/orders/${orderId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    fetchOrders();
  };

  const filteredOrders = orders.filter((o: any) =>
    FILTERS[filter].includes(o.status)
  );

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] p-6 pt-24 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-[#3D2459] rounded-xl border border-[#D4AF37]/30 shadow-lg">
            <ClipboardList className="text-[#D4AF37]" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#F3E5AB]">
              Order Management
            </h1>
            <p className="text-[#CAB8D9] text-sm">
              Track and fulfill customer requests
            </p>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="flex flex-wrap gap-2 mb-8 bg-[#3D2459]/50 p-2 rounded-xl border border-[#D4AF37]/20 w-fit">
          {[
            {
              key: "pending",
              label: "Pending Approval",
              icon: <Clock size={16} />,
            },
            {
              key: "progress",
              label: "In Progress",
              icon: <Truck size={16} />,
            },
            {
              key: "completed",
              label: "Archived",
              icon: <CheckCircle size={16} />,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as keyof typeof FILTERS)}
              className={`px-5 py-2.5 rounded-lg flex items-center gap-2 transition font-medium text-sm
                ${
                  filter === tab.key
                    ? "bg-[#D4AF37] text-[#2E1A47] shadow-lg"
                    : "text-[#CAB8D9] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-6">
          {filteredOrders.length === 0 && (
            <div className="text-center py-20 bg-[#3D2459]/30 rounded-2xl border border-dashed border-[#D4AF37]/30">
              <Filter className="mx-auto text-[#D4AF37]/30 mb-4" size={40} />
              <p className="text-[#CAB8D9]">
                No orders found in this category.
              </p>
            </div>
          )}

          {filteredOrders.map((o: any) => (
            <div
              key={o._id}
              className="bg-[#3D2459] border border-[#D4AF37]/10 rounded-xl overflow-hidden hover:border-[#D4AF37]/30 transition shadow-lg"
            >
              {/* Order Header */}
              <div className="bg-[#24123a] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#D4AF37]/10">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[#CAB8D9] text-xs uppercase tracking-widest">
                      Order ID
                    </span>
                    <Link
                      to={`/admin/orders/${o._id}`}
                      className="font-mono text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      #{o._id} <ChevronRight size={14} />
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-[#F3E5AB]">
                    <User size={14} className="text-[#D4AF37]" />
                    {o.user?.name || "Guest"}
                    <span className="text-[#CAB8D9] text-xs">
                      ({o.user?.email})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#CAB8D9] text-sm hidden md:block">
                    Status:
                  </span>
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="bg-[#2E1A47] border border-[#D4AF37]/30 text-[#F3E5AB] text-sm rounded-lg px-3 py-1.5 focus:border-[#D4AF37] outline-none cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Items */}
                <div>
                  <h3 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Box size={14} /> Items
                  </h3>
                  <div className="space-y-2">
                    {o.items.map((i: any) => (
                      <div
                        key={i._id}
                        className="flex justify-between text-sm border-b border-[#D4AF37]/10 pb-2 last:border-0"
                      >
                        <span className="text-[#F3E5AB]">
                          {i.product?.name || "Unknown Product"}
                        </span>
                        <span className="text-[#CAB8D9]">x {i.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-[#2E1A47]/50 rounded-lg p-4 border border-[#D4AF37]/10">
                  <h3 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CreditCard size={14} /> Payment Details
                  </h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#CAB8D9] text-sm">Total Amount</span>
                    <span className="text-[#F3E5AB] font-bold text-lg">
                      ₹{o.totalAmount}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[#CAB8D9] text-xs">
                      Reference ID:
                    </span>
                    <code className="bg-[#2E1A47] text-[#D4AF37] px-2 py-1 rounded text-xs font-mono break-all border border-[#D4AF37]/20">
                      {o.paymentProof || "N/A"}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
