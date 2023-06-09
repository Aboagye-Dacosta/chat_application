const ChatModel = require("../../models/chats/chats.model");
const UserModel = require("../../models/users/users.model");

async function httpSaveChat({ to, from, message }) {
  try
  {
   
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const data = await ChatModel.saveChat(
      from,
      to,
      message,
      createdAt,
      updatedAt
    );
    await ChatModel.saveRecentChatteredUser(from, to);

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function httpReadChats(currentUserId, friendId) {
  try {
    const d1 = await ChatModel.readChatsFromTo(currentUserId, friendId);
    const d2 = await ChatModel.readChatsToFrom(currentUserId, friendId);
    const data = [...d1, ...d2].sort(
      (a, b) => Number(a.createdAt) - Number(b.createdAt)
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function httpGetRecentChattedUsers(currentUserId) {
  try {
    const user = await UserModel.getUserById(currentUserId);
    const data = await ChatModel.readRecentChattedUsers(
      user.friends,
      currentUserId
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  httpSaveChat,
  httpReadChats,
  httpGetRecentChattedUsers,
};
