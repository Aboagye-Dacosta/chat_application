const mongoose = require("mongoose");

const recentChattedUser = new mongoose.Schema({
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("recentChatteredUsers", recentChattedUser);
