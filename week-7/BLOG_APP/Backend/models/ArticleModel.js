import { Schema, model, Types } from "mongoose";
const commentSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "user",
    required: [true, "User ID is required"],
  },
  comment: {
    type: String
  },
});
const articleSchema = new Schema(
  {
    author: {
      type: Types.ObjectId,
      ref: "user",
      required: [true, "author ID is required"]
    },
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    category: {
      type: String,
      required: [true, "Category is required"]
    },
    content: {
      type: String,
      required: [true, "content is required"]
    },
    comments: [{ type: commentSchema, default: [] }],
    isArticleActive: {
      type: Boolean,
      default: true
    },
  },
  {
    versionKey: false,
    timestamps: true,
    strict:"throw",
  },
);

export const ArticleModel = model("article", articleSchema);
