import TodoRepository from "../repository/todoRepository";

// Define the TodoService class
class TodoService {
    // Property to hold the instance of TodoRepository
    todoRepository: TodoRepository;

    // Constructor to initialize TodoService with a TodoRepository instance
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository;
    }

    // Method to get all todo items by calling the repository's getAll method
    // TypeScript infers that the return type is Promise<ITodo[]>
    async getAll() {
        return await this.todoRepository.getAll();
    }

    // Method to create a new todo item by calling the repository's create method
    // TypeScript infers that the return type is Promise<ITodo>
    async create(title: String, tags: String[]) {
        return await this.todoRepository.create(title, tags);
    }

    async deleteTodo(id : String){
        return await this.todoRepository.deleteTodo(id);
    }

}

export default TodoService;
