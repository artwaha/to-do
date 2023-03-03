import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../containers/TodoContextProvider'

const TasksDashboard = () => {
    const { userId, isLoading, updateIsLoading } = useContext(TodoContext)
    const [done, setDone] = useState(0)
    const [todo, setTodo] = useState(0)
    const [allTasks, setAllTasks] = useState(0)
    const [taskTitle, setTaskTitle] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/tasks/count-tasks', { userId })
                setAllTasks(response.data.tasks)
                setDone(response.data.done)
                setTodo(response.data.todo)
                updateIsLoading(false)
                console.log("Success");
            } catch (error) {
                console.log(error);
                updateIsLoading(true)
                console.log("is Loading(Failure): ", "isLoading");
            }
        }
        fetchData();
    }, [updateIsLoading, userId, isLoading])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/tasks/new-task', {
                "owner": userId,
                "title": taskTitle,
            });
            updateIsLoading(true)
        } catch (error) {
            console.log(error);
            // updateIsLoading(false)
        }
    }

    return (
        <div className='p-4 w-full max-w-screen-lg mx-auto border-b border-gray-500'>
            {
                isLoading ? <div className='p-4 flex flex-col items-center justify-center'>
                    <h1>Loading...</h1>
                </div>
                    : <>
                        <div className='p-4 grid gap-7 lg:grid-cols-3'>
                            <div className="py-3 bg-[#121212] rounded shadow-sm text-center">
                                <h2 className="text-lg text-[#D83BD2]">All Tasks</h2>
                                <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">{allTasks}</h1>
                            </div>
                            <div className="py-3 bg-[#121212] rounded shadow-sm text-center">
                                <h2 className="text-lg text-[#6AD767]">Done</h2>
                                <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">{done}</h1>
                            </div>
                            <div className="py-3 bg-[#121212] rounded shadow-sm text-center">
                                <h2 className="text-lg text-[#F44250]">Todo</h2>
                                <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">{todo}</h1>
                            </div>
                        </div>
                        <form className='p-4 mt-6 flex justify-center' action="" onSubmit={handleSubmit}>
                            <input
                                onChange={(e) => setTaskTitle(e.target.value)}
                                type="text"
                                placeholder="type to add new task..."
                                className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                            />

                            <button type="submit" className="px-3 ml-4 p-2 text-[#E1E1E1] bg-[#121212] rounded-md focus:bg-[#121212] focus:outline-none">Add Task</button>
                        </form>
                    </>
            }


        </div>
    )
}

export default TasksDashboard