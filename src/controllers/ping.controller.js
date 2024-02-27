const { STATUS_CODES } = require("../common/constants");

module.exports.getPing = async (httpRequest, httpResponse, next) => {
  try {
    const date = new Date();
    const response = {
      serverTime: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      serverName: "task-management-api",
      version: "1.0",
    };

    return httpResponse.status(STATUS_CODES.STATUS_CODE_200).json(response);
  } catch (e) {
    return next(e);
  }
};
