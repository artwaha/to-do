import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../containers/TodoContextProvider'
import TodoItem from './TodoItem'



const AllTodos = () => {
  const { userId, updateIsLoading } = useContext(TodoContext)

  const [allTasks, setAllTasks] = useState([])
  const [loadingAllTasks, setLoadingAllTasks] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/tasks', { userId })
        setLoadingAllTasks(false)
        setAllTasks(response.data)
      } catch (error) {
        setLoadingAllTasks(true)
        console.log(error);
      }
    }
    fetchData()
  }, [setAllTasks, updateIsLoading, userId])

  return (
    <div className='p-5 w-full max-w-screen-lg mx-auto'>
      {loadingAllTasks ? <div className='p-4 flex flex-col items-center justify-center'>
        <h1>Loading...</h1>
      </div>
        : allTasks.map((task, index) => {
          return <TodoItem key={index} task={task} />
        })
      }
    </div>
  )
}

export default AllTodos