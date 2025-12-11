// src/routes/upload.routes.ts
import { Router } from "express";
import { uploadImages } from "../controllers/upload.controller";
import { uploadMemory } from "../middlewares/uploadMemory";
import adminAuth from "../middlewares/adminAuth.middleware"; // your admin auth

const router = Router();

// Expect files under field name "images"
router.post("/", adminAuth, uploadMemory.array("images", 3), uploadImages);

export default router;
