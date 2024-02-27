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

module.exports.deleteTask = async (whereObj, session) => {
  try {
    return await TasksSchema.deleteOne(whereObj, {
      session: session,
    });
  } catch (error) {
    throw error;
  }
};

module.exports.findTasks = async (whereObj, session) => {
  try {
    let attributes = {
      taskId: 1,
      userId: 1,
      title: 1,
      description: 1,
      status: 1,
      createdAt: 1,
    };
    return await TasksSchema.find(whereObj, attributes).session(session);
  } catch (error) {
    throw error;
  }
};
