import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  loggedIn: false,
};

const LoginSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.email = action.payload.email;
      state.password = action.payload.password;

      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("password", action.payload.password);
    },
    logout(state, action) {
      state.loggedIn = false;
      state.email = "";
      state.password = "";

      localStorage.removeItem("email");
      localStorage.removeItem("password");
    },
  },
});

export const { login, logout } = LoginSlice.actions;

export default LoginSlice.reducer;
