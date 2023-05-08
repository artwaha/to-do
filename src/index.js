import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/404";
import AllTodos from "./components/AllTodos";
import Done from "./components/Done";
import Todo from "./components/Todo";
import TaskDetails from "./components/TaskDetails";
import Collaborating from "./components/Collaborating";
import Invitations from "./components/Invitations";
import Login from "./components/Login";
import Register from "./components/Register";
import { Navigate } from "react-router-dom";
import TodoContextProvider from "./containers/TodoContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tasks",
    element: <App />,
    children: [
      {
        index: true,
        element: <AllTodos />,
      },
      {
        path: "done",
        element: <Done />,
      },
      {
        path: "todo",
        element: <Todo />,
      },
      {
        path: "collaborating",
        element: <Collaborating />,
      },
      {
        path: "invitations",
        element: <Invitations />,
      },
      {
        path: ":taskId",
        element: <TaskDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TodoContextProvider>
    <RouterProvider router={router} />
  </TodoContextProvider>
  // <React.StrictMode>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
