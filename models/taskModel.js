const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Task title is a required field"],
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["todo", "done"],
    default: "todo",
  },
});

const Task = mongoose.model("Task", taskSchema);

const getAllTasks = async () => await Task.find();
const addTask = async (task) => await Task.create(task);
const getTaskById = async (id) => await Task.findById(id);
const deleteTaskById = async (id) => await Task.findByIdAndDelete(id);
const updateTaskById = async (id, task) =>
  await Task.findByIdAndUpdate(id, task, { runValidators: true, new: true });
const getTaskStatusById = async (id) =>
  await Task.findById(id).select("status");
const completeTaskById = async (id) =>
  await Task.findByIdAndUpdate(
    id,
    { $set: { status: "done" } },
    { runValidators: true, new: true }
  );

module.exports = {
  Task,
  getAllTasks,
  getTaskById,
  addTask,
  deleteTaskById,
  getTaskStatusById,
  updateTaskById,
  completeTaskById,
};
