import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async ({ id }, { rejectWithValue }) => {
    console.log(id);
    try {
      const { data } = await api.getMessages(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ message }, { rejectWithValue }) => {
    console.log(message);
    try {
      const { data } = await api.sendMessage(message);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteMessage(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    isLoading: false,
  },
  extraReducers: {
    // getMessages
    [getMessages.pending]: (state) => {
      state.isLoading = true;
    },
    [getMessages.rejected]: (state) => {
      state.isLoading = false;
    },
    [getMessages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    },

    // sendMessage
    [sendMessage.pending]: (state) => {
      state.isLoading = true;
    },
    [sendMessage.rejected]: (state) => {
      state.isLoading = false;
    },
    [sendMessage.fulfilled]: (state) => {
      state.isLoading = false;
    },

    // deleteMessage
    [deleteMessage.pending]: (state) => {
      // state.isLoading = true;
    },
    [deleteMessage.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteMessage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messages = state.messages.filter(
        (message) => message._id !== action.payload
      );
    },
  },
});

export default messagesSlice.reducer;
