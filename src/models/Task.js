import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, maxlength: 500 },
    status: { type: String, enum: ["pending","in_progress","completed"], default: "pending" },
    priority: { type: String, enum: ["low","medium","high"], default: "medium" },
    dueDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
