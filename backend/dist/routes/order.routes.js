"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const order_controller_1 = require("../controllers/order.controller");
const adminAuth_middleware_1 = __importDefault(require("../middlewares/adminAuth.middleware"));
const router = (0, express_1.Router)();
router.post("/create", auth_middleware_1.default, order_controller_1.createOrder);
router.get("/my-orders", auth_middleware_1.default, order_controller_1.getMyOrders);
router.get("/", adminAuth_middleware_1.default, order_controller_1.getAllOrders);
router.patch("/:id/status", adminAuth_middleware_1.default, order_controller_1.updateOrderStatus);
exports.default = router;
