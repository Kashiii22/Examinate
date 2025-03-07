import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode"; 

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    role: null,
    university:null
  };


  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        const { token } = action.payload;
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        state.user = decoded;
        state.token = token;
        state.Name=decoded.Name;
        state.email=decoded.email;
        state.role = decoded.role;
        state.university=decoded.university;
        state.passportPhoto=decoded.passportPhoto
      },
      logout: (state) => {
        localStorage.removeItem("token");
        state.user = null;
        state.token = null;
        state.role = null;
        state.university=null
      },
    },
  });
  
  export const { loginSuccess, logout } = authSlice.actions;
  export default authSlice.reducer;