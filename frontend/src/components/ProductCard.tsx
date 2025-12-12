import React from "react";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
  onDelete?: (id: string) => void;
}

export default function ProductCard({ product, onDelete }: Props) {
  const navigate = useNavigate();
  const isAdmin = Boolean(localStorage.getItem("adminToken"));

  const [index, setIndex] = React.useState(0);

  // Auto-slider
  React.useEffect(() => {
    if (!product.images || product.images.length < 2) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % product.images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [product.images]);

  const img = product.images?.[index]?.url;

  return (
    // Card Background: Lighter Purple, Border: Subtle Gold
    <div className="bg-[#3D2459] shadow-lg rounded-xl p-4 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-xl transition duration-300 flex flex-col h-full">
      {/* IMAGE BLOCK */}
      <div className="aspect-square w-full bg-[#2E1A47] rounded-lg overflow-hidden relative">
        {img ? (
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#CAB8D9] italic">
            No Image
          </div>
        )}
      </div>

      {/* PRODUCT NAME */}
      <h3 className="mt-4 font-serif font-semibold text-xl text-[#D4AF37] tracking-wide">
        {product.name}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-[#CAB8D9] line-clamp-2 mt-2">
        {product.description}
      </p>

      {/* PRICE + BUTTONS */}
      <div className="mt-auto pt-4 flex justify-between items-center">
        <span className="font-bold text-[#F3E5AB] text-lg">
          ₹{product.price}
        </span>

        {/* CONDITIONAL BUTTON SET */}
        {isAdmin ? (
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/admin/products/edit/${product._id}`)}
              className="px-3 py-1.5 bg-[#D4AF37] text-[#2E1A47] rounded-lg text-sm font-semibold hover:bg-[#C5A065] transition"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete?.(product._id)}
              className="px-3 py-1.5 border border-red-400 text-red-400 rounded-lg text-sm hover:bg-red-400 hover:text-[#2E1A47] transition"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className="px-4 py-2 rounded-lg border border-[#D4AF37] text-[#D4AF37] text-sm font-medium hover:bg-[#D4AF37] hover:text-[#2E1A47] transition duration-300"
          >
            View
          </button>
        )}
      </div>

      {/* STOCK */}
      <p className="text-xs text-[#CAB8D9]/70 mt-2 text-right">
        {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
      </p>
    </div>
  );
}
