const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/school", (req, res) => {
  res.sendFile(`${__dirname}/school.html`);
});

const startApolloServer = async () => {
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
        return data.list.filter((element) =>
          element.SCHUL_NM.includes(arg.name)
        );
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
};

startApolloServer();
app.listen(process.env.PORT || 3000);
