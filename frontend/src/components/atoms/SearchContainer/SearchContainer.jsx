import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import classes from "./SearchContainer.module.scss";
import InputField from "../InputField/InputField";
import Button from "../button/button";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../../features/tasks/taskSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import TaskForm from "../../TaskForm/TaskForm";
import { useState } from "react";
import { CustomModal } from "..";
import { useSearchParams } from "react-router-dom";

const SearchContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const handleModal = (evnt) => {
    evnt?.stopPropagation();
    setIsModalOpen((prevState) => !prevState);
  };
  const onCreate = async () => {
    setIsModalOpen(true);
  };
  const initialValues = {
    title: "",
  };

  const form = useForm({
    values: initialValues,
  });
  const { handleSubmit } = form;

  const onSubmit = async (values) => {
    try {
      setSearchParams(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.searchContainer}>
      <form
        className={classes.searchContainer__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField type="text" placeholder="search" form={form} />
        <Button type="submit">Search</Button>
        <Button type="button" onClick={onCreate}>
          Create
        </Button>
      </form>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={handleModal}
        id={classes.TasksPage__Modal}
        testId={classes.TasksPage__Modal}
      >
        <TaskForm afterSubmit={handleModal} />
      </CustomModal>
    </div>
  );
};

export default SearchContainer;
