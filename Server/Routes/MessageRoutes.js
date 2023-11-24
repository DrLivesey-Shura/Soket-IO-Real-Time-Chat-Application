const { Router } = require("express");
const { protect } = require("../Middleware/authMiddleware");
const {
  sendMessage,
  allMessages,
} = require("../Controllers/MessageControllers");
const routes = new Router();

routes.post("/", protect, sendMessage);
routes.get("/:chatId", protect, allMessages);

module.exports = routes;
