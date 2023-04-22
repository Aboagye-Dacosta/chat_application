const MongoStore = require("connect-mongo");
const { mongoose } = require("./services.mongoose");

const mongoStore = new MongoStore({
  client: mongoose.connection.getClient(),
  stringify: false,
  autoRemove: "interval",
  autoRemoveInterval: 1,
  collectionName: "session",
  ttl: 24 * 60 * 60 * 1000,
});

module.exports = mongoStore;
