const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const expressHttpContext = require("express-http-context");
const routes = require("./routes");
const logger = require("../src/middleware/logger")("app");

const app = express();
app.set("trust proxy", true);
app.use(expressHttpContext.middleware);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json({ limit: "10mb", type: ["text/*", "*/json"] }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));
routes(app);

app.use(logger.requestLogger);
app.use(logger.responseLogger);
module.exports = app;
