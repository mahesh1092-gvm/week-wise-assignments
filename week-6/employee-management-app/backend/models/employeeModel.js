import { Schema, model } from "mongoose";
const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "should not be empty"],
    },
    email: {
      type: String,
      required: [true, "Invalid email "],
      unique: [true, "email already exists"],
    },
    mobile: {
      type: Number,
      required: [true, "mobile number is required"],
    },
    designation: {
      type: String,
      required: [true],
    },
    companyName: {
      type: String,
      required: [true],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
export const employeeModel = model("employee", employeeSchema);
