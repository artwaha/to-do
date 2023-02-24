import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../containers/TodoContextProvider'
import TodoItem from './TodoItem'


const AllTodos = () => {
  const { userId } = useContext(TodoContext)

  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
    const fetchData = async (params) => {
      try {
        const response = await axios.post('http://localhost:3001/tasks', { userId })
        setAllTasks(response.data)
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [userId])


  return (
    <div className='p-5 w-full max-w-screen-lg mx-auto'>
      {
        allTasks.map((task, index) => {
          return <TodoItem key={index} task={task} />
        })
      }
    </div>
  )
}

export default AllTodos