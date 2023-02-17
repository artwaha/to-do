import React from 'react'
import TodoItem from './TodoItem'

const Todo = () => {
  return (
    <div className='p-5 w-full max-w-screen-lg mx-auto'>
      <TodoItem taskText="Task 7" />
      <TodoItem taskText="Task 8" />
      <TodoItem taskText="Task 9" />
      <TodoItem taskText="Task 10" />
    </div>
  )
}

export default Todo