import { Router } from "express";
import {
  createContact,
  getAllContacts,
} from "../controllers/contact.controller";
import adminAuth from "../middlewares/adminAuth.middleware";

const router = Router();

router.post("/", createContact);
router.get("/", adminAuth, getAllContacts);

export default router;
