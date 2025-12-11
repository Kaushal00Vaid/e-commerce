import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, increment, decrement, remove } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="px-4 md:px-10 py-20 text-center">
        <h1 className="text-3xl font-semibold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">
          Add some beautiful crafts to your cart!
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-[#8B5E34] text-white px-6 py-3 rounded-lg hover:bg-[#a6784f] transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col md:flex-row items-center md:items-start gap-4 border rounded-lg p-4 shadow-sm bg-white"
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg"
            />

            {/* Product Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600 mt-1">Price: ₹{item.price}</p>
              <p className="text-gray-500 mt-1">
                Total: ₹{item.price * item.quantity}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center mt-3 space-x-2">
                <button
                  onClick={() => decrement(item.productId)}
                  className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => increment(item.productId)}
                  className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => remove(item.productId)}
              className="mt-3 md:mt-0 md:ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center md:items-end bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold">
          Total Amount: <span className="text-green-600">₹{totalAmount}</span>
        </h2>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
