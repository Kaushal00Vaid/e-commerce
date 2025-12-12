"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const adminAuth_middleware_1 = __importDefault(require("../middlewares/adminAuth.middleware"));
const router = (0, express_1.Router)();
router.post("/", contact_controller_1.createContact);
router.get("/", adminAuth_middleware_1.default, contact_controller_1.getAllContacts);
exports.default = router;
