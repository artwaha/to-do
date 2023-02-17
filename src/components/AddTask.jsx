import React, { useState } from 'react'

const AddTask = () => {

    const [taskTest, setTaskTest] = useState("")

    return (
        <div className='p-5 w-full max-w-screen-lg mx-auto'>

            <div className='p-4 grid gap-7 lg:grid-cols-3'>
                <div className="py-3 border bg-[#121212] rounded shadow-sm text-center">
                    <h2 className="text-lg text-[#D83BD2]">All Tasks</h2>
                    <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">12</h1>
                </div>
                <div className="py-3 border bg-[#121212] rounded shadow-sm text-center">
                    <h2 className="text-lg text-[#6AD767]">Done</h2>
                    <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">7</h1>
                </div>
                <div className="py-3 border bg-[#121212] rounded shadow-sm text-center">
                    <h2 className="text-lg text-[#F44250]">Todo</h2>
                    <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">5</h1>
                </div>
            </div>

            <form className='p-4 mt-6 flex justify-center' action="" onSubmit={(e) => { e.preventDefault(); console.log(taskTest); }}>
                <input
                    onChange={(e) => { setTaskTest(e.target.value) }}
                    type="text"
                    placeholder="type to add new task..."
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />

                <button type="submit" className="px-3 ml-4 p-2 text-[#E1E1E1] bg-[#121212] rounded-md focus:bg-[#121212] focus:outline-none">Add Task</button>
            </form>
        </div>
    )
}

export default AddTask