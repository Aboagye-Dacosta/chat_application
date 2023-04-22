const { GraphQLScalarType } = require("graphql");

const Void = new GraphQLScalarType({
  name: "Void",
  description: "Represents Null values",

  serialize() {
    return null;
  },

  parseValue() {
    return null;
  },

  parseLiteral() {
    return null;
  },
});

module.exports = Void;
