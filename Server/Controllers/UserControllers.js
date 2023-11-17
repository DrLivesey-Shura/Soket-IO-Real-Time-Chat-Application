const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const User = require("../Models/userModel.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!(name || email || password)) {
    res.status(400);
    throw new Error("Please Enter All The Fields!");
  }

  const userExiste = await User.findOne({ email });
  if (userExiste) {
    res.status(400);
    throw new Error("User Already exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create a User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (passwordIsCorrect) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Password");
    }
  } else {
    res.status(400);
    throw new Error("Invalid User Email");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, loginUser, getAllUsers };
