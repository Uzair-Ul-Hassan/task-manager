const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.route("/").get(taskController.getTasks).post(taskController.createTask);

router
  .route("/:id")
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

router.route("/:id/complete").patch(taskController.completeTask);

router.route("/categorize").get(taskController.categorizeTasks);

module.exports = router;
