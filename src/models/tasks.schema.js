const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
  taskId: { type: Number },
  userId: { type: Number },
  title: { type: String },
  description: { type: String },
  status: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const TasksSchema = mongoose.model("tasks", tasksSchema, "tasks");
module.exports = TasksSchema;
