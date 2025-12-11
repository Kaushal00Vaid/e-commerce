import { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: { url: string; public_id: string }[];
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
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
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
