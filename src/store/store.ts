// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import userReducer  from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
