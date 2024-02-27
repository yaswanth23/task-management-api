require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const colors = require("colors/safe");
const http = require("http");
const app = require("../src/app");
const connectDB = require("../src/db/dbConnection");
const WebSocketServer = require("ws");

const server = http.createServer(app);
const wss = new WebSocketServer.Server({ server });

wss.on("connection", function connection(ws) {
  console.log("WebSocket connection established");

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
  ws.send("hello from server");
});

wss.on("taskAdded", function (taskId) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`Task added: ${taskId}`);
    }
  });
});

wss.on("taskUpdated", function (taskId) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`Task updated: ${taskId}`);
    }
  });
});

wss.on("taskDeleted", function (taskId) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`Task deleted: ${taskId}`);
    }
  });
});

(async () => {
  await connectDB();
  server.listen(process.env.APP_PORT, () => {
    const url = `http://localhost:${process.env.APP_PORT}`;
    console.log(`Web server listening on ${url}`);
    console.log(`Use the following command to test the ping call:`);
    console.debug(`${colors.yellow("curl " + url + "/api/ping")}`);
  });
})();

module.exports = { wss };
