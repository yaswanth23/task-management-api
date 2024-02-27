const mongoose = require("mongoose");
const Base = require("./base");
const jwt = require("jsonwebtoken");
const { genSaltSync, hashSync } = require("bcrypt");
const logger = require("../middleware/logger")("auth-bao");
const { UserDao } = require("../dao");
const { IdGeneratorService } = require("../services");

class AuthBao extends Base {
  constructor() {
    super();
  }

  async signup(data) {
    const session = await mongoose.startSession();
    try {
      logger.info("auth bao: signup");
      session.startTransaction();

      let whereObj = {
        emailId: data.emailId,
      };

      const user = await UserDao.findUser(whereObj, session);

      if (user) {
        throw new Error("User already exists");
      }

      const userId = await IdGeneratorService.generateId();

      const saltRounds = 10;
      const saltKey = genSaltSync(saltRounds);
      const hashedKey = hashSync(data.password, saltKey);

      let insertObj = {
        userId: userId,
        userName: data.userName,
        emailId: data.emailId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await UserDao.insertUser(insertObj, session);

      insertObj = {
        userId: userId,
        hashedKey: hashedKey,
        saltKey: saltKey,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await UserDao.insertUserAuthDetails(insertObj, session);

      await session.commitTransaction();
      session.endSession();
      return { userId: userId.toString() };
    } catch (error) {
      logger.error(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async login(data) {
    const session = await mongoose.startSession();
    try {
      logger.info("auth bao: login", data.emailId);
      session.startTransaction();

      let whereObj = {
        emailId: data.emailId,
      };

      const user = await UserDao.findUser(whereObj, session);

      if (!user) {
        throw new Error("User not registered");
      }

      whereObj = {
        userId: user.userId,
      };
      const userAuthDetails = await UserDao.findUserAuthDetails(
        whereObj,
        session
      );

      const hashedPassword = hashSync(data.password, userAuthDetails.saltKey);

      if (hashedPassword !== userAuthDetails.hashedKey) {
        throw new Error("Invalid credentials");
      }

      const accessToken = jwt.sign(
        { userId: user.userId.toString() },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      await session.commitTransaction();
      session.endSession();
      return {
        userId: user.userId,
        userName: user.userName,
        accessToken: accessToken,
      };
    } catch (error) {
      logger.error(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

module.exports = AuthBao;
