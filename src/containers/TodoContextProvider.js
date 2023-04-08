import React, { createContext, useState } from "react";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  // const [userId, setUserId] = useState("63f7c47c595aab4eb016513o");
  const [userId, setUserId] = useState("63f7c47c595aab4eb0165135");
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
