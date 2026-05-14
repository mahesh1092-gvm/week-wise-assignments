import { Schema, model, Types } from "mongoose";
import { productModel } from "./ProductModel.js";

//create cart schema {product , count}
const cartSchema = new Schema({
  product: {
    // type: Schema.Types.ObjectId, or import types
    type: Types.ObjectId,
    ref: "product", //name of the product model
  },
  count: {
    type: Number,
    default: 1,
  },
});

//create user schema(username, password,email,age)
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username must not be empty"],
      minLength: [6, "minimum 6 chars required"],
      maxLength: [12, "maximum 12 chars only"],
      unique: [true, "username already existed"],
    },
    password: {
      type: String,
      required: [true, "password must not be empty"],
    },
    email: {
      type: String,
      requried: [true, "email must not be empty"],
      unique: [true, "email already existed"],
    },
    age: {
      type: Number,
    },
    cart: [cartSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
//generate UserModel
export const userModel = model("user", userSchema);
//create a plural name of (user)collection created in database.
