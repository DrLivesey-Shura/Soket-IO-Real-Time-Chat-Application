const { Router } = require("express");
const { protect } = require("../Middleware/authMiddleware");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../Controllers/ChatControllers");

const routes = new Router();

// Add routes
routes.post("/", protect, accessChat);
routes.get("/", protect, fetchChat);
routes.post("/group", protect, createGroupChat);
routes.put("/rename", protect, renameGroup);
routes.put("/groupremove", protect, removeFromGroup);
routes.put("/groupadd", protect, addToGroup);

module.exports = routes;
