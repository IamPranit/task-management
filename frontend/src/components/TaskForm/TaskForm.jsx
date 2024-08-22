import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Button, ErrMsg } from "../atoms";
import classes from "./TaskForm.module.scss";
import {
  createTasks,
  fetchTasks,
  updateTasks,
} from "../../features/tasks/taskSlice";

const TaskForm = (props) => {
  const { afterSubmit } = props;
  const { title, category, _id } = props.values || {};
  console.log("props.values", props.values);
  const dispatch = useDispatch();

  const formValidationSchema = Yup.object({
    title: Yup.string().trim().required("Please enter title"),
    category: Yup.string().trim().required("Please enter category"),
  });
  const initialValues = {
    title,
    category,
  };

  const form = useForm({
    values: initialValues,
    resolver: yupResolver(formValidationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values) => {
    try {
      console.log("values", values);
      if (_id) {
        const taskResultAction = await dispatch(
          updateTasks({ _id, ...values })
        );
        const originalTaskResult = await unwrapResult(taskResultAction);
        console.log("originalTaskResult", originalTaskResult);
      } else {
        const taskResultAction = await dispatch(createTasks(values));
        const originalTaskResult = await unwrapResult(taskResultAction);
        console.log("originalTaskResult", originalTaskResult);
      }
      dispatch(fetchTasks());
      afterSubmit();
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  const formHeading = props.values ? "Edit" : "Create";
  return (
    <form
      className={classes.formContainer__editForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className={classes.editForm__title}>{formHeading} task</h3>
      <div className={classes.editForm__inputContainer}>
        <input
          className={classes.editForm__Input}
          type="text"
          placeholder="task"
          {...register("title")}
        />
        {errors.title && <ErrMsg message={errors.title.message} />}
      </div>
      <div className={classes.editForm__inputContainer}>
        <input
          className={classes.editForm__Input}
          type="text"
          placeholder="category"
          {...register("category")}
        />
        {errors.category && <ErrMsg message={errors.category.message} />}
      </div>
      <Button className={classes.submitBtn}>Submit</Button>
    </form>
  );
};

export default TaskForm;
