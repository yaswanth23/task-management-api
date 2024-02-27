const jwt = require("jsonwebtoken");

const checkJwtAndDecodeToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ statusCode: 401, errorMessage: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ statusCode: 401, errorMessage: "Invalid token" });
  }
};

module.exports = checkJwtAndDecodeToken;
