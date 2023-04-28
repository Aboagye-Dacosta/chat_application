const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  staled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Chat", chatSchema);
