import { createContext, useContext } from "react";


 export const todoContext=createContext({
    todos:[
      {
         id:1,
         todo:"Todo  title",
         completed: false,
      }
    ],
    addTodo: (todo)=>{},
    updateTodo: (todo, id) =>{},
    deleteTodo: (id) =>{},
    toggleCompleted: (id)=>{},
 })

 export const TodoProvider=todoContext.Provider;

 export const useTodo= ()=>{
    return useContext(todoContext);
 }