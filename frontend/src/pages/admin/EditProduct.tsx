import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    setProduct(data);
    setImageUrl(data.images?.[0] || "");
    setLoading(false);
  };

  const handleImageUpload = async (e: any) => {
    const files = e.target.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const res = await fetch("http://localhost:5000/api/uploads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: formData,
    });

    const data = await res.json();
    console.log("Uploaded URLs:", data.urls);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...product,
        images: [imageUrl],
      }),
    });

    if (res.ok) {
      alert("Product updated!");
      navigate("/admin/products");
    } else {
      alert("Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Edit Product</h1>

      {/* NAME */}
      <input
        type="text"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        className="w-full border p-2"
        placeholder="Name"
      />

      {/* DESCRIPTION */}
      <textarea
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
        className="w-full border p-2"
        placeholder="Description"
        rows={3}
      ></textarea>

      {/* PRICE */}
      <input
        type="number"
        value={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
        className="w-full border p-2"
        placeholder="Price"
      />

      {/* STOCK */}
      <input
        type="number"
        value={product.stock}
        onChange={(e) =>
          setProduct({ ...product, stock: Number(e.target.value) })
        }
        className="w-full border p-2"
        placeholder="Stock"
      />

      {/* CATEGORY */}
      <input
        type="text"
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
        className="w-full border p-2"
        placeholder="Category"
      />

      {/* TAGS */}
      <input
        type="text"
        value={product.tags}
        onChange={(e) =>
          setProduct({ ...product, tags: e.target.value.split(",") })
        }
        className="w-full border p-2"
        placeholder="tag1, tag2"
      />

      {/* IMAGE UPLOAD */}
      <div className="space-y-2">
        <p className="font-medium">Product Image</p>
        <img src={imageUrl} className="h-32 w-32 object-cover border" />
        <input
          type="file"
          onChange={handleImageUpload}
          multiple
          accept="image/*"
        />
      </div>

      {/* UPDATE BUTTON */}
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Update Product
      </button>
    </div>
  );
};

export default EditProduct;
