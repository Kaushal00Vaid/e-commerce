import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import ProductCard from "../../components/ProductCard";
import {
  LayoutDashboard,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProducts(page);
  }, [token, page]);

  const fetchProducts = async (page: number) => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/products/admin?page=${page}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setProducts(data.products);
    setTotalPages(data.totalPages);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete");
        return;
      }

      // Remove deleted product from UI
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] p-6 pt-24 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-[#D4AF37]/20 pb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#3D2459] rounded-xl border border-[#D4AF37]/30 shadow-lg shadow-[#D4AF37]/5">
              <LayoutDashboard className="text-[#D4AF37]" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#F3E5AB]">
                Inventory
              </h1>
              <p className="text-[#CAB8D9] text-sm">
                Manage your collection and stock
              </p>
            </div>
          </div>

          <Link
            to="/admin/products/new"
            className="group bg-[#D4AF37] text-[#2E1A47] px-6 py-3 rounded-lg font-bold shadow-lg shadow-[#D4AF37]/20 hover:bg-[#C5A065] transition flex items-center gap-2"
          >
            <Plus
              size={20}
              className="group-hover:rotate-90 transition duration-300"
            />
            Add New Product
          </Link>
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#3D2459]/30 rounded-2xl border border-dashed border-[#D4AF37]/30">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
              <Search className="text-[#D4AF37]" size={24} />
            </div>
            <p className="text-[#F3E5AB] font-serif text-xl">
              No products found.
            </p>
            <p className="text-[#CAB8D9] text-sm mt-2">
              Start by adding your first masterpiece.
            </p>
          </div>
        ) : (
          /* PRODUCT GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onEdit={() => navigate(`/admin/products/edit/${p._id}`)}
                onDelete={() => handleDelete(p._id)}
              />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center items-center mt-12 space-x-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#D4AF37]/40 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2E1A47] transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#D4AF37]"
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <span className="px-4 py-2 text-[#CAB8D9] font-mono text-sm tracking-widest border border-[#D4AF37]/10 bg-[#3D2459] rounded-md">
            PAGE <span className="text-[#F3E5AB] font-bold">{page}</span> /{" "}
            {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#D4AF37]/40 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2E1A47] transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#D4AF37]"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
