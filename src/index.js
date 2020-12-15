import express from "express"
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from './typeDefs'
import resolvers from './resolvers'
const http = require("http");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express()
const serverhttp = http.createServer(app);
server.applyMiddleware({ app })
server.installSubscriptionHandlers(serverhttp);

app.listen(8080, () => {
  console.log("ok");
});