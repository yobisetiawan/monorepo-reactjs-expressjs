import { UserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
    data: UserData[];
    isLoading: boolean;
}

const initialState: UsersState = {
    data: [],
    isLoading: false
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<Partial<UsersState>>) => {
            state.data = action.payload.data ?? [];
        },
        setUsersLoading: (state, action: PayloadAction<Partial<UsersState>>) => {
            state.isLoading = action.payload.isLoading ?? false;
        },

    },
});

export const { setUsers, setUsersLoading } = usersSlice.actions;
export default usersSlice.reducer;
