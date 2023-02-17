import React from 'react'
import TodoItem from './TodoItem'

const Done = () => {
  return (
    <div className='p-5 w-full max-w-screen-lg mx-auto'>
      <TodoItem taskText="Task 4" />
      <TodoItem taskText="Task 5" />
      <TodoItem taskText="Task 6" />
    </div>
  )
}

export default Done