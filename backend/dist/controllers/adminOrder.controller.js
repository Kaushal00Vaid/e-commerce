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
exports.updateOrderStatus = exports.getAllOrders = void 0;
const Order_model_1 = __importDefault(require("../models/Order.model"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_model_1.default.find()
            .populate("user", "name email")
            .populate("items.product", "name price images")
            .sort({ createdAt: -1 });
        res.json({ orders });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
});
exports.getAllOrders = getAllOrders;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const valid = ["pending", "paid", "shipped", "delivered", "cancelled"];
        if (!valid.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        const order = yield Order_model_1.default.findById(orderId);
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        if (status === "cancelled" && order.status !== "cancelled") {
            for (const item of order.items) {
                const product = yield Product_model_1.default.findById(item.product);
                if (product) {
                    product.stock += item.quantity;
                    yield product.save();
                }
            }
        }
        order.status = status;
        yield order.save();
        res.json({ message: "Status updated", order });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update status" });
    }
});
exports.updateOrderStatus = updateOrderStatus;
