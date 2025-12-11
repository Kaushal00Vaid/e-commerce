import { Router } from "express";
import userAuth from "../middlewares/auth.middleware";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller";
import adminAuth from "../middlewares/adminAuth.middleware";

const router = Router();

router.post("/create", userAuth, createOrder);
router.get("/my-orders", userAuth, getMyOrders);

router.get("/", adminAuth, getAllOrders);
router.patch("/:id/status", adminAuth, updateOrderStatus);

export default router;
