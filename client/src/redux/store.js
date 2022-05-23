import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./listingsSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    auth: authReducer,
  },
});
