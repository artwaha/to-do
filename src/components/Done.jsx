import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TodoContext } from "../containers/TodoContextProvider";
import TodoItem from "./TodoItem";
import SEO from "../containers/seo";

const Done = () => {
  // Context Variables
  const { userId } = useContext(TodoContext);

  // State Variables
  const [doneTasks, setDoneTasks] = useState([]);
  const [loadingDoneTasks, setLoadingDoneTasks] = useState(true);

  // Fetch all Done Tasks
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post("/tasks/done-tasks", { userId });
      // console.log(response.data.length);
      setLoadingDoneTasks(false);
      setDoneTasks(response.data);
    } catch (error) {
      setLoadingDoneTasks(true);
      console.log(`Failed to load Done tasks (${error.response.data.message})`);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();

    // NOTE: incase of misbehaving, remove this function
    // reseting the default value of loadingDoneTasks when the component unmounts
    return () => {
      setLoadingDoneTasks(true);
    };
  }, [fetchData]);
  return (
    <div className="p-5 w-full max-w-screen-lg mx-auto">
      <SEO title="Done Tasks" description="Done Tasks" />
      {loadingDoneTasks ? (
        <div className="p-4 flex flex-col items-center justify-center">
          <h1>Loading done tasks...</h1>
        </div>
      ) : !doneTasks.length ? (
        <h1>No Done tasks..</h1>
      ) : (
        doneTasks.map((task, index) => {
          return <TodoItem key={index} task={task} index={index + 1} />;
        })
      )}
    </div>
  );
};

export default Done;
