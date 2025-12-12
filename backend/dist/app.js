"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const adminAuth_routes_1 = __importDefault(require("./routes/adminAuth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const adminOrder_routes_1 = __importDefault(require("./routes/adminOrder.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/admin/auth", adminAuth_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use("/api/uploads", upload_routes_1.default);
app.use("/api/reviews", review_routes_1.default);
app.use("/api/contacts", contact_routes_1.default);
app.use("/api/orders", order_routes_1.default);
app.use("/api/admin/orders", adminOrder_routes_1.default);
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});
// --------- 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
exports.default = app;
