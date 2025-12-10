import { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  tags?: string[];
  isFeatured?: boolean;
  createdAt: Date;
}

const productScehema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [String],
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>("Product", productScehema);
