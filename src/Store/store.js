import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./Reduxthunk";
import {userReducer} from "./slice/UserSlice";

export const store = configureStore({
  reducer: {
    thunk: counterReducer,
    user: userReducer
  },
});
