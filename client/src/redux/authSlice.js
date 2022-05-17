import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

// actions
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ formData, navigate }) => {
    const response = await api.signUp(formData);
    navigate("/");
    console.log(response.data);
    return response.data;
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ formData, navigate }) => {
    const response = await api.signIn(formData);
    navigate("/");
    console.log(response.data);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  // initial state
  initialState: {
    user: null,
    status: "idle",
  },
  // reducer object
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    // signup
    [signUp.pending]: (state) => {
      state.status = "pending";
    },
    [signUp.rejected]: (state) => {
      state.status = "rejected";
    },
    [signUp.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    },
    //signin
    [signIn.pending]: (state) => {
      state.status = "pending";
    },
    [signIn.rejected]: (state) => {
      state.status = "rejected";
    },
    [signIn.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
