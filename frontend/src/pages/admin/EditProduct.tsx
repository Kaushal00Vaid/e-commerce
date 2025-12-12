import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";

// Define the shape of the image object
interface ImageData {
  url: string;
  public_id: string;
}

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    setProduct(data);

    if (data.images && data.images.length > 0) {
      setCurrentImage(data.images[0]);
    }

    setLoading(false);
  };

  const handleImageUpload = async (e: any) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();

    formData.append("images", files[0]);

    // Show temporary loading state if you wanted, or just wait
    const res = await fetch(`${import.meta.env.VITE_API_URL}/uploads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (data.uploaded && data.uploaded.length > 0) {
      const newImage = data.uploaded[0];
      setCurrentImage(newImage);
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    const token = localStorage.getItem("adminToken");

    const updatedImages = currentImage ? [currentImage] : [];

    const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
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
      const err = await res.json();
      alert(`Update failed: ${err.message || "Unknown error"}`);
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
                  {currentImage ? (
                    <img
                      src={currentImage.url}
                      className="w-full h-full object-cover"
                      alt="Product"
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
