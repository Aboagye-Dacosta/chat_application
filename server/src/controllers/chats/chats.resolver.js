const ChatController = require("./chats.controller");

module.exports = {
  Query: {
    chats: async (_, args) => {},
    recentChattedUsers: async (_, args, context) => {
      return await ChatController.httpGetRecentChattedUsers(
        context.getUser._id
      );
    },
    readChats: async (_, args, context) => {
      console.log(
        "logging from chat resolver",
        args.friendId,
        context.getUser._id
      );
      return await ChatController.httpReadChats(
        context.getUser._id,
        args.friendId
      );
    },
  },
  Mutation: {
    async saveChat(_, args, context) {
      await ChatController.httpSaveChat(args);
      return context.getUser._id;
    },
  },
};
