import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// Create a new task
router.post("/", createTask);

// Get all tasks (with filters, sorting, pagination)
router.get("/", getTasks);

// Get a single task by ID
router.get("/:id", getTask);

// Update a task by ID
router.put("/:id", updateTask);

// Delete a task by ID
router.delete("/:id", deleteTask);

export default router;
