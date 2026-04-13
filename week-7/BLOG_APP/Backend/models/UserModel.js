import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"]
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already existed"]
    },
    password: {
      type: String,
      required: [true, "password should not be empty"],
      minLength: [4, "minimum 4 characters"]
    },
    role: {
      type: String,
      enum: ["USER", "AUTHOR", "ADMIN"],
      required: [true, "{value} is an invalid role"]
    },
    profileImageUrl: {
      type: String
    },
    isUserActive: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  },
);
export const UserModel = model("user", userSchema);
