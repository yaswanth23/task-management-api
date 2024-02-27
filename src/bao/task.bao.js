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
      return { taskId, userId, status: "active" };
    } catch (error) {
      logger.error(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

module.exports = TaskBao;
