import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7EFE5] text-[#2F2F2F]">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-serif font-bold text-[#8B5E34] leading-tight">
          Handcrafted Goods
          <br />
          Made With Timeless Skill
        </h1>

        <p className="mt-6 text-lg text-[#5C4A3F] max-w-xl">
          Discover authentic handmade crafts created by passionate artisans.
          Every product tells a story — made slowly, thoughtfully, and
          sustainably.
        </p>
        <br />
        <br />
        <br />
        <hr />
      </section>

      {/* Products */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold mb-6">All Products</h2>

        {products.length === 0 && (
          <p className="text-gray-600">No products added yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((p: Product) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-[#5C4A3F]">
        © {new Date().getFullYear()} HandiCraft — Handmade with Love ❤️
      </footer>
    </div>
  );
}
