import { useMutation, useQuery } from "@apollo/client"
import { ADD_TODO } from "../graphql/mutations"
import uuid from 'react-uuid';
import { Key, useState } from "react";
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
            console.log(addTodo);
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

    const { data } = useQuery(GET_TODOS);

    function handleAddTodo(e: React.FormEvent) {
        e.preventDefault();
        addTodo({
            variables: {
                title,
                tags: tags.split(',').map(tag => tag.trim())
            }
        })
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
            <ul>
                {
                    data?.getTodos.map((data: ITodo) => <li key={data.id as Key}>{data.title}</li>)
                }
            </ul>
        </>
    )
}