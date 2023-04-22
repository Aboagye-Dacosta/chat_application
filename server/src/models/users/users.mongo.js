const mongoose = require("mongoose");


//schema for user for a chat app

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  userAvatar: String,
  hasAvatar: Boolean,
  friends: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  friendRequests: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  lastLogin: Date,
  friendRequestsSent: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  createdAt: Date,
  updatedAt: Date,
});

// UserSchema.plugin(passportLocalMongoose, {
//   hashField: "password",
//   lastLoginField: "lastLogin",
// });

module.exports = mongoose.model("User", UserSchema);
