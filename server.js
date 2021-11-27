const { ApolloServer } = require("apollo-server");

const typeDefs = `
  type Query {
    school: String
  }
    `;

const resolvers = {
  Query: {
    school: () => "abcd",
  },
};

const server = new ApolloServer({ typeDefs, resolvers, playground: true });
server.listen({ port: process.env.PORT || 3000 });
