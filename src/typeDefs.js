import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar JSON
  type Subscription {
    toDoAdded: ToDo
  }
  type ToDo {
    _id: String
    title: String
    complete: Boolean
  }
  input ToDoInput {
    title: String
    complete: Boolean
  }
  type Query {
    hello: String
    toDo(id: String): ToDo
    toDos(where: JSON): [ToDo]
  }
  type Mutation {
    addToDo(input: ToDoInput): ToDo
  }
`;

export default typeDefs