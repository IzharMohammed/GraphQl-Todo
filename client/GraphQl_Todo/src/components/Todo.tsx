import { useMutation, useQuery } from "@apollo/client"
import { ADD_TODO, DELETE_TODOS } from "../graphql/mutations"
import uuid from 'react-uuid';
import { Key, useEffect, useState } from "react";
import { GET_TODOS } from "../graphql/query";
import { GetTodosData, ITodo } from "../types/Todo";

export const Todo: React.FC = () => {

    // State variables for title and tags
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');

    // Mutation hook to add a new todo
    const [addTodo] = useMutation(ADD_TODO, {

        optimisticResponse: {
            addTodo: {
                id: uuid(),
                title: title,
                completed: false,
                tags: tags.split(',').map(tag => tag.trim())
            }
        },

        //the addTodo is returned because we have defined in backend that  when we addTodo then it should return TODO inside typeDefs
        // inside addTodos and the reason why we have destructures data is we can see it in apollo server at 4000 port , when we add any todo 
        // then its returning in data and inside it addTodo
        update: (cache, { data: { addTodo } }) => {

            // Read the current cached todos
            const cachedTodos = cache.readQuery<GetTodosData>({
                query: GET_TODOS
            }) || { getTodos: [] }

            // Write the new todo to the cache
            cache.writeQuery({
                query: GET_TODOS,
                data: {
                    getTodos: [...cachedTodos.getTodos, addTodo]
                }
            })

        }
    })

    // Mutation hook to delete a todo
    const [deleteTodo] = useMutation(DELETE_TODOS, {

        update: (cache, { data: { deleteTodo } }) => {
            // Read the current cached todos
            const cachedTodos = cache.readQuery<GetTodosData>({
                query: GET_TODOS
            }) || { getTodos: [] }

            // Filter out the deleted todo from the cache
            cache.writeQuery({
                query: GET_TODOS,
                data: {
                    getTodos: cachedTodos.getTodos.filter(todo => todo.id != deleteTodo.id)
                }
            })

        }
    });

    // Query hook to get all todos
    const { data } = useQuery(GET_TODOS);


    // Function to handle adding a todo
    function handleAddTodo(e: React.FormEvent) {
        e.preventDefault();
        addTodo({
            variables: {
                title,
                tags: tags.split(',').map(tag => tag.trim())
            }
        })
        // Reset the form fields
        setTags('');
        setTitle('');
    }

    // Function to handle deleting a todo
    function handleDelete(id: String) {
        deleteTodo({
            variables: {
                id
            }
        }).then(response => console.log(response.data)
        ).catch(error => console.log('error', error)
        )
    }

    return (
        <>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={title}
                    placeholder="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    value={tags}
                    placeholder="tags"
                    onChange={(e) => setTags(e.target.value)}
                />
                <button>Add</button>
            </form>
            <ul style={{ display: 'flex', gap: '4rem' }}>
                {
                    data?.getTodos.map((data: ITodo) => (
                        <li key={data.id as Key} >
                            {data.title}
                            <button>Edit</button>
                            <button onClick={() => handleDelete(data.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
