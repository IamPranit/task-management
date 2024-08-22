import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";

export default configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    users: userReducer,
  },
});
