// src/middleware/uploadMemory.ts
import multer from "multer";

const storage = multer.memoryStorage();
export const uploadMemory = multer({ storage });
