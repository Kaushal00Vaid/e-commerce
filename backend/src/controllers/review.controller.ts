import { Request, Response } from "express";
import Review from "../models/Review.model";
import Order from "../models/Order.model";

export const addReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { productId, rating, comment } = req.body;

    // Check if user has delivered order with this product
    const deliveredOrder = await Order.findOne({
      user: userId,
      status: "delivered",
      "items.product": productId,
    });

    if (!deliveredOrder) {
      return res
        .status(403)
        .json({ message: "You can only review purchased & delivered items" });
    }

    const existing = await Review.findOne({ user: userId, product: productId });
    if (existing) return res.status(400).json({ message: "Already reviewed" });

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    res.json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ message: "Failed to add review" });
  }
};

export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
