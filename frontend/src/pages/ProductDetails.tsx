import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImg, setSelectedImg] = useState<string>("");
  const [refreshReviews, setRefreshReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("token");

  const { cart, add, increment, decrement, buyNow } = useCart();
  const navigate = useNavigate();

  const cartItem = product
    ? cart.find((c) => c.productId === product._id)
    : null;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    if (!userToken) {
      alert("Please login first!");
      return;
    }
    buyNow(product);
    navigate("/checkout");
  };

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();

      // Backend returns product directly, not { product: ... }
      setProduct(data);
      setSelectedImg(data?.images?.[0]?.url || "");
    } catch (err) {
      console.error("Error loading product:", err);
    }
    setLoading(false);
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-[#2E1A47] flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl font-serif animate-pulse">
          Loading Artistry...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] pt-24 px-6 md:px-12 pb-20">
      {/* Breadcrumb / Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#CAB8D9] hover:text-[#D4AF37] mb-8 transition"
      >
        <ChevronLeft size={20} className="mr-1" /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        {/* LEFT: MAIN IMAGE + THUMBNAILS */}
        <div className="flex flex-col gap-6">
          <div className="aspect-square w-full bg-[#3D2459] rounded-xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl relative group">
            <img
              src={selectedImg}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#D4AF37]/30">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                onClick={() => setSelectedImg(img.url)}
                className={`h-24 w-24 rounded-lg object-cover cursor-pointer border-2 transition-all duration-300 transform hover:scale-105
                ${
                  selectedImg === img.url
                    ? "border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col justify-center">
          <span className="text-[#D4AF37] text-sm tracking-[0.2em] uppercase font-bold mb-2">
            {product.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F3E5AB] leading-tight">
            {product.name}
          </h1>

          <p className="mt-6 text-[#CAB8D9] leading-relaxed text-lg font-light border-l-2 border-[#D4AF37]/30 pl-6">
            {product.description}
          </p>

          <div className="mt-8 flex items-end gap-4">
            <p className="text-4xl font-serif font-semibold text-[#D4AF37]">
              ₹{product.price}
            </p>
            <span className="text-[#CAB8D9] mb-1.5 text-sm">
              (Inclusive of all taxes)
            </span>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm font-medium">
            <span className="text-[#CAB8D9]">Availability:</span>
            {product.stock > 0 ? (
              <span className="text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                Out of Stock
              </span>
            )}
          </div>

          {product.tags?.length > 0 && (
            <p className="mt-4 text-sm text-[#CAB8D9]/60 italic">
              Tags: {product.tags.join(", ")}
            </p>
          )}

          <div className="h-[1px] w-full bg-[#D4AF37]/20 my-10"></div>

          {/* BUTTONS */}
          <div className="">
            {cartItem ? (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Quantity Control */}
                <div className="flex items-center border border-[#D4AF37] rounded-lg p-1">
                  <button
                    onClick={() => decrement(product._id)}
                    className="w-12 h-10 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition rounded"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center text-xl font-semibold text-[#F3E5AB]">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => increment(product._id, product.stock)}
                    className="w-12 h-10 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition rounded"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Clear Cart (Logic Preserved) */}
                <button
                  onClick={() => {
                    localStorage.removeItem("cartItems");
                    window.location.reload();
                  }}
                  className="px-6 py-3 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition"
                >
                  <Trash2 size={18} /> Clear Cart
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  add(
                    {
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.images?.[0]?.url || "",
                      quantity: 1,
                    },
                    product.stock // pass stock here
                  )
                }
                className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-[#2E1A47] font-bold text-lg rounded-xl hover:bg-[#C5A065] transition shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-3"
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
            )}

            <button
              disabled={product.stock === 0}
              className={`w-full mt-4 py-4 rounded-xl text-lg font-bold border transition duration-300 ${
                product.stock === 0
                  ? "bg-gray-600/20 text-gray-500 border-transparent cursor-not-allowed"
                  : "bg-transparent border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2E1A47]"
              }`}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* REVIEW */}
      <div className="h-[1px] w-full bg-[#D4AF37]/20 my-16"></div>

      {/* REVIEWS SECTION */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-[#D4AF37] mb-8 text-center flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-[#D4AF37]/50"></span>
          Artisan Reviews
          <span className="h-[1px] w-12 bg-[#D4AF37]/50"></span>
        </h2>

        {/* Show Form only if user is logged in */}
        {userToken ? (
          <ReviewForm
            productId={id || ""}
            onReviewAdded={() => setRefreshReviews((prev) => prev + 1)}
          />
        ) : (
          <div className="bg-[#3D2459]/30 p-6 rounded-xl text-center mb-8 border border-[#D4AF37]/10">
            <p className="text-[#CAB8D9]">
              Please{" "}
              <button
                className="text-[#D4AF37] font-bold hover:underline"
                onClick={() => navigate("/login")}
              >
                login
              </button>{" "}
              to leave a review.
            </p>
          </div>
        )}

        {/* Reviews List */}
        <ReviewList productId={id || ""} refreshTrigger={refreshReviews} />
      </div>
    </div>
  );
};

export default ProductDetails;
