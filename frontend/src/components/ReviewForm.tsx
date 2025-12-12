import { useState } from "react";
import axios from "axios";
import { Star, Send, AlertCircle, CheckCircle } from "lucide-react";

interface Props {
  productId: string;
  onReviewAdded: () => void;
}

export default function ReviewForm({ productId, onReviewAdded }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/reviews",
        { productId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Thank you! Your review has been published.");
      setRating(0);
      setComment("");
      // Refresh the list in parent
      if (onReviewAdded) onReviewAdded();
    } catch (err: any) {
      // Handle the specific backend restriction (403 or 400)
      setError(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#3D2459]/50 border border-[#D4AF37]/20 rounded-xl p-6 mb-8 shadow-lg">
      <h3 className="text-xl font-serif text-[#F3E5AB] mb-4">Write a Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div className="flex gap-1 items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className="focus:outline-none transition-transform hover:scale-110"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={24}
                className={`${
                  star <= (hover || rating)
                    ? "fill-[#D4AF37] text-[#D4AF37]"
                    : "text-[#CAB8D9]/40"
                } transition-colors`}
              />
            </button>
          ))}
          <span className="ml-3 text-sm text-[#D4AF37] font-medium">
            {rating > 0 ? `${rating} / 5 Stars` : "Select Rating"}
          </span>
        </div>

        {/* Comment Box */}
        <textarea
          className="w-full bg-[#2E1A47] border border-[#D4AF37]/30 rounded-lg p-3 text-[#F3E5AB] placeholder-[#CAB8D9]/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none resize-none h-28 scrollbar-thin scrollbar-thumb-[#D4AF37]/20"
          placeholder="Share your experience with this handcrafted piece..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        {/* Feedback Messages */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-3 rounded border border-green-400/20">
            <CheckCircle size={16} /> {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className="px-6 py-3 bg-[#D4AF37] text-[#2E1A47] font-bold rounded-lg hover:bg-[#C5A065] transition disabled:opacity-50 flex items-center gap-2 shadow-md"
        >
          {loading ? (
            "Submitting..."
          ) : (
            <>
              <Send size={16} /> Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}
