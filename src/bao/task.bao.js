const mongoose = require("mongoose");
const Base = require("./base");
const logger = require("../middleware/logger")("task-bao");
const { UserDao, TaskDao } = require("../dao");
const { IdGeneratorService } = require("../services");

class TaskBao extends Base {
  constructor() {
    super();
  }

  async addTask(data, userId) {
    const session = await mongoose.startSession();
    try {
      logger.info("task bao: addTask", userId);
      session.startTransaction();

      let whereObj = {
        userId: userId,
      };

      const user = await UserDao.findUser(whereObj, session);

      if (!user) {
        throw new Error("User not registered");
      }

      const taskId = await IdGeneratorService.generateId();

      let insertObj = {
        taskId: taskId,
        userId: user.userId,
        title: data.title,
        description: data.description,
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await TaskDao.insertTask(insertObj, session);

      await session.commitTransaction();
      session.endSession();
      return { taskId: taskId.toString(), userId, status: "active" };
    } catch (error) {
      logger.error(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async updateTaskStatus(data, userId) {
    const session = await mongoose.startSession();
    try {
      logger.info("task bao: updateTaskStatus", userId);
      session.startTransaction();

      let whereObj = {
        userId: userId,
      };

      const user = await UserDao.findUser(whereObj, session);

      if (!user) {
        throw new Error("User not registered");
      }

      whereObj = {
        userId: userId,
        taskId: data.taskId,
      };

      const task = await TaskDao.findTask(whereObj, session);

      if (!task) {
        throw new Error("Task not found", data.taskId);
      }

      let updateObj = {
        status: data.status,
      };

      await TaskDao.updateTask(whereObj, updateObj, session);

      await session.commitTransaction();
      session.endSession();
      return { taskId: data.taskId, userId, status: data.status };
    } catch (error) {
      logger.error(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

module.exports = TaskBao;
