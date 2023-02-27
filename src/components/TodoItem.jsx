import React from 'react';
import { useNavigate } from 'react-router-dom';



const TodoItem = ({ task }) => {
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault();
        alert("Delete");
    }

    const handleView = (e) => {
        e.preventDefault();
        navigate(`/tasks/${task._id}`)
    }

    const handleCheckBox = (e) => {
        console.log(e.target.checked);
    }

    return (
        <form action="" className='py-2 mb-2 px-4 flex justify-between items-center border border-gray-300 rounded-md'>
            <input onChange={handleCheckBox} type="checkbox" name="" id="" checked={task.isCompleted} />
            <p className='text-[#20232A] font-mono font-extrabold'>{task.title}</p>
            <div className='flex justify-center items-center'>
                <button onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                    </svg>
                </button>

                <button onClick={handleView}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </form>
    )
}

export default TodoItem