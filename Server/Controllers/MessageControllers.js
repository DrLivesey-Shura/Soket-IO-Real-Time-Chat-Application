const expressAsyncHandler = require("express-async-handler");
const sendMessage = expressAsyncHandler(async (req, res) => {});
const allMessages = expressAsyncHandler(async (req, res) => {});

module.exports = { sendMessage, allMessages };
