import React, { createContext, useState } from "react";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  // const [userId, setUserId] = useState("63f7c47c595aab4eb016513o");
  const jwick = "63f866d159b75af7fa28231d";
  const jbourne = "63f844a3e4230b11711b97f4";
  const jbond = "63f7c47c595aab4eb0165136";
  const sholmes = "63f7c47c595aab4eb0165135";
  const ehunt = "643d3a951d4186c3866d9b16";

  const [userId, setUserId] = useState(sholmes);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("");

  const updateUserId = (id) => {
    setUserId(id);
  };

  const updateIsLoading = (state) => {
    setIsLoading(state);
  };

  const updateTitle = (newtitle) => {
    setTitle(newtitle);
  };

  const updateIsLoggedIn = (state) => {
    setIsLoggedIn(state);
  };

  const contextValues = {
    title,
    userId,
    isLoading,
    isLoggedIn,
    setIsLoggedIn,
    updateIsLoggedIn,
    updateUserId,
    updateIsLoading,
    updateTitle,
  };

  return (
    <TodoContext.Provider value={contextValues}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
