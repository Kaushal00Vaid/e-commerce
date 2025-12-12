import { useEffect, useState } from "react";
import axios from "axios";
import type { Review } from "../types/Review";
import { Star, User, Quote } from "lucide-react";

interface Props {
  productId: string;
  refreshTrigger: number; // Used to re-fetch when a new review is added
}

export default function ReviewList({ productId, refreshTrigger }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews/${productId}`
        );
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId, refreshTrigger]);

  if (loading)
    return (
      <div className="text-[#CAB8D9] animate-pulse">Loading reviews...</div>
    );

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-[#D4AF37]/30 rounded-xl bg-[#3D2459]/30">
        <p className="text-[#F3E5AB] font-serif text-lg">No reviews yet.</p>
        <p className="text-[#CAB8D9] text-sm mt-1">
          Be the first to review this masterpiece!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((r) => (
        <div
          key={r._id}
          className="bg-[#3D2459] border border-[#D4AF37]/10 rounded-xl p-6 shadow-md relative"
        >
          {/* Decorative Quote Icon */}
          <Quote
            className="absolute top-4 right-4 text-[#D4AF37]/10"
            size={40}
          />

          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2E1A47] rounded-full flex items-center justify-center border border-[#D4AF37]/20 text-[#D4AF37]">
                <User size={20} />
              </div>
              <div>
                <p className="text-[#F3E5AB] font-bold text-sm">
                  {r.user?.name || "Art Enthusiast"}
                </p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < r.rating
                          ? "fill-[#D4AF37] text-[#D4AF37]"
                          : "text-[#2E1A47]"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-[#CAB8D9] text-xs font-mono opacity-60">
              {new Date(r.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-[#CAB8D9] text-sm leading-relaxed border-l-2 border-[#D4AF37]/20 pl-4">
            "{r.comment}"
          </p>
        </div>
      ))}
    </div>
  );
}
