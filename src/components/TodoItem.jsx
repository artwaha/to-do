import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TodoItem = ({ task, index }) => {
  // Context variables
  const navigate = useNavigate();

  const handleView = (e) => {
    e.preventDefault();
    navigate(`/tasks/${task._id}`);
  };

  return (
    <form className="py-2 mb-2 px-4 flex justify-between items-center border border-gray-300 rounded-md">
      <p className="text-[#20232A] font-mono font-extrabold">{index}</p>
      <p className="text-[#20232A] font-mono font-extrabold">{task.title}</p>
      <div className="flex justify-center items-center">
        <button onClick={handleView}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 ml-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default TodoItem;

// className={`py-2 mb-2 px-4 flex justify-between items-center border border-gray-300 rounded-md ${
//   task.isCompleted ? "bg-[#6AD767]" : "bg-[#F44250]"
// }`}
