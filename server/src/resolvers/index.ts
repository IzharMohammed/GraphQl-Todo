import TodoRepository from "../repository/todoRepository";
import TodoService from "../services/todoService";

// Creating an instance of TodoService with a new TodoRepository
const todoService = new TodoService(new TodoRepository());

const resolvers = {
    // Resolvers for Query operations
    Query: {
        // Resolver to get all todos
        getTodos: async () => {
            return await todoService.getAll();
        }
    },
    // Resolvers for Mutation operations
    Mutation: {
        // Resolver to add a new todo
        addTodo: async (_: any, { title, tags }: { title: String, tags: String[] }) => {
            return await todoService.create(title, tags);
        },

        deleteTodo : async (_:any ,{id} : {id : String})=>{
            return await todoService.deleteTodo(id);
        }
    }
}

// Exporting the resolvers to be used in the GraphQL server
export default resolvers;
