import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../containers/TodoContextProvider";

const TasksDashboard = () => {
  // Context Variables
  const { userId, isLoading, updateIsLoading } = useContext(TodoContext);

  // React router Variables
  const navigate = useNavigate();

  // State Variables
  const [done, setDone] = useState(0);
  const [todo, setTodo] = useState(0);
  const [allTasks, setAllTasks] = useState(0);
  const [invitations, setInvitations] = useState(0);
  const [collaborating, setCollaborating] = useState(0);
  const [taskTitle, setTaskTitle] = useState("");

  // Fetch Dashboard Data from REST API
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post("/tasks/count-tasks", { userId });
      setAllTasks(response.data.tasks);
      setDone(response.data.done);
      setTodo(response.data.todo);
      setCollaborating(response.data.collaborating);
      setInvitations(response.data.invitations);
      updateIsLoading(false);
      // console.log("Success");
    } catch (error) {
      updateIsLoading(true);
      // TODO:Redirect to 404 Page
      alert(`Error: Can't load data (${error.response.data.message})`);
    }
  }, [updateIsLoading, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    try {
      // NOTE: If you're navigating to another page, include this below function
      e.preventDefault();
      // on slow connections, to show that the updates are loading
      //NOTE: Fetch will updateIsLoading(false) when it finishes executing. Here making sure isLoading is true before API call
      updateIsLoading(true);
      const response = await axios.post("/tasks/new-task", {
        owner: userId,
        title: taskTitle,
      });
      // Refresh the dashboard
      fetchData();
      navigate(`/tasks/${response.data._id}`);
    } catch (error) {
      alert(
        `Task Dashboard Unable to Add new Task (${error.response.data.message})`
      );
    }
  };

  return (
    <div className="p-4 w-full max-w-screen-lg mx-auto border-b border-gray-500">
      {isLoading ? (
        <div className="p-4 flex flex-col items-center justify-center">
          <h1>Refreshing Tasks Dashboard...</h1>
        </div>
      ) : (
        <>
          <div className="p-4 grid gap-7 lg:grid-cols-3">
            <div className="py-3 bg-[#121212] rounded shadow-sm text-center">
              <h2 className="text-lg text-[#D83BD2]">All Tasks</h2>
              <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">
                {allTasks}
              </h1>
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
          <div className="p-4 grid gap-7 lg:grid-cols-2">
            <div className="py-3 bg-[#121212] rounded shadow-sm text-center">
              <h2 className="text-lg text-[#FFE545]">Collaborating</h2>
              <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">
                {collaborating}
              </h1>
            </div>
            <div className="py-3 bg-[#121212] rounded shadow-sm text-center">
              <h2 className="text-lg text-[#2290F5]">Invitations</h2>
              <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">
                {invitations}
              </h1>
            </div>
          </div>
          <form
            className="p-4 mt-6 flex justify-center"
            onSubmit={handleSubmit}
          >
            <input
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              placeholder="type to add new task..."
              className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />

            <button
              type="submit"
              className="px-3 ml-4 p-2 text-[#E1E1E1] bg-[#121212] rounded-md focus:bg-[#121212] focus:outline-none"
            >
              Add Task
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default TasksDashboard;
