import mongoose, { Schema, model } from "mongoose";
import { logsMiddleware } from "../middleware/logs.middleware";

const uploadsSchema = new Schema(
  {
    title: {
      type: String,
      required: {
        value: true,
        message: "Please provide a title.",
      },
    },
    description: {
      type: String,
    },
    type:{
      type: String,
      enum: ["image", "video", "raw", "auto"],
      required: true, 
    },
    fileURL: {
      type: String,
      required: {
        value: true,
        message: "It is required.",
      },
    },
  },
  { timestamps: true }
);

logsMiddleware(uploadsSchema, "Uploads");
export const Uploads = model("Uploads", uploadsSchema);

