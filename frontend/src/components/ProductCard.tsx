import React from "react";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
  onDelete?: (id: string) => void; // only admin passes this
}

export default function ProductCard({ product, onDelete }: Props) {
  const navigate = useNavigate();
  const isAdmin = Boolean(localStorage.getItem("adminToken"));

  const [index, setIndex] = React.useState(0);

  // Auto-slider only if more than 1 image
  React.useEffect(() => {
    if (!product.images || product.images.length < 2) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % product.images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [product.images]);

  const img = product.images?.[index]?.url;

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 border border-[#E8DCCB] hover:shadow-md transition">
      {/* IMAGE BLOCK */}
      <div className="aspect-square w-full bg-[#EFE6DA] rounded-lg overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#8B5E34]">
            No Image
          </div>
        )}
      </div>

      {/* PRODUCT NAME */}
      <h3 className="mt-4 font-semibold text-lg text-[#4A2E14]">
        {product.name}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>

      {/* PRICE + BUTTONS */}
      <div className="mt-3 flex justify-between items-center">
        <span className="font-semibold text-[#8B5E34] text-lg">
          ₹{product.price}
        </span>

        {/* CONDITIONAL BUTTON SET */}
        {isAdmin ? (
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/admin/products/edit/${product._id}`)}
              className="px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete?.(product._id)}
              className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className="px-4 py-2 rounded-lg border border-[#8B5E34] text-[#8B5E34] hover:bg-[#8B5E34] hover:text-white transition"
          >
            View
          </button>
        )}
      </div>

      {/* STOCK */}
      <p className="text-sm text-gray-600 mt-2">
        {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
      </p>
    </div>
  );
}
