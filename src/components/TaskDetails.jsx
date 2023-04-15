import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "../containers/TodoContextProvider";
import SEO from "../containers/seo";

const TaskDetails = () => {
  // Context Variable
  const { userId, updateIsLoading } = useContext(TodoContext);

  // React Router Variables
  let { taskId } = useParams();
  const navigate = useNavigate();

  // State Variables
  const [task, setTask] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [strikedThroughIndexes, setStrikedThroughIndexes] = useState([]);
  const [disabledIndexes, setDisabledIndexes] = useState([]);
  const [loadingTaskDetails, setloadingTaskDetails] = useState(true);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
    owner: userId,
    collaborators: [],
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/tasks/${taskId}`);
      // console.log("Response: ", response.data);
      //NOTE: populate updated task object with default data incase user chooses to edit but doesn't
      setUpdatedTask((prevState) => {
        return {
          ...prevState,
          isCompleted: response.data.isCompleted,
          title: response.data.title,
          description: response.data.description,
        };
      });

      setloadingTaskDetails(false);
      setTask(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(
        `Failed to load Task details (${error.response.data.message})`
      );
    }
  }, [taskId]);

  //API Call to Fetch Task Details
  useEffect(() => {
    fetchData();

    // NOTE: remove this function incase of misbehaving
    return () => {
      setloadingTaskDetails(true);
      setTask({});
      setUpdatedTask({
        title: "",
        description: "",
        isCompleted: false,
        owner: userId,
        collaborators: [],
      });
    };
  }, [fetchData, userId]);

  // // API call to Save edited Task
  const handleSave = async () => {
    // console.log("Task: ", task);
    console.log("updated task: ", updatedTask);
    try {
      if (
        task.title === updatedTask.title &&
        task.description === updatedTask.description &&
        task.isCompleted === updatedTask.isCompleted &&
        task.owner === updatedTask.owner &&
        !updatedTask.collaborators.length
      ) {
        // The two state variables have the same contents.
        alert("Nothing changed");
        setEditMode(false);
        setShowEditButton(true);
      } else {
        // The two state variables have different contents.
        // to trigger dashboard refresh we update isLoading
        // to trigger dashboard refresh we update isLoading
        updateIsLoading(true);
        setloadingTaskDetails(true);
        const response = await axios.patch(`/tasks/${taskId}`, updatedTask);
        if (response.status === 200) {
          // Update
          fetchData();
          setEditMode(false);
          setShowEditButton(true);
          updateIsLoading(false);
        }
      }
    } catch (error) {
      alert(`Unable to Save (${error.response.data.message})`);
    }
  };
  // API Call to delete Task
  const handleDelete = async (e) => {
    try {
      updateIsLoading(true);
      const response = await axios.delete(`/tasks/${taskId}`);
      if (response.status === 200) {
        updateIsLoading(false);
        navigate(`/`);
      }
    } catch (error) {
      alert(`Unable to delete task (${error.response.data.message})`);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask({
      ...updatedTask,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setShowEditButton(false);
    setEditMode(true);
  };

  const handleRemoveCollaborator = (index, collaborator) => {
    const isAlreadyStrikedThrough = strikedThroughIndexes.includes(index);
    if (isAlreadyStrikedThrough) {
      setStrikedThroughIndexes(
        strikedThroughIndexes.filter((i) => i !== index)
      );
      setDisabledIndexes(disabledIndexes.filter((i) => i !== index));
    } else {
      setStrikedThroughIndexes([...strikedThroughIndexes, index]);
      setDisabledIndexes([...disabledIndexes, index]);
    }

    setUpdatedTask({
      ...updatedTask,
      collaborators: [...itemsToDelete, collaborator.userId._id],
    });
    setItemsToDelete([...itemsToDelete, collaborator.userId._id]);
  };

  const handleUndo = (index, collaborator) => {
    setStrikedThroughIndexes(strikedThroughIndexes.filter((i) => i !== index));
    let items = itemsToDelete.filter((id) => id !== collaborator.userId._id);
    setUpdatedTask({ ...updatedTask, collaborators: items });
    setItemsToDelete(items);
    setDisabledIndexes(disabledIndexes.filter((i) => i !== index));
  };

  return (
    <div className="p-5 w-full max-w-screen-lg mx-auto">
      <SEO title="Task Details" description="Task Details" />
      {loadingTaskDetails ? (
        <div>
          <h1>Loading task details...</h1>
        </div>
      ) : (
        <>
          <div className="mb-2 p-2 flex">{actionButtons()}</div>
          {!editMode ? (
            <>
              {viewModeForm()} {collaboratorsForm()}
            </>
          ) : (
            editModeForm()
          )}
        </>
      )}
    </div>
  );

  // Extracted Components

  function collaboratorsForm() {
    return (
      <form className="flex flex-col mt-4">
        <h1 className=" text-xl">Invite Collaborators</h1>
        <ol className="ml-4">
          {task.usersToInvite.map((usr, index) => (
            <li key={index} className="flex items-center mb-2">
              <p>
                {`${index + 1}. `} {usr.name}
              </p>
              <button
                onClick={handleEdit}
                className="flex justify-center items-center text-white bg-[#121212] px-2 py-1 rounded-md ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span className="ml-1">Invite</span>
              </button>
            </li>
          ))}
        </ol>
      </form>
    );
  }

  function editModeForm() {
    return (
      <form className="flex flex-col border-b">
        <div className="flex items-center mt-2">
          <h2
            className={`${
              task.isCompleted ? "text-lg text-green-700" : "text-[#F44250]"
            } mr-2 font-sans`}
          >
            Title:
          </h2>
          <input
            type="text"
            name="title"
            className="ml-2 px-2 py-1 text-sm border border-gray-300 rounded-md w-full"
            onChange={handleInputChange}
            defaultValue={task.title}
          />
        </div>
        <div className="flex items-center mt-2">
          <h2
            className={`${
              task.isCompleted ? "text-lg text-green-700" : "text-[#F44250]"
            } mr-2 font-sans`}
          >
            Description:
          </h2>
          <input
            type="text"
            name="description"
            className="ml-2 px-2 py-1 text-sm border border-gray-300 rounded-md w-full"
            onChange={handleInputChange}
            defaultValue={task.description}
          />
        </div>
        <div className="flex items-center mt-2">
          <h2
            className={`${
              task.isCompleted ? "text-lg text-green-700" : "text-[#F44250]"
            } mr-2 font-sans`}
          >
            Status:
          </h2>
          <select
            className="ml-2 px-1 text-sm py-1 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            name="isCompleted"
            defaultValue={task.isCompleted}
          >
            <option value={true}>Done</option>
            <option value={false}>Pending</option>
          </select>
        </div>
        <h2
          className={`${
            task.isCompleted ? "text-lg text-green-700" : "text-[#F44250]"
          } mr-2 font-sans mt-2`}
        >
          Collaborators:
        </h2>
        <ol className="list-decimal list-inside ml-4">
          {task.collaborators.length ? (
            task.collaborators.map((collaborator, index) => {
              return (
                <li key={index} className="flex items-center mt-2 py-1">
                  {/* NOTE: Text */}
                  <h3
                    className={
                      strikedThroughIndexes.includes(index)
                        ? "line-through"
                        : ""
                    }
                  >
                    {collaborator.userId.name} | {collaborator.invitationStatus}
                  </h3>
                  {/* NOTE: icons */}
                  {!disabledIndexes.includes(index) && (
                    <button
                      className="text-white bg-[#F44250] rounded-md ml-3 p-1"
                      onClick={() => {
                        handleRemoveCollaborator(index, collaborator);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                  {strikedThroughIndexes.includes(index) && (
                    <button
                      onClick={() => {
                        handleUndo(index, collaborator);
                      }}
                      className="text-white bg-[#F44250] rounded-md ml-3 p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                        />
                      </svg>
                    </button>
                  )}
                </li>
              );
            })
          ) : (
            <h1>No Collaborators for this task!</h1>
          )}
        </ol>
      </form>
    );
  }

  function viewModeForm() {
    return (
      <form className="border-b">
        <h1>
          <span
            className={`${
              task.isCompleted ? "text-lg text-green-700" : "text-[#F44250]"
            } mr-2 font-sans`}
          >
            Title:{" "}
          </span>
          <span className="font-light mb-2">{task.title}</span>
        </h1>
        <h2 className="mr-3">
          <span
            className={`${
              task.isCompleted ? "text-lg text-green-700" : "text-[#F44250]"
            } mr-2 font-sans`}
          >
            Description:
          </span>
          <span>{task.description}</span>
        </h2>
        <h2>
          <span
            className={`${
              task.isCompleted ? "text-lg text-green-700" : "text-[#F44250]"
            } mr-2 font-sans`}
          >
            Status:
          </span>
          <span>{task.isCompleted ? "Done" : "Pending"}</span>
        </h2>
        <h2
          className={`${
            task.isCompleted ? "text-lg text-green-700" : "text-[#F44250]"
          } mr-2 font-sans`}
        >
          Collaborators:
        </h2>
        <ol className="list-decimal list-inside ml-4">
          {task.collaborators.length ? (
            task.collaborators.map((collaborator, index) => (
              <li className="py-1" key={index}>
                {collaborator.userId.name} (
                <span
                  className={`${
                    collaborator.invitationStatus === "accepted"
                      ? "text-violet-700"
                      : "text-orange-700"
                  }`}
                >
                  {collaborator.invitationStatus})
                </span>
              </li>
            ))
          ) : (
            <h1>No Collaborators for this task!</h1>
          )}
        </ol>
      </form>
    );
  }

  function actionButtons() {
    return (
      <div className="ml-auto flex items-center justify-center">
        <button
          className="flex justify-center items-center text-white bg-[#121212] px-2 py-1 rounded-md ml-2"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1">delete</span>
        </button>

        {/* NOTE: show edit button */}
        {showEditButton && (
          <button
            onClick={handleEdit}
            className="flex justify-center items-center text-white bg-[#121212] px-2 py-1 rounded-md ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <span className="ml-1">edit</span>
          </button>
        )}

        {/* NOTE: show this button (save) when edit button is disabled by state variable*/}
        {!showEditButton && (
          <button
            onClick={handleSave}
            className="flex justify-center items-center text-white bg-[#121212] px-2 py-1 rounded-md ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span className="ml-1">save</span>
          </button>
        )}
      </div>
    );
  }
};

export default TaskDetails;
