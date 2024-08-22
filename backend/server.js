import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./db/connectDb.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import auth from "./routes/auth.js";
import tasks from "./routes/tasks.js";
import users from "./routes/users.js";

// Connect Database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,X-Content-Type-Options"
//   // );
//   res.header("Access-Control-Allow-Headers", "content-type");
//   next();
// });

app.use(cookieParser());

// Logger middleware
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/users", users);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
