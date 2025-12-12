import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  const fetchOrder = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/admin/orders/${id}`,
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

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="border p-4 rounded">
        <p className="font-semibold mb-2">Order ID: {order._id}</p>

        <p className="mb-1">
          <strong>User:</strong> {order.user?.name} ({order.user?.email})
        </p>

        <p className="mb-4">
          <strong>Status:</strong> {order.status}
        </p>

        <h2 className="text-lg font-semibold mb-2">Items</h2>

        <div className="space-y-4">
          {order.items.map((i: any) => (
            <div key={i._id} className="flex gap-3 border p-2 rounded">
              <img
                src={i.product?.images?.[0]?.url}
                alt={i.product?.name}
                className="w-24 h-24 rounded object-cover"
              />
              <div>
                <p className="font-semibold">{i.product?.name}</p>
                <p>Price: ₹{i.product?.price}</p>
                <p>Quantity: {i.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 font-bold text-xl">
          Total Amount: ₹{order.totalAmount}
        </p>
      </div>
    </div>
  );
}
