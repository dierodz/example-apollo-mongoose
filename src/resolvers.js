import mongoose, { Schema } from 'mongoose'
import dotenv from "dotenv";
const { PubSub } = require("apollo-server-express");

dotenv.config();
const { DATABASE_URL } = process.env;
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const ToDoSchema = new Schema({
  title: String,
  complete: Boolean
})

const ToDo = mongoose.model("todo", ToDoSchema)

const pubsub = new PubSub();
const TODO_ADDED = "TODO_ADDED";

const resolvers = {
  Subscription: {
    toDoAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([TODO_ADDED]),
    },
  },
  Query: {
    hello: () => "wanda",
    toDo: async (parent, { id }, context) => await ToDo.findById(id).exec(),
    toDos: async (parent, { where }, context) => await ToDo.find(where).exec(),
  },
  Mutation: {
    addToDo: async (parent, { input }, context) => {
      const result = await ToDo.create(input);;
      pubsub.publish(TODO_ADDED, { toDoAdded: result });
    },,
  },
};

export default resolvers