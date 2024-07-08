export interface ITodo {
    id: String,
    title: String,
    completed: Boolean,
    tags: String[]
}

export interface GetTodosData {
    getTodos : ITodo[]
}