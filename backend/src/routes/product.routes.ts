import { Router } from "express";
import adminAuth from "../middlewares/adminAuth.middleware";
import ProductModel from "../models/Product.model";
import {
  getAdminProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
});

// admin only routes
router.get("/admin", adminAuth, getAdminProducts);

router.post("/", adminAuth, async (req, res) => {
  try {
    const { name, description, price, images, stock, category, tags } =
      req.body;

    if (!name || !description || !price || !stock || !category || !tags) {
      return res.status(400).json({ message: "Missing required Fields." });
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      stock,
      category,
      tags,
      images: images || [],
    });

    return res.status(201).json(product);
  } catch (e) {
    console.error("Error while adding Product:", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", getSingleProduct);

router.put("/:id", adminAuth, updateProduct);

router.delete("/:id", adminAuth, deleteProduct);

export default router;
