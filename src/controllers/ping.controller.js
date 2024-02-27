module.exports.getPing = async (httpRequest, httpResponse, next) => {
  try {
    const date = new Date();
    const response = {
      serverTime: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      serverName: "task-management-api",
      version: "1.0",
    };

    return httpResponse.status(200).json(response);
  } catch (e) {
    return next(e);
  }
};
