"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function userAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ message: "No token provided" });
        const token = authHeader.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Invalid token format" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    }
    catch (err) {
        console.error("User auth failed:", err);
        res.status(401).json({ message: "Unauthorized" });
    }
}
