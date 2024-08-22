import Task from "../models/Task.js";

// @desc   Get all tasks
// @route  GET /api/v1/tasks
export const getTasks = async (req, res, next) => {
  try {
    const loggedInUserId = req.userConsumer._id.valueOf();
    const queryTitle = req.query.title;
    const queryCategory = req.query.category;

    let filter = { userId: loggedInUserId };
    if (queryTitle) {
      filter.title = { $regex: queryTitle, $options: "i" };
    }
    if (queryCategory) {
      filter.category = { $regex: queryCategory };
    }
    const tasks = await Task.find(filter);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error(error);
  }
};

// @desc   Get all tasks with query
// @route  GET /api/v1/tasks?title
export const getQueryFilteredTasks = async (req, res, next) => {
  try {
    const loggedInUserId = req.userConsumer._id.valueOf();
    const query = req.query.title;
    console.log("query", query);
    const tasks = await Task.find({
      userId: loggedInUserId,
      title: { $regex: query, $options: "i" },
    });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error(error);
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
export const getTask = async (req, res, next) => {
  try {
    const loggedInUserId = req.userConsumer._id.valueOf();
    const taskId = req.params.id;
    const task = await Task.find({ _id: taskId, userId: loggedInUserId });
    if (!task.length) {
      return res.status(404).json({
        success: false,
        data: task,
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);
  }
};

// @desc    Create new task
// @route   POST /api/v1/tasks
export const createTask = async (req, res, next) => {
  try {
    const loggedInUserId = req.userConsumer._id.valueOf();
    const { title, category } = req.body;

    const tasksPayload = {
      title,
      category,
      userId: loggedInUserId,
    };
    const task = await Task.create(tasksPayload);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const loggedInUserId = req.userConsumer._id.valueOf();
    const taskId = req.params.id;
    const { title, category } = req.body;
    const taskPayload = { title, category };
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: loggedInUserId },
      taskPayload,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      const err = {
        status: 404,
        message: `Resource not found with id of ${req.params.id}`,
      };
      return next(err);
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const loggedInUserId = req.userConsumer._id.valueOf();
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId: loggedInUserId,
    });
    if (!task) {
      const err = {
        status: 404,
        success: false,
        message: `Resource not found with id of ${req.params.id}`,
      };
      return next(err);
    }

    res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error(error);
  }
};
