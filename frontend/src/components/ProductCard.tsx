import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!product.images || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }, 3000); // 3 seconds per image

    return () => clearInterval(interval);
  }, [product.images]);

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      <div className="w-full h-48 relative">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[currentImage].url}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <img
            src="https://via.placeholder.com/300"
            alt="placeholder"
            className="w-full h-full object-cover rounded"
          />
        )}
      </div>

      <div className="mt-4 flex-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <p className="mt-2 font-semibold text-green-600">₹{product.price}</p>
        <p className="mt-1 text-gray-500">Stock: {product.stock}</p>
      </div>

      <div className="mt-4 flex space-x-2">
        <button
          onClick={onEdit}
          className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded text-center"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-3 py-2 bg-red-500 text-white rounded text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
