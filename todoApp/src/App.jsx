import './App.css'
import ThemeBtn from './Components/ThemeBtn'
import { ThemeProvider, TodoProvider } from './Context'
import { useState, useEffect} from 'react'
import TodoForm from './Components/TodoForm'
import ToDoList from './Components/ToDoList';


function App() {
  //Theme Context implementation first
  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = () => { setThemeMode("light"); }
  const darkTheme = () => { setThemeMode("dark"); }

  // todos implementations
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (todo, id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id != id)
    )
  }

  const toggleComplete = (id) => {
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
        <div className={`${themeMode === 'light' ? 'bg-white' : 'bg-gray-600 text-white'} p-4 min-h-screen`} >
          <div className='w-full'>
            <div className="w-full max-w-sm mx-auto flex justify-end mb-4 ">
              <ThemeBtn />
            </div>
            <div className="w-full max-w-sm mx-auto ">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2" >ToDo List</h1>

              <div className="mb-4">
                {/* Todo form goes here */}
                <TodoForm />
              </div>

              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (
                <div key={todo.id}
                  className='w-full mb-3'
                >
                  <ToDoList todo={todo} />
                </div>))
              }
            </div>
          </div>
        </div>
      </ThemeProvider>
    </TodoProvider>
  )
}

export default App
