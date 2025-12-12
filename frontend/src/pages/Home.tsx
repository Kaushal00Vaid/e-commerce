import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { Sparkles, ArrowDown } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  return (
    // UPDATED: Added a rich gradient background for depth
    <div className="min-h-screen bg-gradient-to-b from-[#2E1A47] via-[#24123a] to-[#1a0b2e] text-[#F3E5AB]">
      {/* Hero Section */}
      <section className="relative w-full py-32 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Background Glow Effect (UI Decoration) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

        <div className="relative z-10 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-8 h-8 text-[#D4AF37] opacity-90" />
          </div>

          <h1 className="text-5xl md:text-8xl font-serif font-bold text-[#D4AF37] tracking-tight drop-shadow-2xl">
            Hind Cultural Crafts
          </h1>

          <p className="text-2xl md:text-4xl font-light italic text-[#F3E5AB] mt-4 tracking-wide opacity-90">
            The Culture We Care
          </p>

          <p className="mt-8 text-lg text-[#CAB8D9] max-w-2xl mx-auto leading-relaxed font-light">
            Discover the elegance of authentic Indian artistry. Every piece is a
            testament to timeless skill, crafted slowly and soulfully for the
            modern home.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce opacity-50">
          <ArrowDown className="text-[#D4AF37] w-6 h-6" />
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase mb-2">
            Selected Works
          </span>
          <h2 className="text-4xl font-serif text-[#F3E5AB]">Our Collection</h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mt-6"></div>
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[#D4AF37]/30 rounded-xl bg-[#2E1A47]/50">
            <p className="text-[#CAB8D9] text-xl italic font-serif">
              "Art takes time..."
            </p>
            <p className="text-sm text-[#D4AF37] mt-2 uppercase tracking-widest">
              No products yet
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p: Product) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D4AF37]/20 py-12 text-center bg-[#1a0b2e]">
        <p className="text-[#CAB8D9] font-light tracking-wide text-sm">
          © {new Date().getFullYear()} Hind Cultural Crafts —{" "}
          <span className="text-[#D4AF37] italic">
            Handmade with Love & Heritage
          </span>
        </p>
      </footer>
    </div>
  );
}
