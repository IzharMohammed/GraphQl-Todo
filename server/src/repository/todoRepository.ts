import { Todo } from "../models/todo"; // Import the Todo model
import ITodo from "../types/todo"; // Import the ITodo interface

// Define the TodoRepository class for database operations related to todos
class TodoRepository {
    
    // Method to get all todo items from the database
    async getAll(): Promise<ITodo[]> {
        // Use Mongoose's find method to retrieve all todos
        return await Todo.find();
    }

    // Method to create a new todo item in the database
    async create(title: String, tags: String[]): Promise<ITodo> {
        // Use Mongoose's create method to add a new todo with the given title, tags, and a default completed status of false
        return await Todo.create({
            title,
            tags,
            completed: false
        });
    }

   async  deleteTodo(id : any){
    try{
        const result = await Todo.findByIdAndDelete(id);
        console.log('deleted item',result);
        return result;
    }catch(error){
        console.log('Error removing document:', error);

    }
   } 
}

export default TodoRepository;
