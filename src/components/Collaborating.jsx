import React, { useCallback, useState } from "react";
import SEO from "../containers/seo";
import axios from "axios";
import { useContext } from "react";
import { TodoContext } from "../containers/TodoContextProvider";
import { useEffect } from "react";
import TodoItem from "./TodoItem";

const Collaborating = () => {
  const { userId } = useContext(TodoContext);
  const [isLoadingCollaboratingTasks, setIsLoadingCollaboratingTasks] =
    useState(true);
  const [collaboratingTasks, setcollaboratingTasks] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post("/collaborators/collaborating-tasks", {
        userId,
      });

      const tasks = response.data.map((task) => task.taskId);
      setcollaboratingTasks(tasks);

      setIsLoadingCollaboratingTasks(false);
    } catch (error) {
      setIsLoadingCollaboratingTasks(true);
      console.log(`Failed to load Done tasks (${error.response.data.message})`);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
    return () => {
      setIsLoadingCollaboratingTasks(true);
    };
  }, [fetchData]);

  return (
    <div className="p-5 w-full max-w-screen-lg mx-auto">
      <SEO title="Collaborating Tasks" description="Collaborating Tasks" />
      {isLoadingCollaboratingTasks ? (
        <div className="p-4 flex flex-col items-center justify-center">
          <h1>Loading Collaborating tasks...</h1>
        </div>
      ) : !collaboratingTasks.length ? (
        <div className="p-4 flex flex-col items-center justify-center">
          <h1>You dont have any Collaborating Tasks...</h1>
        </div>
      ) : (
        collaboratingTasks.map((task, index) => (
          <TodoItem key={index} task={task} index={index + 1} />
        ))
      )}
    </div>
  );
};

export default Collaborating;
