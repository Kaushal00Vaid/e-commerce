// src/controllers/upload.controller.ts
import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

export const uploadImages = async (req: Request, res: Response) => {
  try {
    if (!req.files || !(req.files as Express.Multer.File[]).length) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const files = req.files as Express.Multer.File[];

    // Promise to upload a single file buffer to cloudinary using stream
    const uploadSingle = (file: Express.Multer.File) =>
      new Promise<{ url: string; public_id: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder:
              process.env.CLOUDINARY_UPLOAD_FOLDER || "handicraft_products",
            resource_type: "image",
            // optional transformations could be added here
            // e.g. quality/resize: transformation: [{ width: 1200, crop: "limit" }]
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error("No result from Cloudinary"));
            resolve({ url: result.secure_url, public_id: result.public_id });
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

    // Upload all files
    const uploaded = await Promise.all(files.map((f) => uploadSingle(f)));

    // Return array of URLs (and public_ids if you need them)
    return res.json({ uploaded });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Upload failed", error: err });
  }
};
