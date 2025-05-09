import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true, unique: true },
    brandLogo: { type: String, required: true },
    categories: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
