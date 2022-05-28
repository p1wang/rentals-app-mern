import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

// actions
export const createListing = createAsyncThunk(
  "listings/createListing",
  async ({ newListing }, { rejectWithValue }) => {
    console.log(newListing);
    try {
      const { data } = await api.createListing(newListing);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getListings = createAsyncThunk(
  "listings/getListings",
  async ({ searchQuery }, { rejectWithValue }) => {
    console.log(searchQuery);
    try {
      const { data } = await api.getListings(searchQuery);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getListing = createAsyncThunk(
  "listings/getListing",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.getListing(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteListing(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateListing = createAsyncThunk(
  "listings/updateListing",
  async ({ id, update }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateListing(id, update);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const likeListing = createAsyncThunk(
  "listings/likeListing",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.likeListing(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getListingsByUser = createAsyncThunk(
  "listings/getListingsByUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.getListingsByUser(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getLikedListings = createAsyncThunk(
  "listings/getLikedListings",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.getLikedListings(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getListingsByQuery = createAsyncThunk(
  "listings/getListingsByQuery",
  async ({ searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await api.getListingsByQuery(searchQuery);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    listing: null,
    listings: [],
    currentListing: null,
    totalPages: "",
    userListings: [],
    likedListings: [],
    isLoading: false,
  },
  reducers: {
    setCurrentListing: (state, action) => {
      state.currentListing = action.payload;
    },
  },

  extraReducers: {
    // createListing
    [createListing.pending]: (state) => {
      state.isLoading = true;
    },
    [createListing.rejected]: (state) => {
      state.isLoading = false;
    },
    [createListing.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listings = [...state.listings, action.payload];
    },
    // getListings
    [getListings.pending]: (state) => {
      state.isLoading = true;
    },
    [getListings.rejected]: (state) => {
      state.isLoading = false;
    },
    [getListings.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listings = action.payload.listings;
      state.totalPages = action.payload.totalPages;
    },
    // getListing
    [getListing.pending]: (state) => {
      state.isLoading = true;
    },
    [getListing.rejected]: (state) => {
      state.isLoading = false;
    },
    [getListing.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listing = action.payload;
    },

    // deleteListing
    [deleteListing.pending]: (state) => {
      // state.isLoading = true;
    },
    [deleteListing.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteListing.fulfilled]: (state, action) => {
      state.isLoading = false;
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
      state.isLoading = true;
    },
    [updateListing.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateListing.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listings = state.listings.map((listing) =>
        listing._id === action.payload._id ? action.payload : listing
      );
      state.userListings = state.userListings.map((listing) =>
        listing._id === action.payload._id ? action.payload : listing
      );
      state.likedListings = state.likedListings.map((listing) =>
        listing._id === action.payload._id ? action.payload : listing
      );
    },
    // likeListing
    [likeListing.pending]: (state) => {
      // state.isLoading = true;
    },
    [likeListing.rejected]: (state) => {
      state.isLoading = false;
    },
    [likeListing.fulfilled]: (state, action) => {
      state.isLoading = false;
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
      state.isLoading = true;
    },
    [getListingsByUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [getListingsByUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userListings = action.payload;
    },

    // getLikedListings
    [getLikedListings.pending]: (state) => {
      state.isLoading = true;
    },
    [getLikedListings.rejected]: (state) => {
      state.isLoading = false;
    },
    [getLikedListings.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.likedListings = action.payload;
    },

    // getListingsByQuery
    [getListingsByQuery.pending]: (state) => {
      state.isLoading = true;
    },
    [getListingsByQuery.rejected]: (state) => {
      state.isLoading = false;
    },
    [getListingsByQuery.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalPages = action.payload.totalPages;
      state.listings = action.payload.limitedFilteredListings;
    },
  },
});

export const { setCurrentListing } = listingsSlice.actions;

export default listingsSlice.reducer;
