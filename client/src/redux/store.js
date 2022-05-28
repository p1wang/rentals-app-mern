import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./listingsSlice";
import alertReducer from "./alertSlice";
import usersReducer from "./usersSlice";
import messagesReducer from "./messagesSlice";

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    users: usersReducer,
    alert: alertReducer,
    messages: messagesReducer,
  },
});
