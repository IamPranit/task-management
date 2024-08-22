import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../features/tasks/taskSlice";
import { CustomModal, SearchContainer, Task } from "../atoms";
import classes from "./TasksPage.module.scss";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import TaskForm from "../TaskForm/TaskForm";
import { useSearchParams } from "react-router-dom";

const cookies = new Cookies();
const TasksPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const tasksState = useSelector((state) => state.tasks);
  const { data: tasks, status: taskStatus } = tasksState;
  console.log("taskList::", tasksState);

  const handleModal = (evnt) => {
    evnt?.stopPropagation();
    setIsModalOpen((prevState) => !prevState);
  };

  const onEdit = async (task) => {
    try {
      setSelectedTask(task);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const onDelete = async (id) => {
    try {
      const taskResultAction = await dispatch(deleteTask({ id }));
      const originalTaskResult = await unwrapResult(taskResultAction);
      console.log("originalTaskResult", originalTaskResult);
      dispatch(fetchTasks());
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Fetch the authentication cookie
    const userAuth = cookies.get("userAuth");
    // If the authentication cookie does not exist, mark the user as logged out
    if (!userAuth) {
      navigate("/login");
      return;
    }
    dispatch(fetchTasks(searchParams));
  }, [searchParams, dispatch, navigate]);

  if (taskStatus === "pending") {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.TasksPage}>
      <SearchContainer />
      {Array.isArray(tasks) &&
        tasks.map((task) => (
          <Task
            title={task.title}
            category={task.category}
            key={task._id}
            onDelete={() => onDelete(task._id)}
            onEdit={() => onEdit(task)}
          />
        ))}
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={handleModal}
        id={classes.TasksPage__Modal}
        testId={classes.TasksPage__Modal}
      >
        <TaskForm
          handleSubmit={onEdit}
          values={selectedTask}
          afterSubmit={handleModal}
        />
      </CustomModal>
    </div>
  );
};

export default TasksPage;
