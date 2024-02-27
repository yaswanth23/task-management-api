const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  userId: { type: Number },
  userName: { type: String },
  emailId: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const UsersSchema = mongoose.model("users", usersSchema, "users");
module.exports = UsersSchema;
