import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import { TodoContext } from "../containers/TodoContextProvider";

const TasksDashboard = () => {
  // Context Variables
  const { userId,loggedInUser, isLoading, updateIsLoading, updateTitle, title } =
    useContext(TodoContext);

  useEffect(() => {
    updateTitle("All Tasks");

    return () => {
      updateTitle("");
    };
  }, [updateTitle]);

  // React router Variables
  const navigate = useNavigate();
  const matches = useMatches();

  // State Variables
  const [done, setDone] = useState(0);
  const [todo, setTodo] = useState(0);
  const [allTasks, setAllTasks] = useState(0);
  const [invitations, setInvitations] = useState(0);
  const [collaborating, setCollaborating] = useState(0);
  const [taskTitle, setTaskTitle] = useState("");

  const getTitle = useCallback(() => {
    switch (matches[1].pathname) {
      case "/tasks/done":
        updateTitle("Done");
        break;
      case "/tasks/todo":
        updateTitle("Todo");
        break;
      case "/tasks/invitations":
        updateTitle("Invitations");
        break;
      case "/tasks/collaborating":
        updateTitle("Collaborating");
        break;
      case "/tasks/":
        updateTitle("All Tasks");
        break;

      default:
        updateTitle("Task Details");
        break;
    }
  }, [matches, updateTitle]);

  // To Update Title
  useEffect(() => {
    getTitle();
  }, [getTitle]);

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
      console.log("User: ", loggedInUser);
    } catch (error) {
      alert(
        `Task Dashboard Unable to Add new Task (${error.response.data.message})`
      );
    }
  };

  const handleNavigate = (route) => {
    switch (route) {
      case "done":
        navigate("/tasks/done");
        break;
      case "todo":
        navigate("/tasks/todo");
        break;
      case "collaborating":
        navigate("/tasks/collaborating");
        break;
      case "invitations":
        navigate("/tasks/invitations");
        break;
      default:
        navigate("/tasks");
        break;
    }
  };

  return (
    <div className="p-4 pb-1 w-full max-w-screen-lg mx-auto border-b border-gray-100">
      {isLoading ? (
        <div className="p-4 flex flex-col items-center justify-center">
          <h1>Refreshing Tasks Dashboard...</h1>
        </div>
      ) : (
        <>
          <div className="p-4 grid gap-7 lg:grid-cols-3">
            <div
              onClick={() => handleNavigate("/")}
              className="py-3 bg-[#121212] rounded shadow-sm text-center cursor-pointer hover:scale-105 ease-in duration-300"
            >
              <h2 className="text-lg text-[#D83BD2]">All Tasks</h2>
              <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">
                {allTasks}
              </h1>
            </div>
            <div
              onClick={() => handleNavigate("done")}
              className="py-3 bg-[#121212] rounded shadow-sm text-center cursor-pointer hover:scale-105 ease-in duration-300"
            >
              <h2 className="text-lg text-[#6AD767]">Done</h2>
              <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">{done}</h1>
            </div>
            <div
              onClick={() => handleNavigate("todo")}
              className="py-3 bg-[#121212] rounded shadow-sm text-center cursor-pointer hover:scale-105 ease-in duration-300"
            >
              <h2 className="text-lg text-[#F44250]">Todo</h2>
              <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">{todo}</h1>
            </div>
          </div>
          <div className="p-4 grid gap-7 lg:grid-cols-2">
            <div
              onClick={() => handleNavigate("collaborating")}
              className="py-3 bg-[#121212] rounded shadow-sm text-center cursor-pointer hover:scale-105 ease-in duration-300"
            >
              <h2 className="text-lg text-[#FFE545]">Collaborating</h2>
              <h1 className="text-3xl font-bold text-[#E1E1E1] pt-1">
                {collaborating}
              </h1>
            </div>
            <div
              onClick={() => handleNavigate("invitations")}
              className="py-3 bg-[#121212] rounded shadow-sm text-center cursor-pointer hover:scale-105 ease-in duration-300"
            >
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
          <h1 className="text-xl font-bold font-sans text-cyan-800">{title}</h1>
        </>
      )}
    </div>
  );
};

export default TasksDashboard;
