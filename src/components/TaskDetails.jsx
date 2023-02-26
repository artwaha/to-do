import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
    let { taskId } = useParams();
    const [task, setTask] = useState({})
    const [edit, setEdit] = useState(false)
    const [showEdit, setShowEdit] = useState(true)
    const [itemsToDelete, setItemsToDelete] = useState([]);
    const [strikedThroughIndexes, setStrikedThroughIndexes] = useState([]);
    const [disabledIndexes, setDisabledIndexes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/tasks/${taskId}`)
                setTask(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [taskId])

    const refresh = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/tasks/${taskId}`)
            setTask(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = () => {
        setShowEdit(false);
        setEdit(true);
        console.log(itemsToDelete);
    }

    const handleSave = () => {
        refresh();
        setEdit(false);
        setShowEdit(true)
    }

    const handleRemoveCollaborator = (index, collaborator) => {
        const isAlreadyStrikedThrough = strikedThroughIndexes.includes(index);
        if (isAlreadyStrikedThrough) {
            setStrikedThroughIndexes(strikedThroughIndexes.filter(i => i !== index));
            setDisabledIndexes(disabledIndexes.filter(i => i !== index));
        } else {
            setStrikedThroughIndexes([...strikedThroughIndexes, index]);
            setDisabledIndexes([...disabledIndexes, index]);
        }
        setItemsToDelete([...itemsToDelete, collaborator._id]);
    }

    const handleUndo = (index, collaborator) => {
        setStrikedThroughIndexes(strikedThroughIndexes.filter(i => i !== index));
        setItemsToDelete(itemsToDelete.filter(id => id !== collaborator._id));
        setDisabledIndexes(disabledIndexes.filter(i => i !== index));
    }

    return (
        <div className='p-5 w-full max-w-screen-lg mx-auto'>
            {
                Object.keys(task).length === 0
                    ? <div>
                        <h1>Loading...</h1>
                        <button className='px-3 py-2 text-white bg-[#121212] rounded-md' onClick={refresh}>Refresh</button>
                    </div>
                    : <>
                        <div className='border-b border-gray-500 mb-2 p-2 flex'>
                            <div className='ml-auto flex items-center justify-center'>
                                {showEdit && <button onClick={handleEdit} className='flex justify-center items-center text-white bg-[#121212] px-2 py-1 rounded-md'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span className='ml-1'>edit</span>
                                </button>}
                                {
                                    !showEdit && <button onClick={handleSave} className='flex justify-center items-center text-white bg-[#121212] px-2 py-1 rounded-md ml-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <span className='ml-1'>save</span>
                                    </button>
                                }
                            </div>
                        </div>
                        {
                            !edit ?
                                <form >
                                    <h1 className='text-gray-600 text-3xl font-extrabold font-mono mb-3'>{task.title}</h1>
                                    <h2 className='mr-3'>{task.description}</h2>
                                    <h2>Status: <span>{task.isCompleted ? "Done" : "Pending"}</span></h2>
                                    <h2>Collaborators:</h2>
                                    <ul className="pl-2">
                                        {
                                            task.collaborators.map((collaborator, index) => <h3 key={index}>{collaborator.name}</h3>)
                                        }
                                    </ul>
                                </form>
                                : <form className='flex flex-col'>
                                    <div className='flex items-center mt-3'>
                                        <h2>Title:</h2>
                                        <input type="text" className='ml-2 px-2 py-1 text-sm border border-gray-300 rounded-md' onChange={e => console.log(e.target.value)} defaultValue={task.title} />
                                    </div>
                                    <div className='flex items-center mt-3'>
                                        <h2>Description:</h2>
                                        <input type="text" className='ml-2 px-2 py-1 text-sm border border-gray-300 rounded-md' onChange={e => console.log(e.target.value)} defaultValue={task.description} />
                                    </div>
                                    <div className='flex items-center mt-3'>
                                        <h2>Status:</h2>
                                        <select className='ml-2 px-1 text-sm py-1 border border-gray-300 rounded-md' onChange={e => console.log(e.target.value)} defaultValue={task.isCompleted.toString()}>
                                            <option value="true">Done</option>
                                            <option value="false">Pending</option>
                                        </select>
                                    </div>
                                    <h2 className='mt-3'>Collaborators:</h2>
                                    <ol className="pl-2">
                                        {
                                            task.collaborators.map((collaborator, index) => {
                                                return <div key={index} className='flex items-center mt-2'>
                                                    <h3 className={strikedThroughIndexes.includes(index) ? 'line-through' : ''}>{collaborator.name}</h3>
                                                    {!disabledIndexes.includes(index) && <button
                                                        // disabled={disabledIndexes.includes(index)}
                                                        className='text-white bg-[#F44250] rounded-md ml-3 p-1'
                                                        onClick={() => { handleRemoveCollaborator(index, collaborator) }} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>}
                                                    {strikedThroughIndexes.includes(index) && (
                                                        <button
                                                            onClick={() => { handleUndo(index, collaborator) }}
                                                            // className='text-[#F44250] bg-transparent rounded-md ml-3 p-1'
                                                            className='text-white bg-[#F44250] rounded-md ml-3 p-1'
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            })
                                        }
                                    </ol>
                                </form>
                        }

                    </>
            }
        </div >
    )
}

export default TaskDetails