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
  async ({ searchQuery }) => {
    const { data } = await api.getListings(searchQuery);
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
  async ({ id, update }) => {
    const { data } = await api.updateListing(id, update);
    console.log(data);
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
    listing: null,
    listings: [],
    currentListing: null,
    totalPages: "",
    userListings: [],
    likedListings: [],
    alert: null,
    status: "idle",
  },
  reducers: {
    resetListingsState: (state) => {
      return {
        ...state,
        listing: null,
        currentListing: null,
        listings: [],
        totalPages: "",
        userListings: [],
        likedListings: [],
        alert: null,
        status: "idle",
      };
    },
    setCurrentListing: (state, action) => {
      return { ...state, currentListing: action.payload };
    },
  },

  extraReducers: {
    // createListing
    [createListing.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [createListing.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [createListing.fulfilled]: (state, action) => {
      return {
        ...state,
        status: "fulfilled",
        alert: { variant: "success", message: "Listing successfully created!" },
        listings: action.payload,
      };
    },
    // getListings
    [getListings.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [getListings.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [getListings.fulfilled]: (state, action) => {
      return {
        ...state,
        status: "fulfilled",
        listings: action.payload.listings,
        totalPages: action.payload.totalPages,
      };
    },
    // getListing
    [getListing.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [getListing.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [getListing.fulfilled]: (state, action) => {
      return { ...state, status: "fulfilled", listing: action.payload };
    },
    // deleteListing
    [deleteListing.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [deleteListing.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [deleteListing.fulfilled]: (state, action) => {
      return {
        ...state,
        status: "fulfilled",
        alert: { variant: "success", message: "Listing successfully deleted!" },
        listings: state.listings.filter(
          (listing) => listing._id !== action.payload
        ),
        userListings: state.userListings.filter(
          (listing) => listing._id !== action.payload
        ),
        likedListings: state.likedListings.filter(
          (listing) => listing._id !== action.payload
        ),
      };
    },
    // updateListing
    [updateListing.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [updateListing.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [updateListing.fulfilled]: (state, action) => {
      return {
        ...state,
        status: "fulfilled",
        alert: { variant: "success", message: "Listing successfully updated!" },
        listings: state.listings.map((listing) =>
          listing._id === action.payload._id ? action.payload : listing
        ),
      };
    },
    // likeListing
    [likeListing.pending]: (state) => {
      // return { ...state, status: "pending" };
    },
    [likeListing.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [likeListing.fulfilled]: (state, action) => {
      return {
        ...state,
        status: "fulfilled",
        listings: state.listings.map((listing) =>
          listing._id === action.payload._id ? action.payload : listing
        ),
        userListings: state.userListings.map((listing) =>
          listing._id === action.payload._id ? action.payload : listing
        ),
        likedListings: state.likedListings.filter(
          (listing) => listing._id !== action.payload._id
        ),
      };
    },

    // getListingsByUser
    [getListingsByUser.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [getListingsByUser.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [getListingsByUser.fulfilled]: (state, action) => {
      return { ...state, status: "fulfilled", userListings: action.payload };
    },

    // getLikedListings
    [getLikedListings.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [getLikedListings.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [getLikedListings.fulfilled]: (state, action) => {
      return { ...state, status: "fulfilled", likedListings: action.payload };
    },

    // getListingsByQuery
    [getListingsByQuery.pending]: (state) => {
      return { ...state, status: "pending" };
    },
    [getListingsByQuery.rejected]: (state) => {
      return { ...state, status: "rejected" };
    },
    [getListingsByQuery.fulfilled]: (state, action) => {
      return {
        ...state,
        status: "fulfilled",
        totalPages: action.payload.totalPages,
        listings: action.payload.limitedFilteredListings,
      };
    },
  },
});

export const { resetListingsState, setCurrentListing } = listingsSlice.actions;

export default listingsSlice.reducer;
