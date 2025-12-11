import { Request, Response } from "express";
import Order from "../models/Order.model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { items, totalAmount, paymentProof } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      paymentProof,
    });

    return res.json({ message: "Order created", order });
  } catch (err) {
    console.error("Order error:", err);
    return res.status(500).json({ message: "Order failed" });
  }
};
