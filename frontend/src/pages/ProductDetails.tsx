import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types/Product";
import { addToCart } from "../utils/cart";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImg, setSelectedImg] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("token");

  const { cart, add, increment, decrement } = useCart();
  const navigate = useNavigate();

  const cartItem = product
    ? cart.find((c) => c.productId === product._id)
    : null;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const buyNow = async () => {
    if (!userToken) {
      alert("Please login first!");
      return;
    }

    navigate("/checkout");
  };

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();

      // Backend returns product directly, not { product: ... }
      setProduct(data);
      setSelectedImg(data?.images?.[0]?.url || "");
    } catch (err) {
      console.error("Error loading product:", err);
    }
    setLoading(false);
  };

  if (loading || !product) {
    return <div className="text-center py-20 text-lg">Loading...</div>;
  }

  return (
    <div className="px-4 md:px-10 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: MAIN IMAGE + THUMBNAILS */}
        <div>
          <img
            src={selectedImg}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl shadow"
          />

          <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                onClick={() => setSelectedImg(img.url)}
                className={`h-20 w-20 rounded-lg object-cover cursor-pointer border-2 transition 
                ${
                  selectedImg === img.url
                    ? "border-[#8B5E34]"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div>
          <h1 className="text-4xl font-bold text-[#5A3825]">{product.name}</h1>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <p className="mt-6 text-3xl font-semibold text-[#8B5E34]">
            ₹{product.price}
          </p>

          <p className="mt-2 text-gray-500">
            Stock:{" "}
            {product.stock > 0 ? (
              <span className="text-green-600">
                Available ({product.stock})
              </span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>

          <p className="mt-1 text-gray-500">Category: {product.category}</p>

          {product.tags?.length > 0 && (
            <p className="mt-2 text-sm text-gray-400">
              Tags: {product.tags.join(", ")}
            </p>
          )}

          {/* BUTTONS */}
          <div className="mt-8">
            {cartItem ? (
              <div className="flex items-center space-x-4 mt-3">
                <button
                  onClick={() => decrement(product._id)}
                  className="w-10 h-10 text-xl border border-[#8B5E34] rounded"
                >
                  -
                </button>

                <span className="text-lg font-semibold">
                  {cartItem.quantity}
                </span>

                <button
                  onClick={() => increment(product._id, product.stock)}
                  className="w-10 h-10 text-xl border rounded"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("cartItems");
                    window.location.reload();
                  }}
                  className="ml-6 px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Clear Cart
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  add(
                    {
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.images?.[0]?.url || "",
                      quantity: 1,
                    },
                    product.stock // pass stock here
                  )
                }
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                Add to Cart
              </button>
            )}

            <button
              className="w-full mt-4 bg-[#502e0e] text-white py-3 rounded-lg"
              onClick={buyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
