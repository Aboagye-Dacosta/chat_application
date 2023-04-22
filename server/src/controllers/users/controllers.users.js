const bcrypt = require("bcrypt");
const UserModel = require("../../models/users/users.model");
const formidable = require("formidable");
const path = require("path");

//save User
async function httpSaveUser(req, res, next) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(200).json({
        message: "Please fill all the fields",
        status: false,
      });
    }

    const userExists = await UserModel.getUserByUsername(username);
    const emailExists = await UserModel.getUserByEmail(email);

    if (emailExists) {
      return res.status(200).json({
        message: "Email already exists",
        status: false,
      });
    }

    if (userExists) {
      return res.status(200).json({
        message: "User already exists",
        status: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      username,
      email,
      password: hashPassword,
      salt,
      userAvatar: "",
      hasAvatar: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      friends: [],
      friendRequests: [],
      friendRequestsSent: [],
    };

    await UserModel.saveUser(newUser);
    return next();
  } catch (err) {
    return res.status(200).json({
      message: "Could not save user",
      status: false,
    });
  }
}

//all users
async function httpGetAllUsers() {
  try {
    return await UserModel.getAllUsers();
  } catch (err) {
    throwNewError("Could not read users", "READ_ERROR");
  }
}

//user by id

async function httpGetUserById(userId) {
  try {
    const user = await UserModel.getUserById(userId);
    return user;
  } catch (error) {
    throwNewError("Could not load user", "READ_ERROR");
  }
}

//user by email

async function httpGetUserByUsername({ username }) {
  try {
    if (!username)
      throwNewError(
        "username or password incorrect",
        "USERNAME_PASSWORD_ERROR"
      );
    const user = await UserModel.getUserByUsername(username);
    return user;
  } catch (error) {
    return { error, status: false };
  }
}

async function httpSaveSendFriendRequest(currentUserId, friendId) {
  try {
    await UserModel.sendFriendRequest(currentUserId, friendId);
    await UserModel.saveFriendRequest(currentUserId, friendId);
  } catch (error) {
    return res.status(200).json({
      message: "sorry could not save sent request",
      status: false,
    });
  }
}

async function httpAcceptFriendRequest(currentUserId, friendId) {
  try {
    await UserModel.removeFriendRequestSent(friendId, currentUserId);
    await UserModel.removeFriendRequestReceived(currentUserId, friendId);
    await UserModel.acceptFriendRequest(currentUserId, friendId);
    await UserModel.acceptFriendRequest(friendId, currentUserId);
  } catch (error) {
    console.log(error);
  }
}

async function httpCancelRequestSent(currentUserId, friendId) {
  try {
    await UserModel.removeFriendRequestSent(currentUserId, friendId);
    await UserModel.removeFriendRequestReceived(friendId, currentUserId);
  } catch (error) {
    console.log(error);
  }
}

//removing friend
async function httpRemoveFriend(currentUserId, friendId) {
  try {
    await UserModel.removeFriend(currentUserId, friendId);
    await UserModel.removeFriend(friendId, currentUserId);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  httpSaveUser,
  httpGetAllUsers,
  httpGetUserById,
  httpGetUserByUsername,
  httpSaveSendFriendRequest,
  httpAcceptFriendRequest,
  httpCancelRequestSent,
  httpRemoveFriend,
};
