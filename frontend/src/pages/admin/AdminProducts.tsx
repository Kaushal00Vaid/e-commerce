import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import ProductCard from "../../components/ProductCard";

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
      `http://localhost:5000/api/products/admin?page=${page}&limit=10`,
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
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Product
        </Link>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onEdit={() => navigate(`/admin/products/edit/${p._id}`)}
            onDelete={() => handleDelete(p._id)}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminProducts;
