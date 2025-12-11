import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import app from "./app";
import { connectDB } from "./config/db";
import UserModel from "./models/User.model";

async function preloadAdmin() {
  const existing = await UserModel.findOne({ email: process.env.ADMIN_EMAIL! });

  if (existing) {
    console.log("Admin already exists!");
    return;
  }

  await UserModel.create({
    name: "Admin",
    email: process.env.ADMIN_EMAIL!,
    password: await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10),
    role: "admin",
    provider: "local",
  });

  console.log("Admin created!");
}

connectDB().then(async () => {
  await preloadAdmin();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
