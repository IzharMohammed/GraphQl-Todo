import { gql } from "@apollo/client";

export const ADD_TODO = gql`
mutation AddingTodos($title : String! , $tags : [String]!){
addTodo(title : $title , tags : $tags){
id
title
completed
}}
`

export const DELETE_TODOS =gql`
mutation deleteTodos($id : ID!){
deleteTodo(id : $id){
id
}
}
`