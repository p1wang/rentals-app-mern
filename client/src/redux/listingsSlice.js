import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

// actions
export const createListing = createAsyncThunk(
  "listings/createListing",
  async ({ newListing }) => {
    const { data } = await api.createListing(newListing);
    return data;
  }
);

export const getListings = createAsyncThunk(
  "listings/getListings",
  async () => {
    const { data } = await api.getListings();
    return data;
  }
);

export const getListing = createAsyncThunk(
  "listings/getListings",
  async ({ id }) => {
    const { data } = await api.getListings(id);
    return data;
  }
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async ({ id }) => {
    const { data } = await api.deleteListing(id);
    console.log(data);
    return data;
  }
);

export const updateListing = createAsyncThunk(
  "listings/updateListing",
  async ({ id, updatedListing }) => {
    const { data } = await api.updateListing(id, updatedListing);
    console.log(`updated data ${data}`);
    return data;
  }
);

export const listingsSlice = createSlice({
  name: "listings",
  // initial state
  initialState: {
    listings: [],
    status: "idle",
  },
  // reducer object
  reducers: {},
  extraReducers: {
    // createListing
    [createListing.pending]: (state) => {
      state.status = "pending";
    },
    [createListing.rejected]: (state) => {
      state.status = "rejected";
    },
    [createListing.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.listings = [...state.listings, action.payload.data];
    },
    // getListings
    [getListings.pending]: (state) => {
      state.status = "pending";
    },
    [getListings.rejected]: (state) => {
      state.status = "rejected";
    },
    [getListings.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.listings = action.payload.data;
    },
    //getListing
    [getListing.pending]: (state) => {
      state.status = "pending";
    },
    [getListing.rejected]: (state) => {
      state.status = "rejected";
    },
    [getListing.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.listings = action.payload.data;
    },
    // deleteListing
    [deleteListing.pending]: (state) => {
      state.status = "pending";
    },
    [deleteListing.rejected]: (state) => {
      state.status = "rejected";
    },
    [deleteListing.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.listings = action.payload.data;
    },
    //updateListing
    [updateListing.pending]: (state) => {
      state.status = "pending";
    },
    [updateListing.rejected]: (state) => {
      state.status = "rejected";
    },
    [updateListing.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.listings = action.payload.data;
    },
  },
});

// export const {} = listingsSlice.actions;

export default listingsSlice.reducer;
