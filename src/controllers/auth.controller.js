const Joi = require("joi");
const { validateSchema } = require("../common/validator");
const logger = require("../middleware/logger")("auth-controller");
const { AuthBao } = require("../bao");
const {
  STATUS_CODES,
  ERRROR_STATUS_CODES,
  STATUS_MESSAGES,
} = require("../common/constants");

module.exports.signup = async (req, res) => {
  try {
    logger.info("auth controller: signup");
    const schema = Joi.object().keys({
      userName: Joi.string().required(),
      emailId: Joi.string().required(),
      password: Joi.string().required(),
    });

    const data = await validateSchema(req.body, schema);

    const authBao = new AuthBao();
    const result = await authBao.signup(data);

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
