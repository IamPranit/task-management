import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../api-client/axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tasks?${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (data, { rejectWithValue }) => {
    try {
      const { id } = data || {};
      const response = await apiClient.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error("ERR", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTasks = createAsyncThunk(
  "tasks/updateTasks",
  async (data, { rejectWithValue }) => {
    try {
      const { title, category, _id } = data || {};
      const payload = {
        title,
        category,
      };
      const response = await apiClient.put(`/tasks/${_id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTasks = createAsyncThunk(
  "tasks/createTasks",
  async (data, { rejectWithValue }) => {
    try {
      const { title, category } = data || {};
      const payload = {
        title,
        category,
      };
      const response = await apiClient.post(`/tasks`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(updateTasks.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(updateTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(updateTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(createTasks.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(createTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export default taskSlice.reducer;
