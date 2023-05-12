const bcrypt = require("bcrypt");
const UserModel = require("../../models/users/users.model");

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

async function httpUpdateUserDetails(id, obj) {
  console.log("🚀 ~ file: controllers.users.js:63 ~ obj:", obj);
  try {
    UserModel.updateUser(id, obj);
  } catch (error) {
    console.log(
      "🚀 ~ file: controllers.users.js:67 ~ httpUpdateUserDetails ~ error:",
      error
    );
  }
}

//all users
async function httpGetAllUsers(currentUserId) {
  try {
    return await UserModel.getAllUsers(currentUserId);
  } catch (error) {
    console.log(
      "🚀 ~ file: controllers.users.js:79 ~ httpGetAllUsers ~ error:",
      error
    );
  }
}

//user by id

async function httpGetUserById(userId) {
  try {
    return await UserModel.getUserById(userId);
  } catch (error) {
    console.log(error);
  }
}

//user by email

async function httpGetUserByUsername({ username }) {
  try {
    if (!username) {
      return {
        status: false,
        message: "username is required",
      };
    }

    const user = await UserModel.getUserByUsername(username);
    return user;
  } catch (error) {
    return { error, status: false };
  }
}

async function httpSaveSendFriendRequest(currentUserId, friendId) {
  try {
    UserModel.sendFriendRequest(currentUserId, friendId);
    UserModel.saveFriendRequest(currentUserId, friendId);
  } catch (error) {
    return res.status(200).json({
      message: "sorry could not save sent request",
      status: false,
    });
  }
}

async function httpAcceptFriendRequest(currentUserId, friendId) {
  try {
    UserModel.removeFriendRequestSent(friendId, currentUserId);
    UserModel.removeFriendRequestReceived(currentUserId, friendId);
    UserModel.acceptFriendRequest(currentUserId, friendId);
    UserModel.acceptFriendRequest(friendId, currentUserId);
  } catch (error) {
    console.log(error);
  }
}

async function httpCancelRequestSent(currentUserId, friendId) {
  try {
    UserModel.removeFriendRequestSent(currentUserId, friendId);
    UserModel.removeFriendRequestReceived(friendId, currentUserId);
  } catch (error) {
    console.log(error);
  }
}

//removing friend
function httpRemoveFriend(currentUserId, friendId) {
  try {
    UserModel.removeFriend(currentUserId, friendId);
    UserModel.removeFriend(friendId, currentUserId);
  } catch (error) {
    console.log(error);
  }
}

function httpRecentChattedFriends(currentUserId) {
  try {
    return UserModel.recentChattedFriends(currentUserId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  httpSaveUser,
  httpUpdateUserDetails,
  httpGetAllUsers,
  httpGetUserById,
  httpGetUserByUsername,
  httpSaveSendFriendRequest,
  httpAcceptFriendRequest,
  httpCancelRequestSent,
  httpRemoveFriend,
  httpRecentChattedFriends,
};
