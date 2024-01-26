const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const server = app.listen(3000, () => {
  console.log("App running on port 3000");
});

mongoose
  .connect(process.env.DATABASE, {
    dbName: "tasks",
  })
  .then(() => console.log("DB connection successful!"));
