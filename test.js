import { createContext, useState } from "react";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [loggedInUser, setloggedInUser] = useState({
    userId: "",
    name: "",
    username: "",
    email: "",
  });

  const contextValues = {
    loggedInUser,
    setloggedInUser,
  };

  return (
    <TodoContext.Provider value={contextValues}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
