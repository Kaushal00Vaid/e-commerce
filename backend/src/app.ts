import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import adminAuthRoutes from "./routes/adminAuth.routes";
import productRoutes from "./routes/product.routes";
import uploadRoutes from "./routes/upload.routes";
import orderRoutes from "./routes/order.routes";
import adminOrderRoutes from "./routes/adminOrder.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/uploads", uploadRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/admin/orders", adminOrderRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// --------- 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
