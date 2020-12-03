import express from "express"
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()

server.applyMiddleware({ app })

app.listen(8080)