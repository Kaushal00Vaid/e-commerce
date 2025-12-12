import { Router } from "express";
import adminAuth from "../middlewares/adminAuth.middleware";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminOrder.controller";
import OrderModel from "../models/Order.model";

const router = Router();

router.get("/", adminAuth, getAllOrders);

router.put("/:orderId/status", adminAuth, updateOrderStatus);

router.get("/:id", adminAuth, async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
    .populate("user", "name email")
    .populate("items.product", "name images price description stock");

  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json({ order });
});

export default router;
