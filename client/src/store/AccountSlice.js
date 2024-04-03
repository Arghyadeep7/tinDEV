import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    email: "",
    password: "",
    loggedIn: false,
};

const AccountSlice = createSlice({
    name: "Account",
    initialState: initialState,
    reducers: {
        login(state, action) {            
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.loggedIn = true;
        },
        logout(state, action) {
            state._id = "";
            state.email = "";
            state.password = "";
            state.loggedIn = false;
        },
    },
});

export const { login, logout } = AccountSlice.actions;

export default AccountSlice.reducer;
