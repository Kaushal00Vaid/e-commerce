import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

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
    setImageUrl(data.images?.[0]?.url || ""); // Adjusted to handle object structure if needed
    setLoading(false);
  };

  const handleImageUpload = async (e: any) => {
    const files = e.target.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    // You might want to add a loading state for upload here
    const res = await fetch("http://localhost:5000/api/uploads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (data.uploaded && data.uploaded.length > 0) {
      setImageUrl(data.uploaded[0].url);
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    const token = localStorage.getItem("adminToken");

    // Construct image array correctly based on backend expectation
    const updatedImages = imageUrl ? [{ url: imageUrl }] : [];

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...product,
        images: updatedImages,
      }),
    });

    if (res.ok) {
      navigate("/admin/products");
    } else {
      alert("Update failed");
    }
    setSaving(false);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#2E1A47] flex items-center justify-center text-[#D4AF37] animate-pulse">
        Loading Product Data...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] p-6 pt-24 md:p-10">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center text-[#CAB8D9] hover:text-[#D4AF37] mb-6 transition"
        >
          <ChevronLeft size={20} /> Cancel Editing
        </button>

        <div className="bg-[#3D2459]/50 backdrop-blur-md border border-[#D4AF37]/20 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-serif font-bold text-[#F3E5AB] mb-8 border-b border-[#D4AF37]/20 pb-4">
            Edit Masterpiece
          </h1>

          <div className="space-y-6">
            {/* NAME */}
            <div>
              <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] focus:border-[#D4AF37] outline-none"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2">
                Description
              </label>
              <textarea
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 h-32 text-[#F3E5AB] focus:border-[#D4AF37] outline-none resize-none"
              ></textarea>
            </div>

            {/* PRICE & STOCK */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: Number(e.target.value) })
                  }
                  className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct({ ...product, stock: Number(e.target.value) })
                  }
                  className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>

            {/* CATEGORY & TAGS */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                  className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(product.tags)
                      ? product.tags.join(",")
                      : product.tags
                  }
                  onChange={(e) =>
                    setProduct({ ...product, tags: e.target.value.split(",") })
                  }
                  className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wide mb-4 flex items-center gap-2">
                <ImageIcon size={14} /> Update Imagery
              </label>
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-[#24123a] border border-[#D4AF37]/30 rounded-lg overflow-hidden flex-shrink-0">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#CAB8D9] text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                    className="block w-full text-sm text-[#CAB8D9]
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-[#D4AF37]/10 file:text-[#D4AF37]
                                hover:file:bg-[#D4AF37]/20
                                cursor-pointer"
                  />
                  <p className="text-xs text-[#CAB8D9]/50 mt-2">
                    Uploading a new image will replace the current primary
                    image.
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="w-full bg-[#D4AF37] text-[#2E1A47] p-4 rounded-xl text-lg font-bold hover:bg-[#C5A065] transition shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 mt-4"
            >
              {saving ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={20} />
              )}
              {saving ? "Saving Changes..." : "Save Updates"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
