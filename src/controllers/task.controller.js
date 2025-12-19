import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, status = "pending", priority = "medium", dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: { message: "Title is required" },
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    res.status(500).json({
      success: false,
      error: { message: "Server error" },
    });
  }
};

// GET ALL TASKS (with filtering, sorting, pagination)
export const getTasks = async (req, res) => {
  try {
    const {
      status,
      priority,
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = { createdBy: req.user.id };
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.json({
      success: true,
      data: tasks,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET TASKS ERROR:", err);
    res.status(500).json({
      success: false,
      error: { message: "Server error" },
    });
  }
};

// GET SINGLE TASK
export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: { message: "Task not found" },
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (err) {
    console.error("GET TASK ERROR:", err);
    res.status(500).json({
      success: false,
      error: { message: "Server error" },
    });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: { message: "Task not found" },
      });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate ?? task.dueDate;

    await task.save();

    res.json({
      success: true,
      data: task,
    });
  } catch (err) {
    console.error("UPDATE TASK ERROR:", err);
    res.status(500).json({
      success: false,
      error: { message: "Server error" },
    });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: { message: "Task not found" },
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    console.error("DELETE TASK ERROR:", err);
    res.status(500).json({
      success: false,
      error: { message: "Server error" },
    });
  }
};
