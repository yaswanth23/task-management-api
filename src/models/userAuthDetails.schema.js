const mongoose = require("mongoose");

const userAuthDetailsSchema = mongoose.Schema({
  userId: { type: Number },
  hashedKey: { type: String },
  saltKey: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const UserAuthDetailsSchema = mongoose.model(
  "userAuthDetails",
  userAuthDetailsSchema,
  "userAuthDetails"
);
module.exports = UserAuthDetailsSchema;
