const UserController = require("./controllers.users");

module.exports = {
  Query: {
    users: async (_, args, context) => {
      return await UserController.httpGetAllUsers(context.getUser._id);
    },
    recent: async (_, args) => {},

    currentUser: async (_, args, context) => {
      const user = await UserController.httpGetUserById(context.getUser._id);
      console.log(
        "🚀 ~ file: users.resolver.js:13 ~ currentUser: ~ user:",
        user
      );
      return user;
    },

    userById: async (_, args) => {
      return await UserController.httpGetUserById(args.id);
    },

    userByUsername: async (_, args) => {
      return await UserController.httpGetUserByUsername(args);
    },
  },

  Mutation: {
    async sendFriendRequest(_, args) {
      await UserController.httpSaveSendFriendRequest(args.id, args.friendId);
    },
    async acceptFriendRequest(_, args) {
      await UserController.httpAcceptFriendRequest(args.id, args.friendId);
    },
    async declineFriendRequest(_, args) {
      console.log("canceling friend request", args);
      await UserController.httpCancelRequestSent(args.id, args.friendId);
    },
    async removeFriend(_, args) {
      console.log("removing friend ", args);
      await UserController.httpRemoveFriend(args.id, args.friendId);
    },
  },
};
