import { Request, Response } from "express";
import ProductModel from "../models/Product.model";
import cloudinary from "../config/cloudinary";

export const getAdminProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const count = await ProductModel.countDocuments();
    const products = await ProductModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalProducts: count,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, category, tags, images } =
      req.body;

    const updated = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        stock,
        category,
        tags,
        images,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          try {
            await cloudinary.uploader.destroy(img.public_id);
          } catch (err) {
            console.error("Cloudinary delete error:", err);
          }
        }
      }
    }

    await ProductModel.findByIdAndDelete(id);

    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
