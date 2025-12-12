import { Router } from "express";
import userAuth from "../middlewares/auth.middleware";
import { addReview, getProductReviews } from "../controllers/review.controller";

const router = Router();

router.post("/", userAuth, addReview);
router.get("/:productId", getProductReviews);

export default router;
