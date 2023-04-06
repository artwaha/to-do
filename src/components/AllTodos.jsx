import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TodoContext } from "../containers/TodoContextProvider";
import TodoItem from "./TodoItem";

const AllTodos = () => {
  // Context Variables
  const { userId } = useContext(TodoContext);

  // State Variables
  const [allTasks, setAllTasks] = useState([]);
  const [loadingAllTasks, setLoadingAllTasks] = useState(true);

  // Fetch All Tasks
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post("/tasks", { userId });
      setLoadingAllTasks(false);
      setAllTasks(response.data);
    } catch (error) {
      console.log(`Failed to load All tasks (${error.response.data.message})`);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
    // NOTE: Watch for the behaviour of this return function if it wont misbehave
    // Making sure we reset the default state of Loading all tasks when the component unmounts
    return () => {
      setLoadingAllTasks(true);
    };
  }, [fetchData]);

  return (
    <div className="p-5 w-full max-w-screen-lg mx-auto">
      {loadingAllTasks ? (
        <div className="p-4 flex flex-col items-center justify-center">
          <h1>Loading all tasks...</h1>
        </div>
      ) : (
        allTasks.map((task, index) => {
          return <TodoItem key={index} task={task} />;
        })
      )}
    </div>
  );
};

export default AllTodos;
