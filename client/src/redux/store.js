import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./listingsSlice";
import alertReducer from "./alertSlice";
import usersReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    users: usersReducer,
    alert: alertReducer,
  },
});
