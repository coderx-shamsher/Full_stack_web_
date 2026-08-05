import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    productname: {
      type: String,
      required: true,
    },
    productimage: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    productstock: {
      default: 0,
      type: Number,
    },

    // model relation with category model
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", ProductSchema);
