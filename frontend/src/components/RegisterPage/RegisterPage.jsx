import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailValidation } from "../../utils/validations";
import { apiClient } from "../../api-client/axios";
import { Button, ErrMsg } from "../atoms";
import classes from "./RegisterPage.module.scss";
import { createUser } from "../../features/users/userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formValidationSchema = Yup.object({
    firstName: Yup.string().trim().max(30).required("Please enter first name"),
    lastName: Yup.string().trim().max(30).required("Please enter last name"),
    email: Yup.string()
      .trim()
      .matches(emailValidation, "Please enter a valid email address")
      .max(255)
      .required("Please enter email"),
    password: Yup.string()
      .trim()
      .required("Please enter password")
      .min(8, "Please enter a valid password"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
      const userResultAction = await dispatch(createUser(values));
      const originalUserResult = await unwrapResult(userResultAction);
      console.log("authRes", originalUserResult);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.loginPage}>
      <div className={classes.loginPage__formContainer}>
        <h1 className={classes.formContainer__title}>Register</h1>
        <form
          className={classes.formContainer__loginForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.loginForm__inputContainer}>
            <input
              className={classes.loginForm__Input}
              type="text"
              placeholder="first name"
              {...register("firstName")}
            />
            {errors.firstName && <ErrMsg message={errors.firstName.message} />}
          </div>
          <div className={classes.loginForm__inputContainer}>
            <input
              className={classes.loginForm__Input}
              type="text"
              placeholder="last name"
              {...register("lastName")}
            />
            {errors.lastName && <ErrMsg message={errors.lastName.message} />}
          </div>
          <div className={classes.loginForm__inputContainer}>
            <input
              className={classes.loginForm__Input}
              type="text"
              placeholder="email"
              {...register("email")}
            />
            {errors.email && <ErrMsg message={errors.email.message} />}
          </div>
          <div className={classes.loginForm__inputContainer}>
            <input
              className={classes.loginForm__Input}
              type="password"
              placeholder="password"
              {...register("password")}
            />
            {errors.password && <ErrMsg message={errors.password.message} />}
          </div>
          <Button className={classes.submitBtn}>Register</Button>
          <p className={classes.loginForm__registerContainer}>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
