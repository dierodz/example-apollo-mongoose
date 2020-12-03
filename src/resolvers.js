import mongoose, { Schema } from 'mongoose'
import dotenv from "dotenv";

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

const resolvers = {
  Query: {
    hello: () => "wanda",
    toDo: async (parent, { id }, context) => await ToDo.findById(id).exec(),
    toDos: async (parent, { where }, context) => await ToDo.find(where).exec(),
  },
  Mutation: {
    addToDo: async (parent, { input }, context) => await ToDo.create(input),
  },
};

export default resolvers