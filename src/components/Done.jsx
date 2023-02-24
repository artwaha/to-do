import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../containers/TodoContextProvider'
import TodoItem from './TodoItem'

const Done = () => {
  const { userId } = useContext(TodoContext)
  const [doneTasks, setDoneTasks] = useState([])

  useEffect(() => {
    const fetchData = async (params) => {
      try {
        const response = await axios.post('http://localhost:3001/tasks/done-tasks', { userId })
        setDoneTasks(response.data)
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
        doneTasks.map((task, index) => {
          return <TodoItem key={index} task={task} />
        })
      }
    </div>
  )
}

export default Done