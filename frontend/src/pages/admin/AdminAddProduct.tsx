import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Save,
  Image as ImageIcon,
  ChevronLeft,
  DollarSign,
  Package,
  Tag,
  Layers,
  FileText,
  Loader2,
  CloudUpload,
} from "lucide-react";

// Upload images logic remains the same
export const uploadFilesToServer = async (files: File[]) => {
  const form = new FormData();
  files.forEach((f) => form.append("images", f));

  const token = localStorage.getItem("adminToken");
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/uploads`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.uploaded.map((u: any) => u.url);
};

export default function AdminAddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [stock, setStock] = useState<number | string>("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<string[]>([""]); // Keeping original state structure

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<
    { url: string; public_id: string }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Select files first");
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      selectedFiles.forEach((f) => form.append("images", f));
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploads`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const uploadedImages = res.data.uploaded;
      setImageUrls(uploadedImages);
      alert("Upload successful");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // validations...
    const token = localStorage.getItem("adminToken");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          category,
          tags: tags.split(",").map((t) => t.trim()),
          images: imageUrls,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] p-6 pt-24 md:p-10">
      {/* Header with Back Button */}
      <div className="max-w-4xl mx-auto mb-8">
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center text-[#CAB8D9] hover:text-[#D4AF37] mb-4 transition"
        >
          <ChevronLeft size={20} /> Back to Inventory
        </button>
        <h1 className="text-3xl font-serif font-bold text-[#F3E5AB]">
          Curate New Masterpiece
        </h1>
        <p className="text-[#CAB8D9] text-sm mt-1">
          Add a new item to the collection
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-[#3D2459]/50 backdrop-blur-md rounded-2xl border border-[#D4AF37]/20 shadow-xl overflow-hidden">
        {/* Top Decorative Line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#2E1A47] via-[#D4AF37] to-[#2E1A47]"></div>

        <form onSubmit={handleSubmitProduct} className="p-8 space-y-8">
          {/* 1. Basic Info Section */}
          <div className="space-y-6">
            <h3 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest flex items-center gap-2 border-b border-[#D4AF37]/10 pb-2">
              <FileText size={16} /> Basic Information
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2">
                Product Name
              </label>
              <input
                type="text"
                className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition placeholder-[#CAB8D9]/20"
                placeholder="Ex: Royal Rajasthani Vase"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2">
                Description
              </label>
              <textarea
                className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 h-32 text-[#F3E5AB] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition placeholder-[#CAB8D9]/20 resize-none scrollbar-thin scrollbar-thumb-[#D4AF37]/20"
                placeholder="Tell the story of this product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          {/* 2. Pricing & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2 flex items-center gap-1">
                <DollarSign size={12} /> Price (₹)
              </label>
              <input
                type="number"
                className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] focus:border-[#D4AF37] outline-none transition"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2 flex items-center gap-1">
                <Package size={12} /> Stock Quantity
              </label>
              <input
                type="number"
                className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] focus:border-[#D4AF37] outline-none transition"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 3. Categorization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2 flex items-center gap-1">
                <Layers size={12} /> Category
              </label>
              <input
                type="text"
                className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] focus:border-[#D4AF37] outline-none transition"
                placeholder="Ex: Pottery"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#CAB8D9] uppercase tracking-wide mb-2 flex items-center gap-1">
                <Tag size={12} /> Tags
              </label>
              <input
                type="text"
                className="w-full bg-[#24123a] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] focus:border-[#D4AF37] outline-none transition"
                placeholder="handmade, clay, vintage"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          {/* 4. Media Upload */}
          <div className="space-y-4">
            <h3 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest flex items-center gap-2 border-b border-[#D4AF37]/10 pb-2 pt-4">
              <ImageIcon size={16} /> Gallery (Max 3 Images)
            </h3>

            <div className="bg-[#24123a] border-2 border-dashed border-[#D4AF37]/30 rounded-xl p-6 text-center transition hover:border-[#D4AF37]/60">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={onFilesSelected}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <CloudUpload className="text-[#D4AF37] w-10 h-10 mb-2 opacity-80" />
                <span className="text-[#F3E5AB] font-medium">
                  Click to select images
                </span>
                <span className="text-[#CAB8D9] text-xs mt-1">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} files selected`
                    : "Supports: JPG, PNG, WEBP"}
                </span>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading || selectedFiles.length === 0}
                className="px-5 py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/40 rounded-lg hover:bg-[#D4AF37] hover:text-[#2E1A47] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {uploading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {uploading ? "Uploading to Cloud..." : "Upload Selected Files"}
              </button>
            </div>

            {/* Previews */}
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imageUrls.map((img) => (
                  <div
                    key={img.public_id}
                    className="relative aspect-square rounded-lg overflow-hidden border border-[#D4AF37]/30 group"
                  >
                    <img
                      src={img.url}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        Uploaded
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Actions */}
          <div className="pt-6">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#D4AF37] text-[#2E1A47] p-4 rounded-xl text-lg font-bold hover:bg-[#C5A065] transition shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Publishing...
                </>
              ) : (
                <>
                  <Save size={20} /> Publish Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
