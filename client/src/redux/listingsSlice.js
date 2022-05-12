import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

// actions
export const getListings = createAsyncThunk(
  // action type
  "listings/getListings",
  // making api call to mongodb
  async () => {
    const { data } = await api.fetchListings();
    console.log(data);
    return data;
  }
);

export const createListing = createAsyncThunk(
  "listings/createListing",
  async (newListing) => {
    const { data } = await api.createListing(newListing);
    console.log(data);
    return data;
  }
);

export const listingsSlice = createSlice({
  name: "listings",
  // initial state
  initialState: {
    listings: [],
    pending: null,
    error: false,
  },
  // reducer object
  reducers: {},
  extraReducers: {
    [getListings.pending]: (state) => {
      state.pending = true;
    },
    [getListings.fulfilled]: (state, action) => {
      state.pending = false;
      state.listings = action.payload.data;
      console.log(action.payload);
    },
  },
});

// export const {} = listingsSlice.actions;

export default listingsSlice.reducer;
