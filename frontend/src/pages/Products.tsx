import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { Loader2, Sparkles } from "lucide-react";

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
    return (
      <div className="min-h-screen bg-[#2E1A47] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#D4AF37] animate-spin mb-4" />
        <p className="text-[#D4AF37] font-serif text-xl tracking-widest animate-pulse">
          Curating Collection...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] pt-28 pb-20 px-4 md:px-10">
      {/* Header Section */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#D4AF37] blur-[80px] opacity-20 pointer-events-none"></div>

        <div className="flex justify-center mb-3">
          <Sparkles className="text-[#D4AF37] w-6 h-6 opacity-70" />
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#D4AF37] tracking-wide drop-shadow-sm">
          Our Collection
        </h1>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6"></div>

        <p className="mt-4 text-[#CAB8D9] font-light max-w-xl mx-auto text-lg leading-relaxed">
          Explore our handpicked selection of timeless treasures,{" "}
          <br className="hidden md:block" /> crafted with passion and heritage.
        </p>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-70">
          <div className="w-16 h-16 border border-[#D4AF37]/30 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🥀</span>
          </div>
          <p className="text-[#F3E5AB] font-serif text-xl">
            The gallery is currently empty.
          </p>
          <p className="text-[#CAB8D9] text-sm mt-2">
            Please check back soon for new arrivals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
