"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/upload.routes.ts
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const uploadMemory_1 = require("../middlewares/uploadMemory");
const adminAuth_middleware_1 = __importDefault(require("../middlewares/adminAuth.middleware")); // your admin auth
const router = (0, express_1.Router)();
// Expect files under field name "images"
router.post("/", adminAuth_middleware_1.default, uploadMemory_1.uploadMemory.array("images", 3), upload_controller_1.uploadImages);
exports.default = router;
