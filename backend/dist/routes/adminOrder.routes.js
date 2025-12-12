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
const adminOrder_controller_1 = require("../controllers/adminOrder.controller");
const Order_model_1 = __importDefault(require("../models/Order.model"));
const router = (0, express_1.Router)();
router.get("/", adminAuth_middleware_1.default, adminOrder_controller_1.getAllOrders);
router.put("/:orderId/status", adminAuth_middleware_1.default, adminOrder_controller_1.updateOrderStatus);
router.get("/:id", adminAuth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_model_1.default.findById(req.params.id)
        .populate("user", "name email")
        .populate("items.product", "name images price description stock");
    if (!order)
        return res.status(404).json({ message: "Order not found" });
    res.json({ order });
}));
exports.default = router;
