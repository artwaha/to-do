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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
        path: "tasks/:taskId",
        element: <TaskDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
  // <React.StrictMode>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
