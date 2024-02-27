const { TasksSchema } = require("../models");

module.exports.insertTask = async (insertObj, session) => {
  try {
    let data = await TasksSchema.create([insertObj], { session: session });
    return data;
  } catch (error) {
    throw error;
  }
};
