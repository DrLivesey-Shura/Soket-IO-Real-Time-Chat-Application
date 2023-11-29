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
const server = app.listen(PORT, () => {
  console.log("App running in port: ".yellow.bold + PORT.yellow.bold);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("Connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", (userData) => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
