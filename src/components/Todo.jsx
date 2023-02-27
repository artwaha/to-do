import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../containers/TodoContextProvider'
import TodoItem from './TodoItem'

const Todo = () => {
  const { userId } = useContext(TodoContext)
  const [todoTasks, setTodoTasks] = useState([])
  const [isLoadingTodoTasks, setIsLoadingTodoTasks] = useState(true)

  useEffect(() => {
    const fetchData = async (params) => {
      try {
        const response = await axios.post('/tasks/todo-tasks', { userId })
        setIsLoadingTodoTasks(false)
        setTodoTasks(response.data)
      } catch (error) {
        setIsLoadingTodoTasks(true)
        console.log(error);
      }
    }
    fetchData()
  }, [userId])
  return (
    <div className='p-5 w-full max-w-screen-lg mx-auto'>
      {isLoadingTodoTasks ? <div className='p-4 flex flex-col items-center justify-center'>
        <h1>Loading..</h1>
      </div>
        : todoTasks.map((task, index) => {
          return <TodoItem key={index} task={task} />
        })
      }
    </div>
  )
}

export default Todo