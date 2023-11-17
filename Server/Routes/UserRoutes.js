const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../Controllers/UserControllers");
const { protect } = require("../Middleware/authMiddleware");

const routes = new Router();

// Add routes
routes.post("/", registerUser);
routes.post("/login", loginUser);
routes.get("/", protect, getAllUsers);
// routes.put('/', updateUsesr);
// routes.delete('/', deleteUser);

module.exports = routes;
