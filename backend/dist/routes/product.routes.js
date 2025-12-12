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
const express_1 = require("express");
const adminAuth_middleware_1 = __importDefault(require("../middlewares/adminAuth.middleware"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_model_1.default.find();
    res.status(200).json(products);
}));
// admin only routes
router.get("/admin", adminAuth_middleware_1.default, product_controller_1.getAdminProducts);
router.post("/", adminAuth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, images, stock, category, tags } = req.body;
        if (!name || !description || !price || !stock || !category || !tags) {
            return res.status(400).json({ message: "Missing required Fields." });
        }
        const product = yield Product_model_1.default.create({
            name,
            description,
            price,
            stock,
            category,
            tags,
            images: images || [],
        });
        return res.status(201).json(product);
    }
    catch (e) {
        console.error("Error while adding Product:", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.get("/:id", product_controller_1.getSingleProduct);
router.put("/:id", adminAuth_middleware_1.default, product_controller_1.updateProduct);
router.delete("/:id", adminAuth_middleware_1.default, product_controller_1.deleteProduct);
exports.default = router;
