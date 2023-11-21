import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./Reduxthunk";

export const store = configureStore({
  reducer: {
    thunk: counterReducer,
  },
});
