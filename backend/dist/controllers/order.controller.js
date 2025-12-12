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
exports.updateOrderStatus = exports.getAllOrders = exports.getMyOrders = exports.createOrder = void 0;
const Order_model_1 = __importDefault(require("../models/Order.model"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { items, totalAmount, paymentProof } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }
        for (const item of items) {
            const prod = yield Product_model_1.default.findById(item.product);
            if (!prod)
                return res.status(404).json({ message: "Product not found" });
            if (item.quantity > prod.stock) {
                return res.status(400).json({
                    message: `Not enough stock for ${prod.name}`,
                });
            }
            prod.stock -= item.quantity;
            yield prod.save();
        }
        const order = yield Order_model_1.default.create({
            user: userId,
            items,
            totalAmount,
            paymentProof,
            status: "pending",
        });
        return res.json(order);
    }
    catch (err) {
        console.error("Order error:", err);
        return res.status(500).json({ message: "Order failed" });
    }
});
exports.createOrder = createOrder;
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_model_1.default.find({ user: req.user.id }).populate("items.product", "name images price");
        return res.json(orders);
    }
    catch (err) {
        console.error("Get My Orders error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getMyOrders = getMyOrders;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_model_1.default.find()
            .populate("user", "name email")
            .populate("items.product", "name images price");
        return res.json(orders);
    }
    catch (err) {
        console.error("Get All Orders error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllOrders = getAllOrders;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const valid = ["pending", "paid", "shipped", "delivered", "cancelled"];
        if (!valid.includes(status))
            return res.status(400).json({ message: "Invalid status" });
        const order = yield Order_model_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(order);
    }
    catch (err) {
        console.error("Update Order Status error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateOrderStatus = updateOrderStatus;
