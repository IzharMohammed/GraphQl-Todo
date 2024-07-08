import TodoRepository from "../repository/todoRepository"
import Todoservice from "../services/todoService"

const todoService = new Todoservice(new  TodoRepository());
const resolvers = {

    Query : {
        getTodos : async () =>{
            return await todoService.getAll();
        }
    },
    Mutation : {
        addTodo : async (_ : any , {title , tags} : {title : String , tags : String[]} )=>{
            return await todoService.create(title , tags);
        }
    }
}

export default resolvers;