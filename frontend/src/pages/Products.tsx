import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      // Backend returns array directly
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-20 text-lg">Loading...</div>;
  }

  return (
    <div className="px-4 md:px-10 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
