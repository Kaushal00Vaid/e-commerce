import Contact from "../models/Contact.model";
import { Request, Response } from "express";

export const createContact = async (req: Request, res: Response) => {
  try {
    const saved = await Contact.create(req.body);
    res.json({ message: "Message received", saved });
  } catch {
    res.status(500).json({ message: "Failed to save contact" });
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ contacts });
  } catch {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};
