const UserModel = require("./users.mongo");

const options = {
  _id: 1,
  username: 1,
  email: 1,
  password: 1,
  userAvatar: 1,
  friends: 1,
  friendRequests: 1,
  friendRequestsSent: 1,
  createdAt: 1,
  updatedAt: 1,
};
//create user
function saveUser(user) {
  return new Promise((resolve, reject) => {
    UserModel.create(user)
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}

//get all users from the database
function getAllUsers() {
  return new Promise((resolve, reject) => {
    UserModel.find({})
      .populate({
        path: "friendRequestsSent",
        select: options,
      })
      .populate({
        path: "friendRequests",
        select: options,
      })
      .populate({
        path: "friends",
        select: options,
      })
      .then((users) => resolve(users))
      .catch((err) => reject(err));
  });
}

// get user by id

function getUserById(userId) {
  return new Promise((resolve, reject) => {
    UserModel.findById(userId)
      .populate({
        path: "friendRequestsSent",
        select: options,
      })
      .populate({
        path: "friendRequests",
        select: options,
      })
      .populate({
        path: "friends",
        select: options,
      })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}

function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ username })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}
//update user

function updateUser(userId, user) {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate({ _id: userId }, user, { new: true })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

//delete user
function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    UserModel.findByIdAndDelete(userId)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

//save friend request
function saveFriendRequest(userId, friendId) {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { friendRequestsSent: friendId } },
      { new: true }
    )
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

//send friend request
function sendFriendRequest(userId, friendId) {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { _id: friendId },
      { $push: { friendRequests: userId } },
      { new: true }
    )
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

//accept friend request
function acceptFriendRequest(userId, friendId) {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { friends: friendId } },
      { new: true }
    )
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

//remove friend request sent
function removeFriendRequestSent(userId, friendId) {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { friendRequestsSent: friendId } },
      { new: true }
    )
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}
//remove friend request received
function removeFriendRequestReceived(userId, friendId) {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { friendRequests: friendId } },
      { new: true }
    )
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

//delete friend
function removeFriend(userId, friendId) {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { new: true }
    )
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

module.exports = {
  saveUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUser,
  deleteUser,
  saveFriendRequest,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
  removeFriendRequestSent,
  removeFriendRequestReceived,
};
