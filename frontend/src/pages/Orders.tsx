import { useEffect, useState } from "react";
import axios from "axios";
import type { Order } from "../types/Order";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((o) => (
        <div key={o._id} className="border p-4 rounded mb-4">
          <p className="font-semibold">Order ID: {o._id}</p>
          <p>Status: {o.status}</p>
          <p>Total: ₹{o.totalAmount}</p>

          <h3 className="font-semibold mt-2">Items:</h3>
          {o.items.map((i) => (
            <div key={i._id} className="flex items-center gap-2">
              {typeof i.product === "object" ? (
                <>
                  <img
                    src={i.product.images?.[0]?.url}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <span>
                    {i.product.name} × {i.quantity}
                  </span>
                </>
              ) : (
                <span>Product × {i.quantity}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
