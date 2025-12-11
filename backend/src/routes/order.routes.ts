import { Router } from "express";
import userAuth from "../middlewares/auth.middleware";
import { createOrder } from "../controllers/order.controller";

const router = Router();

router.post("/", userAuth, createOrder);

export default router;
