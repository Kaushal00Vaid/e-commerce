"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const review_controller_1 = require("../controllers/review.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.default, review_controller_1.addReview);
router.get("/:productId", review_controller_1.getProductReviews);
exports.default = router;
