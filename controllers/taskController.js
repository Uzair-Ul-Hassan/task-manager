const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const {
  Task,
  getAllTasks,
  addTask,
  deleteTaskById,
  getTaskById,
  getTaskStatusById,
  completeTaskById,
  updateTaskById,
} = require("../models/taskModel");

exports.getTasks = catchAsync(async (req, res, next) => {
  const tasks = await getAllTasks();

  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title) {
    return next(new AppError("Title is required", 400));
  }

  const task = await addTask({ title, description });

  res.status(201).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const { status, ...rest } = req.body;
  const existingTask = await getTaskById(req.params.id);

  if (!existingTask) {
    return next(new AppError("Task with the specified id was not found", 400));
  }

  const updateTask = await updateTaskById(existingTask._id, rest);

  res.status(200).json({
    status: "success",
    data: {
      task: updateTask,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const existingTask = await getTaskById(req.params.id);

  if (!existingTask) {
    return next(new AppError("Task with the specified id was not found", 400));
  }

  await deleteTaskById(existingTask._id);

  res.status(204).json({
    status: "success",
  });
});

exports.completeTask = catchAsync(async (req, res, next) => {
  const taskStatus = await getTaskStatusById(req.params.id);

  if (!taskStatus) {
    return next(new AppError("Task with the specified id was not found", 400));
  }

  if (taskStatus.status === "done") {
    return next(new AppError("Task is already completed", 400));
  }

  const doneTask = await completeTaskById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      task: doneTask,
    },
  });
});

exports.categorizeTasks = catchAsync(async (req, res, next) => {
  const categorizedTasks = await Task.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      categorizedTasks,
    },
  });
});
