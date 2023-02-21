import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    user: usersReducer,
  },
});

export default store;
