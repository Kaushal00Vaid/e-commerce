"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductReviews = exports.addReview = void 0;
const Review_model_1 = __importDefault(require("../models/Review.model"));
const Order_model_1 = __importDefault(require("../models/Order.model"));
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { productId, rating, comment } = req.body;
        // Check if user has delivered order with this product
        const deliveredOrder = yield Order_model_1.default.findOne({
            user: userId,
            status: "delivered",
            "items.product": productId,
        });
        if (!deliveredOrder) {
            return res
                .status(403)
                .json({ message: "You can only review purchased & delivered items" });
        }
        const existing = yield Review_model_1.default.findOne({ user: userId, product: productId });
        if (existing)
            return res.status(400).json({ message: "Already reviewed" });
        const review = yield Review_model_1.default.create({
            user: userId,
            product: productId,
            rating,
            comment,
        });
        res.json({ message: "Review added", review });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to add review" });
    }
});
exports.addReview = addReview;
const getProductReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Review_model_1.default.find({
            product: req.params.productId,
        })
            .populate("user", "name")
            .sort({ createdAt: -1 });
        res.json({ reviews });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
});
exports.getProductReviews = getProductReviews;
