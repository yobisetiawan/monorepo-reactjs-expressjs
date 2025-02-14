import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
    uid: "",
    email: "",
    accessToken: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<User>>) => {
            state.accessToken = action.payload.accessToken ?? "";
        },
        logout: (state) => {
            state.accessToken = "";
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
