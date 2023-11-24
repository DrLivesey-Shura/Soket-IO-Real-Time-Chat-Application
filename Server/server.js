const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const chats = require("./data/data");
require("dotenv").config();
const UserRoutes = require("./Routes/UserRoutes.js");
const ChatRoutes = require("./Routes/ChatRoutes.js");
const MessageRoutes = require("./Routes/MessageRoutes.js");
const colors = require("colors");
const { errorHandler, notFound } = require("./Middleware/errorMiddleware.js");

// Mongo DB Connections
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((response) => {
    console.log("MongoDB Connection Succeeded.".cyan.underline);
  })
  .catch((error) => {
    console.log("Error in DB connection: ".red.bold + error.red.bold);
  });

// Middleware Connections
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/chat", ChatRoutes);
app.use("/api/message", MessageRoutes);
app.use(notFound);
app.use(errorHandler);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: ".yellow.bold + PORT.yellow.bold);
});
