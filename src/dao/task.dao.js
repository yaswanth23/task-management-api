const { TasksSchema } = require("../models");

module.exports.insertTask = async (insertObj, session) => {
  try {
    let data = await TasksSchema.create([insertObj], { session: session });
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports.findTask = async (whereObj, session) => {
  try {
    return await TasksSchema.findOne(whereObj).session(session);
  } catch (error) {
    throw error;
  }
};

module.exports.updateTask = async (whereObj, updateObj, session) => {
  try {
    return await TasksSchema.updateOne(whereObj, updateObj, {
      session: session,
    });
  } catch (error) {
    throw error;
  }
};
