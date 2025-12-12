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
exports.uploadImages = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const uploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || !req.files.length) {
            return res.status(400).json({ message: "No files uploaded" });
        }
        const files = req.files;
        // Promise to upload a single file buffer to cloudinary using stream
        const uploadSingle = (file) => new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.default.uploader.upload_stream({
                folder: process.env.CLOUDINARY_UPLOAD_FOLDER || "handicraft_products",
                resource_type: "image",
                // optional transformations could be added here
                // e.g. quality/resize: transformation: [{ width: 1200, crop: "limit" }]
            }, (error, result) => {
                if (error)
                    return reject(error);
                if (!result)
                    return reject(new Error("No result from Cloudinary"));
                resolve({ url: result.secure_url, public_id: result.public_id });
            });
            streamifier_1.default.createReadStream(file.buffer).pipe(uploadStream);
        });
        // Upload all files
        const uploaded = yield Promise.all(files.map((f) => uploadSingle(f)));
        // Return array of URLs (and public_ids if you need them)
        return res.json({ uploaded });
    }
    catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ message: "Upload failed", error: err });
    }
});
exports.uploadImages = uploadImages;
