import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TodoContext } from "../containers/TodoContextProvider";
import TodoItem from "./TodoItem";
import SEO from "../containers/seo";

const Todo = () => {
  // Context Variables
  const { userId } = useContext(TodoContext);

  // State Variables
  const [todoTasks, setTodoTasks] = useState([]);
  const [isLoadingTodoTasks, setIsLoadingTodoTasks] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post("/tasks/todo-tasks", { userId });
      // console.log(response.data.length);
      setIsLoadingTodoTasks(false);
      setTodoTasks(response.data);
    } catch (error) {
      setIsLoadingTodoTasks(true);
      console.log(`Failed to load Done tasks (${error.response.data.message})`);
    }
  }, [userId]);

  // NOTE: watchout for this function incase of misbehaving
  useEffect(() => {
    fetchData();
    // Resetting the value of loadindTodoTask to default
    return () => {
      setIsLoadingTodoTasks(true);
    };
  }, [fetchData]);
  return (
    <div className="p-5 w-full max-w-screen-lg mx-auto">
      <SEO title="Todo Tasks" description="Todo tasks" />
      {isLoadingTodoTasks ? (
        <div className="p-4 flex flex-col items-center justify-center">
          <h1>Loading todo tasks..</h1>
        </div>
      ) : todoTasks.length === 0 ? (
        <h1>No Todo tasks..</h1>
      ) : (
        todoTasks.map((task, index) => {
          return <TodoItem key={index} task={task} />;
        })
      )}
    </div>
  );
};

export default Todo;
