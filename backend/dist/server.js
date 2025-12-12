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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const User_model_1 = __importDefault(require("./models/User.model"));
function preloadAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield User_model_1.default.findOne({ email: process.env.ADMIN_EMAIL });
        if (existing) {
            console.log("Admin already exists!");
            return;
        }
        yield User_model_1.default.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: yield bcryptjs_1.default.hash(process.env.ADMIN_PASSWORD, 10),
            role: "admin",
            provider: "local",
        });
        console.log("Admin created!");
    });
}
(0, db_1.connectDB)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield preloadAdmin();
    const PORT = process.env.PORT || 5000;
    app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}));
