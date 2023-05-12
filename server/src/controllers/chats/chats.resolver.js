const ChatController = require("./chats.controller");

module.exports = {
  Query: {
    readChats: async (_, args, context) => {
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
