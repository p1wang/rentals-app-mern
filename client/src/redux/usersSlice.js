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
  async ({ id, update }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateUser(id, update);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "users/sendMessage",
  async ({ id, message }, { rejectWithValue }) => {
    try {
      const { data } = await api.sendMessage(id, message);
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
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.isLoading = false;
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
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },

    // updateUser
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.isLoading = false;
      state.user = action.payload;
    },

    // sendMessage
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateUser.fulfilled]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setUser, setLogout } = usersSlice.actions;

export default usersSlice.reducer;
