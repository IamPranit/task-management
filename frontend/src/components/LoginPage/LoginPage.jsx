import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { emailValidation } from "../../utils/validations";
import { Button, ErrMsg } from "../atoms";
import classes from "./LoginPage.module.scss";
import { useDispatch } from "react-redux";
import { authLogin } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formValidationSchema = Yup.object({
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
      const authResultAction = await dispatch(authLogin(values));
      const originalAuthResult = await unwrapResult(authResultAction);
      console.log("authRes", originalAuthResult);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className={classes.loginPage}>
      <div className={classes.loginPage__formContainer}>
        <h1 className={classes.formContainer__title}>Login</h1>
        <form
          className={classes.formContainer__loginForm}
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <Button className={classes.submitBtn}>Login</Button>
          <p className={classes.loginForm__registerContainer}>
            Not registered? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
