import { Router } from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  }
);

export default router;
