import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import logoImg from "../assets/logo.png";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  return (
    // BACKGROUND: Back to the elegant Radial Gradient
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#563866] via-[#402650] to-[#2D1B38] text-[#F3E5AB]">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-16 flex flex-col items-center text-center px-4">
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-1 animate-fade-in-up">
          {/* LOGO */}
          <div className="w-40 h-40 md:w-64 md:h-64 shrink-0">
            <img
              src={logoImg}
              alt="Hind Cultural Crafts Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(198,159,84,0.4)]"
            />
          </div>

          {/* TEXT */}
          <div className="text-left flex flex-col items-center md:items-start">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl tracking-widest leading-tight bg-gradient-to-r from-[#aa8746] via-[#F8E6B8] to-[#aa8746] bg-clip-text text-transparent drop-shadow-sm">
              HIND CULTURAL CR<span className="text-[#dac695]">A</span>FTS
            </h1>
            <p className="font-montserrat text-[#C69F54] font-medium text-xs md:text-sm tracking-[0.4em] mt-4 uppercase opacity-90 ml-1">
              The Culture We Care..
            </p>
          </div>
        </div>

        {/* Decorative Diamond Shapes */}
        <div className="hidden md:block absolute left-20 top-1/2 -translate-y-1/2 opacity-40">
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-[#C69F54] to-transparent mx-auto"></div>
          <div className="w-3 h-3 border border-[#C69F54] rotate-45 mx-auto my-2"></div>
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-[#C69F54] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20 pt-12">
        <div className="flex flex-col items-center mb-10">
          <span className="text-[#C69F54] text-xs font-bold tracking-[0.3em] uppercase mb-2">
            Exquisite Selections
          </span>
          <h2 className="text-4xl font-cinzel text-[#F8E6B8]">
            Our Collection
          </h2>
          <div className="w-24 h-[1px] bg-[#C69F54] mt-6 opacity-60"></div>
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[#C69F54]/30 rounded-xl bg-[#352145]/50">
            <p className="text-[#C69F54] text-xl italic font-serif">
              "Art takes time..."
            </p>
            <p className="text-sm text-[#F8E6B8]/60 mt-2 uppercase tracking-widest">
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
      <footer className="border-t border-[#C69F54]/20 py-12 text-center bg-[#281832]">
        <p className="text-[#C69F54]/70 font-light tracking-widest text-xs uppercase">
          © {new Date().getFullYear()} Hind Cultural Crafts
        </p>
      </footer>
    </div>
  );
}
