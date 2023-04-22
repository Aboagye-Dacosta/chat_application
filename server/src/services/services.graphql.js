const path = require("path");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = loadFilesSync(path.join(__dirname, "../models/**/*.graphql"));

const resolvers = loadFilesSync(
  path.join(__dirname, "../controllers/**/*.resolver.js")
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
