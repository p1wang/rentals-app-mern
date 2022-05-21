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

// export const getListings = createAsyncThunk(
//   "listings/getListings",
//   async () => {
//     const { data } = await api.getListings();
//     return data;
//   }
// );

export const getListings = createAsyncThunk(
  "listings/getListings",
  async ({ searchQuery }) => {
    const { data } = await api.getListings(searchQuery);
    console.log(data);

    return data;
  }
);

export const getListing = createAsyncThunk(
  "listings/getListing",
  async ({ id }) => {
    const { data } = await api.getListing(id);
    return data;
  }
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async ({ id }) => {
    const { data } = await api.deleteListing(id);
    return data;
  }
);

export const updateListing = createAsyncThunk(
  "listings/updateListing",
  async ({ id, updatedListing }) => {
    const { data } = await api.updateListing(id, updatedListing);
    return data;
  }
);

export const likeListing = createAsyncThunk(
  "listings/likeListing",
  async ({ id }) => {
    const { data } = await api.likeListing(id);
    return data;
  }
);

export const getListingsByUser = createAsyncThunk(
  "listings/getListingsByUser",
  async ({ id }) => {
    const { data } = await api.getListingsByUser(id);
    return data;
  }
);

export const getLikedListings = createAsyncThunk(
  "listings/getLikedListings",
  async ({ id }) => {
    const { data } = await api.getLikedListings(id);
    return data;
  }
);

export const getListingsByQuery = createAsyncThunk(
  "listings/getListingsByQuery",
  async ({ searchQuery }) => {
    console.log(searchQuery);
    const { data } = await api.getListingsByQuery(searchQuery);
    return data;
  }
);

export const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    listing: {},
    listings: [],
    totalPages: "",
    userListings: [],
    likedListings: [],
    status: "idle",
    spinnerStatus: "idle",
  },
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
      state.listings = [...state.listings, action.payload];
    },
    // getListings
    [getListings.pending]: (state) => {
      state.status = "pending";
      state.spinnerStatus = "pending";
    },
    [getListings.rejected]: (state) => {
      state.status = "rejected";
    },
    [getListings.fulfilled]: (state, action) => {
      state.status = "fulfilled";

      state.listings = action.payload.listings;
      state.totalPages = action.payload.totalPages;
      state.spinnerStatus = "fulfilled";
    },
    // getListing
    [getListing.pending]: (state) => {
      state.status = "pending";
    },
    [getListing.rejected]: (state) => {
      state.status = "rejected";
    },
    [getListing.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.listing = action.payload;
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
      state.listings = state.listings.filter(
        (listing) => listing._id !== action.payload
      );
      state.userListings = state.userListings.filter(
        (listing) => listing._id !== action.payload
      );
      state.likedListings = state.likedListings.filter(
        (listing) => listing._id !== action.payload
      );
    },
    // updateListing
    [updateListing.pending]: (state) => {
      state.status = "pending";
    },
    [updateListing.rejected]: (state) => {
      state.status = "rejected";
    },
    [updateListing.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.listings = state.listings.map((listing) =>
        listing._id === action.payload._id ? action.payload : listing
      );
    },
    // likeListing
    [likeListing.pending]: (state) => {
      state.status = "pending";
    },
    [likeListing.rejected]: (state) => {
      state.status = "rejected";
    },
    [likeListing.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.listings = state.listings.map((listing) =>
        listing._id === action.payload._id ? action.payload : listing
      );
      state.userListings = state.userListings.map((listing) =>
        listing._id === action.payload._id ? action.payload : listing
      );
      state.likedListings = state.likedListings.filter(
        (listing) => listing._id !== action.payload._id
      );
    },

    // getListingsByUser
    [getListingsByUser.pending]: (state) => {
      state.status = "pending";
    },
    [getListingsByUser.rejected]: (state) => {
      state.status = "rejected";
    },
    [getListingsByUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.userListings = action.payload;
    },

    // getLikedListings
    [getLikedListings.pending]: (state) => {
      state.status = "pending";
    },
    [getLikedListings.rejected]: (state) => {
      state.status = "rejected";
    },
    [getLikedListings.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.likedListings = action.payload;
    },

    // getListingsByQuery

    [getListingsByQuery.pending]: (state) => {
      state.status = "pending";
    },
    [getListingsByQuery.rejected]: (state) => {
      state.status = "rejected";
    },
    [getListingsByQuery.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.totalPages = action.payload.totalPages;
      state.listings = action.payload.limitedFilteredListings;
    },
  },
});

export default listingsSlice.reducer;
