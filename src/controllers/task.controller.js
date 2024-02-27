const Joi = require("joi");
const { validateSchema } = require("../common/validator");
const logger = require("../middleware/logger")("task-controller");
const { TaskBao } = require("../bao");
const {
  STATUS_CODES,
  ERRROR_STATUS_CODES,
  STATUS_MESSAGES,
} = require("../common/constants");

module.exports.addTask = async (req, res) => {
  try {
    logger.info("task controller: addTask");
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
    });

    const data = await validateSchema(req.body, schema);
    const userId = req.userId;

    const taskBao = new TaskBao();
    const result = await taskBao.addTask(data, userId);

    return res.status(STATUS_CODES.STATUS_CODE_201).json({
      statusCode: STATUS_CODES.STATUS_CODE_201,
      status: STATUS_MESSAGES.STATUS_MESSAGE_SUCCESS,
      data: result,
    });
  } catch (error) {
    logger.error(error);
    const errorMessage = error.message || error || "Internal Server Error";
    return res.status(ERRROR_STATUS_CODES.STATUS_CODE_400).json({
      statusCode: ERRROR_STATUS_CODES.STATUS_CODE_400,
      errorMessage: errorMessage,
    });
  }
};

module.exports.updateTaskStatus = async (req, res) => {
  try {
    logger.info("task controller: updateTaskStatus");
    const schema = Joi.object().keys({
      taskId: Joi.string().required(),
      status: Joi.string().valid("completed", "active").required(),
    });

    const data = await validateSchema(req.body, schema);
    const userId = req.userId;

    const taskBao = new TaskBao();
    const result = await taskBao.updateTaskStatus(data, userId);

    return res.status(STATUS_CODES.STATUS_CODE_200).json({
      statusCode: STATUS_CODES.STATUS_CODE_200,
      status: STATUS_MESSAGES.STATUS_MESSAGE_UPDATED,
      data: result,
    });
  } catch (error) {
    logger.error(error);
    const errorMessage = error.message || error || "Internal Server Error";
    return res.status(ERRROR_STATUS_CODES.STATUS_CODE_400).json({
      statusCode: ERRROR_STATUS_CODES.STATUS_CODE_400,
      errorMessage: errorMessage,
    });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    logger.info("task controller: deleteTask");

    const taskId = req.params.taskId;
    const userId = req.userId;

    const taskBao = new TaskBao();
    await taskBao.deleteTask(taskId, userId);

    return res.status(STATUS_CODES.STATUS_CODE_204).json({
      statusCode: STATUS_CODES.STATUS_CODE_204,
      status: STATUS_MESSAGES.STATUS_MESSAGE_DELETED,
    });
  } catch (error) {
    logger.error(error);
    const errorMessage = error.message || error || "Internal Server Error";
    return res.status(ERRROR_STATUS_CODES.STATUS_CODE_400).json({
      statusCode: ERRROR_STATUS_CODES.STATUS_CODE_400,
      errorMessage: errorMessage,
    });
  }
};

module.exports.getTasksList = async (req, res) => {
  try {
    logger.info("task controller: getTasksList");
    const userId = req.userId;

    const taskBao = new TaskBao();
    const result = await taskBao.getTasksList(userId);

    return res.status(STATUS_CODES.STATUS_CODE_200).json({
      statusCode: STATUS_CODES.STATUS_CODE_200,
      status: STATUS_MESSAGES.STATUS_MESSAGE_SUCCESS,
      data: result,
    });
  } catch (error) {
    logger.error(error);
    const errorMessage = error.message || error || "Internal Server Error";
    return res.status(ERRROR_STATUS_CODES.STATUS_CODE_400).json({
      statusCode: ERRROR_STATUS_CODES.STATUS_CODE_400,
      errorMessage: errorMessage,
    });
  }
};
