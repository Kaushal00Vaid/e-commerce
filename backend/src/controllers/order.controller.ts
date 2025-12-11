import { Request, Response } from "express";
import Order from "../models/Order.model";
import Product from "../models/Product.model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { items, totalAmount, paymentProof } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    for (const item of items) {
      const prod = await Product.findById(item.product);
      if (!prod) return res.status(404).json({ message: "Product not found" });

      if (item.quantity > prod.stock) {
        return res.status(400).json({
          message: `Not enough stock for ${prod.name}`,
        });
      }
    }

    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      paymentProof,
      status: "pending",
    });

    return res.json(order);
  } catch (err) {
    console.error("Order error:", err);
    return res.status(500).json({ message: "Order failed" });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user!.id }).populate(
      "items.product"
    );

    return res.json(orders);
  } catch (err) {
    console.error("Get My Orders error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");
    return res.json(orders);
  } catch (err) {
    console.error("Get All Orders error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const valid = ["pending", "paid", "shipped", "delivered", "cancelled"];
    if (!valid.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    console.error("Update Order Status error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
