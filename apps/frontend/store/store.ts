import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/userSlice";
import usersReducer from "@/store/usersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer
  },
});

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = {
  user: ReturnType<typeof userReducer>;
  users: ReturnType<typeof usersReducer>;
};
export type AppDispatch = typeof store.dispatch;
