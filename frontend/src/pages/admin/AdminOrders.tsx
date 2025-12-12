import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const FILTERS = {
  pending: ["pending"],
  progress: ["paid", "shipped"],
  completed: ["delivered", "cancelled"],
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState<keyof typeof FILTERS>("pending");

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    await axios.put(
      `http://localhost:5000/api/admin/orders/${orderId}/status`,
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders Dashboard</h1>

      {/* FILTER BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-md border 
          ${
            filter === "pending"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("progress")}
          className={`px-4 py-2 rounded-md border 
          ${
            filter === "progress"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          In Progress (Paid / Shipped)
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-md border 
          ${
            filter === "completed"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          Completed / Cancelled
        </button>
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-5">
        {filteredOrders.length === 0 && (
          <p className="text-gray-500 text-center">No orders found.</p>
        )}

        {filteredOrders.map((o: any) => (
          <div key={o._id} className="border p-4 rounded">
            <div className="flex justify-between mb-2">
              <p className="font-bold">
                Order ID:{" "}
                <Link
                  to={`/admin/orders/${o._id}`}
                  className="text-blue-600 underline"
                >
                  {o._id}
                </Link>
              </p>

              <p>
                User: {o.user?.name || "Unknown"}
                <span className="text-gray-600 text-sm">
                  {" "}
                  ({o.user?.email})
                </span>
              </p>
            </div>

            <div className="mb-2">
              {o.items.map((i: any) => (
                <p key={i._id}>
                  {i.product?.name} × {i.quantity}
                </p>
              ))}
            </div>

            <p className="mb-2 font-semibold">Total: ₹{o.totalAmount}</p>

            <select
              value={o.status}
              onChange={(e) => updateStatus(o._id, e.target.value)}
              className="border p-2 rounded"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <p className="text-sm text-gray-500 mt-2">
              Payment Proof: {o.paymentProof || "None"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
