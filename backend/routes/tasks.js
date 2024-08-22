import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { jwtAuthenticate } from "../middleware/jwtAuth.js";
const router = express.Router();

router.use(jwtAuthenticate);

// Get all Tasks
router.get("/", getTasks);

// Get single Task
router.get("/:id", getTask);

// Create new Task
router.post("/", createTask);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

export default router;
