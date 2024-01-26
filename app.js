const express = require("express");
const globalErrorHandler = require("./controllers/errorController");
const taskRouter = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

app.use(globalErrorHandler);

module.exports = app;
