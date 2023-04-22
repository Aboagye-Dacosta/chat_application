const UserController = require("./controllers.users");
// const Void = require("../../models/users/scalar-void.graphql");

module.exports = {
  Query: {
    users: async (_, args, context) => {
      return await UserController.httpGetAllUsers();
    },
    currentUser: async (_, args, context) => {
      return await UserController.httpGetUserById(context.getUser._id);
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
