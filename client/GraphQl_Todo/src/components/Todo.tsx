import { useMutation, useQuery } from "@apollo/client"
import { ADD_TODO, DELETE_TODOS } from "../graphql/mutations"
import uuid from 'react-uuid';
import { Key, useEffect, useState } from "react";
import { GET_TODOS } from "../graphql/query";
import { GetTodosData, ITodo } from "../types/Todo";

export const Todo: React.FC = () => {

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');

    const [addTodo] = useMutation(ADD_TODO, {

        optimisticResponse: {
            addTodo: {
                id: uuid(),
                title: title,
                completed: false,
                tags: tags.split(',').map(tag => tag.trim())
            }
        },
        update: (cache, { data: { addTodo } }) => {
            const cachedTodos = cache.readQuery<GetTodosData>({
                query: GET_TODOS
            }) || { getTodos: [] }
            console.log('cached todos :', cachedTodos);
            cache.writeQuery({
                query: GET_TODOS,
                data: {
                    getTodos: [...cachedTodos.getTodos, addTodo]
                }
            })
        }
    })

    const [deleteTodo] = useMutation(DELETE_TODOS, {
        update : (cache , {data : {deleteTodo}}) => {
    
            const deletedCache = cache.readQuery<GetTodosData>({
                query : GET_TODOS
            }) || {getTodos : []}

            console.log('deleted cache', deletedCache.getTodos);
            
            cache.writeQuery({
                query : GET_TODOS,
                data : {
                    getTodos : deletedCache.getTodos.filter(todo=>todo.id!=deleteTodo.id)
                }
            })
        }
    });

    
    const { data } = useQuery(GET_TODOS);


    useEffect(()=>{},[data]);

    function handleAddTodo(e: React.FormEvent) {
        e.preventDefault();
        addTodo({
            variables: {
                title,
                tags: tags.split(',').map(tag => tag.trim())
            }
        })
    }

    function handleDelete(id) {

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