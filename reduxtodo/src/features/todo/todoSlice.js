import {createSlice, nanoid} from "@reduxjs/toolkit";
const initialState={
    todos:[{
        id:nanoid(),
        text: "Title of todo",
        toggleCompleted: false,
        edited: false,
    }]
}
export const todoSlice=createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTodo:(state, action)=>{
            const todo={
                id:nanoid(),
                text:action.payload,
                completed:false,
                edited:false
            }
            state.todos.push(todo)
        },
        removeTodo:(state, action)=>{
            state.todos=state.todos.filter((todo)=>  todo.id !=action.payload)
        },
        toggleCompleted: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
              // Create a new object with the updated completed status
              const updatedTodo = { ...todo, completed: !todo.completed };
              // Replace the old todo with the updated one in the array
              state.todos = state.todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
            }
          },
         
          
          
    }
})
export const {addTodo,removeTodo, toggleCompleted, } = todoSlice.actions;
export default todoSlice.reducer;