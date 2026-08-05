import mongoose from "mongoose";
import { Product } from "./products.model";

// mini models for complex models

const orderItemsSchema = new mongoose.Schema({
  Productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
}); // we can also create this into separate file but its also a good

const OrderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // order with mini schema
    orderItems: {
      type: [orderItemsSchema],
    },

    // nested model , ager mini model extra create nhi krna to ese kr skte hain
    address: [
      {
        pincode: {
          type: String,
        },
        receivername: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        countryname: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        city: {
          type: String,
        },
        landmark: {
          type: String,
        },
        addresstype: {
          type: String,
          enum: ["Home", "Office", "Other"],
          default: "Home",
        },
      },
    ],

    orderStatus: {
      type: String,
      //speacial type checking with enum ->
      // for speacial requirements
      enum: ["PENDING", "CANCELLED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", OrderSchema);
