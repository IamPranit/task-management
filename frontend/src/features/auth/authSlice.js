import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../api-client/axios";

export const authLogin = createAsyncThunk(
  "auth",
  async (data, { rejectWithValue }) => {
    try {
      const payload = data;
      const response = await apiClient.post("/auth/login", payload);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.status = "failed";
        state.data = null;
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export default authSlice.reducer;
