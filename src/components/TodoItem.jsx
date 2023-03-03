import React from 'react';
import { useNavigate } from 'react-router-dom';

const TodoItem = ({ task }) => {
    const navigate = useNavigate();

    const handleView = (e) => {
        e.preventDefault();
        navigate(`/tasks/${task._id}`)
    }

    const handleCheckBox = (e) => {
        console.log(e.target.checked);
    }

    return (
        <form action="" className='py-2 mb-2 px-4 flex justify-between items-center border border-gray-300 rounded-md'>
            <input onChange={handleCheckBox} type="checkbox" name="" id="" defaultChecked={task.isCompleted} />
            <p className='text-[#20232A] font-mono font-extrabold'>{task.title}</p>
            <div className='flex justify-center items-center'>
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