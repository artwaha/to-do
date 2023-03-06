import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { TodoContext } from '../containers/TodoContextProvider'
import TodoItem from './TodoItem'

const AllTodos = () => {
  const { userId } = useContext(TodoContext)
  const [allTasks, setAllTasks] = useState([])
  const [loadingAllTasks, setLoadingAllTasks] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post('/tasks', { userId });
      setLoadingAllTasks(false);
      setAllTasks(response.data);
      console.log("AllTodos Comp: Success");
    } catch (error) {
      alert(`${error.response.data.message}- Failed to load All tasks`)
      // console.log(error);
      console.log("AllTodos Comp: Failure");
    }
  }, [userId]);


  useEffect(() => {
    fetchData()
  }, [fetchData])


  return (
    <div className='p-5 w-full max-w-screen-lg mx-auto'>
      {loadingAllTasks ? <div className='p-4 flex flex-col items-center justify-center'>
        <h1>Loading all tasks...</h1>
      </div>
        : allTasks.map((task, index) => {
          return <TodoItem key={index} task={task} />
        })
      }
    </div>
  )
}

export default AllTodos