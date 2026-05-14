import { Schema, model } from "mongoose";
//create schema for product
const productSchema = new Schema(
  {
    productId: {
      type: Number,
      required: [true, "Product id must not be empty"],
      unique: [true, "product id already existed"],
    },
    productName: {
      type: String,
      required: [true, "Product name must not be empty"],
    },
    price: {
      type: Number,
      required: [true, "price must not be empty"],
      min: [1000, "minimun 1000"],
      max: [50000, "maximum 50000"],
    },
    brand: {
      type: String,
      required: [true, "brand must not be empty"],
    },
  },
  {
    versionKey: false,
  },
);
//generate productModel
export const productModel = new model("product", productSchema);
