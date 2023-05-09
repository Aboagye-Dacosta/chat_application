const ChatMongoModel = require("./chats.mongo");
const RecentChatteredUsers = require("./recent.mongo");

const userOptions = {
  _id: 1,
  username: 1,
  email: 1,
  userAvatar: 1,
  hasAvatar: 1,
  friends: 1,
  friendRequests: 1,
  friendRequestsSent: 1,
  createdAt: 1,
  updatedAt: 1,
};

//saving chat

function saveChat(from, to, message) {
  return new Promise((resolve, reject) => {
    ChatMongoModel.create({
      from,
      to,
      message,
      staled: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
      .then((data) => resolve(data))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function saveRecentChatteredUser(from, to) {
  return new Promise((resolve, reject) => {
    RecentChatteredUsers.findOneAndUpdate(
      {
        from,
        to,
      },
      {
        from,
        to,
      },
      {
        upsert: true,
      }
    )
      .then((data) => resolve(data))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function readRecentChattedUsers(userFriends, currentUserId) {
  return new Promise((resolve, reject) => {
    RecentChatteredUsers.find({
      $or: [
        { $and: [{ to: currentUserId }, { from: { $in: userFriends } }] },
        { $and: [{ from: currentUserId }, { to: { $in: userFriends } }] },
      ],
    })
      .populate({
        path: "to",
        select: userOptions,
      })
      .populate({
        path: "from",
        select: userOptions,
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function readChatsFromTo(currentUserId, friendId) {
  return new Promise((resolve, reject) => {
    ChatMongoModel.find({ from: currentUserId, to: friendId })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function readChatsToFrom(currentUserId, friendId) {
  return new Promise((resolve, reject) => {
    ChatMongoModel.find({ from: friendId, to: currentUserId })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

module.exports = {
  saveChat,
  readChatsToFrom,
  readChatsFromTo,
  readRecentChattedUsers,
  saveRecentChatteredUser,
};
