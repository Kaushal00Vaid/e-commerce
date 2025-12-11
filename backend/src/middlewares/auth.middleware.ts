import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
}

export default function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Invalid token format" });

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error("User auth failed:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
}
