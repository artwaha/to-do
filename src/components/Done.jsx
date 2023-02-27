import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../containers/TodoContextProvider'
import TodoItem from './TodoItem'

const Done = () => {
  const { userId } = useContext(TodoContext)
  const [doneTasks, setDoneTasks] = useState([])
  const [loadingDoneTasks, setLoadingDoneTasks] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/tasks/done-tasks', { userId })
        setLoadingDoneTasks(false)
        setDoneTasks(response.data)
      } catch (error) {
        setLoadingDoneTasks(true)
        console.log(error);
      }
    }
    fetchData()
  }, [userId])
  return (
    <div className='p-5 w-full max-w-screen-lg mx-auto'>
      {loadingDoneTasks ? <div className='p-4 flex flex-col items-center justify-center'>
        <h1>Loading...</h1>
      </div>
        : doneTasks.map((task, index) => {
          return <TodoItem key={index} task={task} />
        })
      }
    </div>
  )
}

export default Done