import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../api-client/axios";

export const createUser = createAsyncThunk(
  "user",
  async (data, { rejectWithValue }) => {
    try {
      const payload = data;
      const response = await apiClient.post("/users", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.data = null;
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export default userSlice.reducer;
