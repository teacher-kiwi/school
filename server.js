const { ApolloServer } = require("apollo-server");

const data = require("./db");

const typeDefs = `
  type Data {
    SCHUL_NM: String
    SCHUL_RDNMA: String
    LTTUD: String
    LGTUD: String
  }

  type Query {
    school(name: String): [Data]
  }
    `;

const resolvers = {
  Query: {
    school: (_, arg) => {
      return data.list.filter((element) => element.SCHUL_NM.includes(arg.name));
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: process.env.PORT || 4000 });
