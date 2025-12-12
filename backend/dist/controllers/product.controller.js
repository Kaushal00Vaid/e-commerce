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
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAdminProducts = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const getAdminProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const count = yield Product_model_1.default.countDocuments();
        const products = yield Product_model_1.default.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalProducts: count,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAdminProducts = getAdminProducts;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_model_1.default.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getSingleProduct = getSingleProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, stock, category, tags, images } = req.body;
        const updated = yield Product_model_1.default.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            stock,
            category,
            tags,
            images,
        }, { new: true });
        if (!updated)
            return res.status(404).json({ message: "Product not found" });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield Product_model_1.default.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Delete images from Cloudinary
        if (product.images && product.images.length > 0) {
            for (const img of product.images) {
                if (img.public_id) {
                    try {
                        yield cloudinary_1.default.uploader.destroy(img.public_id);
                    }
                    catch (err) {
                        console.error("Cloudinary delete error:", err);
                    }
                }
            }
        }
        yield Product_model_1.default.findByIdAndDelete(id);
        return res.json({ message: "Product deleted successfully" });
    }
    catch (err) {
        console.error("Delete product error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.deleteProduct = deleteProduct;
