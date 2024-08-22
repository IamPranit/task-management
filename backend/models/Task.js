import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { comparePasswordWithHash, hashPassword } from "../utils/bcryptUtils.js";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Task", TaskSchema);
