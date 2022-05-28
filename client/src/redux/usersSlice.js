import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

// actions
export const signUp = createAsyncThunk(
  "users/signUp",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.signUp(formData);
      navigate("/");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "users/signIn",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.signIn(formData);
      navigate("/");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ update }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateUser(update);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
      state.isLoading = false;
    },
  },
  extraReducers: {
    // signup
    [signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [signUp.rejected]: (state) => {
      state.isLoading = false;
    },
    [signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },

    //signin
    [signIn.pending]: (state) => {
      state.isLoading = true;
    },
    [signIn.rejected]: (state) => {
      state.isLoading = false;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },

    // updateUser
    [updateUser.pending]: (state) => {
      // state.isLoading = true;
    },
    [updateUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
  },
});

export const { setUser, setLogout } = usersSlice.actions;

export default usersSlice.reducer;
