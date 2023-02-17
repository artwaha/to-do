import React from 'react'
import TodoItem from './TodoItem'

const AllTodos = () => {
  return (
    <div className='p-5 w-full max-w-screen-lg mx-auto'>
      <TodoItem taskText="Task 1" />
      <TodoItem taskText="Task 2" />
      <TodoItem taskText="Task 3" />
    </div>
  )
}

export default AllTodos