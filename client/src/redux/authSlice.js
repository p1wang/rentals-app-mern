import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

// actions
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ formData, navigate }) => {
    const { data } = await api.signUp(formData);
    navigate("/");
    return data;
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ formData, navigate }) => {
    const { data } = await api.signIn(formData);
    navigate("/");
    return data;
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, update }) => {
    const { data } = await api.updateUser(id, update);

    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  // initial state
  initialState: {
    user: null,
    alert: null,
    status: "idle",
  },
  // reducer object
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },
    setLogout: (state) => {
      localStorage.clear();
      return { ...state, user: null, status: "idle" };
    },
  },
  extraReducers: {
    // signup
    [signUp.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [signUp.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [signUp.fulfilled]: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return {
        ...state,
        status: "fulfilled",
        user: action.payload,
        alert: { variant: "success", message: "Welcome!" },
      };
    },

    //signin
    [signIn.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [signIn.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [signIn.fulfilled]: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return {
        ...state,
        status: "fulfilled",
        user: action.payload,
        alert: { variant: "success", message: "Welcome" },
      };
    },

    // updateUser
    [updateUser.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [updateUser.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [updateUser.fulfilled]: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        status: "fulfilled",
        user: action.payload,
        alert: { variant: "success", message: "Profile successfully updated!" },
      };
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
