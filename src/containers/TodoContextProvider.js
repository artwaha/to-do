import React, { createContext, useState } from "react";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  // const [userId, setUserId] = useState("63f7c47c595aab4eb016513o");
  const jwick = "63f866d159b75af7fa28231d";
  const jbourne = "63f844a3e4230b11711b97f4";
  const jbond = "63f7c47c595aab4eb0165136";
  const sholmes = "63f7c47c595aab4eb0165135";
  const ehunt = "643d3a951d4186c3866d9b16";

  const [userId, setUserId] = useState(ehunt);
  const [isLoading, setIsLoading] = useState(true);

  const updateUserId = (id) => {
    setUserId(id);
  };

  const updateIsLoading = (state) => {
    setIsLoading(state);
    // setIsLoading((prevState) => state);
  };

  const contextValues = {
    userId,
    isLoading,
    updateUserId,
    updateIsLoading,
  };

  return (
    <TodoContext.Provider value={contextValues}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
