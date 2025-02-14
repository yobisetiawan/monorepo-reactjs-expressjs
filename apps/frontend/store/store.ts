import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import usersReducer from "./usersSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
