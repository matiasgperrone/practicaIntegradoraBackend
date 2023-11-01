import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: [{ quantity: { type: Number, required: true } }],
  },
  { timestamps: true }
);

export default mongoose.model("cart", cartSchema);
