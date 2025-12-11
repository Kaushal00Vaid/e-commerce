import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Upload images
export const uploadFilesToServer = async (files: File[]) => {
  const form = new FormData();
  files.forEach((f) => form.append("images", f)); // field name 'images' matches backend

  const token = localStorage.getItem("adminToken"); // admin auth token
  const res = await axios.post("http://localhost:5000/api/uploads", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  // res.data.uploaded = [{ url, public_id }, ...]
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
  const [images, setImages] = useState<string[]>([""]);

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

  // Add more image input fields
  const addImageField = () => {
    setImages([...images, ""]);
  };

  // Update individual image input
  const updateImage = (index: number, value: string) => {
    const copy = [...images];
    copy[index] = value;
    setImages(copy);
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
      const res = await axios.post("http://localhost:5000/api/uploads", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

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
    // validations...
    const token = localStorage.getItem("adminToken");
    await axios.post(
      "http://localhost:5000/api/products",
      {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
        tags: tags.split(",").map((t) => t.trim()),
        images: imageUrls, // use the uploaded URLs
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate("/admin/products");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-3xl mb-6 font-semibold text-center">
        Add New Product
      </h1>

      <form onSubmit={handleSubmitProduct} className="space-y-4">
        <div>
          <label className="font-semibold">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full border p-2 rounded h-28"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Price (₹)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Stock</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Category</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Tags (comma separated)</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="handmade, wooden, gift"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div>
          <label>Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onFilesSelected}
          />
          <button type="button" onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
        </div>

        {/* show preview */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {imageUrls.map((img) => (
            <img
              key={img.public_id} // use public_id as unique key
              src={img.url}
              alt="preview"
              className="w-full h-32 object-cover"
            />
          ))}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="bg-green-600 w-full text-white p-3 rounded mt-4 text-lg"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
