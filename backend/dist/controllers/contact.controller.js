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
exports.getAllContacts = exports.createContact = void 0;
const Contact_model_1 = __importDefault(require("../models/Contact.model"));
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saved = yield Contact_model_1.default.create(req.body);
        res.json({ message: "Message received", saved });
    }
    catch (_a) {
        res.status(500).json({ message: "Failed to save contact" });
    }
});
exports.createContact = createContact;
const getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield Contact_model_1.default.find().sort({ createdAt: -1 });
        res.json({ contacts });
    }
    catch (_a) {
        res.status(500).json({ message: "Failed to fetch contacts" });
    }
});
exports.getAllContacts = getAllContacts;
