"use strict";

import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers.js";

const server = new GraphQLServer({
    typeDefs: "testql/graphql/schema.graphql",
    resolvers
});

server.start(() => console.log("GraphQL Server Running"));