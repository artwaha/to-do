import React, { createContext, useState } from 'react'

export const TodoContext = createContext()

const TodoContextProvider = ({ children }) => {

    const [userId, setUserId] = useState("63f7c47c595aab4eb0165135")
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const updateUserId = (id) => {
        setUserId(id)
    }

    const updateTasks = (newTasks) => {
        setTasks(newTasks)
    }

    const updateIsLoading = (state) => {
        setIsLoading(state)
    }

    const contextValues = {
        userId,
        tasks,
        isLoading,
        updateUserId,
        updateTasks,
        updateIsLoading
    }

    return (
        <TodoContext.Provider value={contextValues} >
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider