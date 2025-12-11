import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  provider: "local" | "google";
  role: "user" | "admin";
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    provider: {
      type: String,
      required: true,
      default: "google",
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
