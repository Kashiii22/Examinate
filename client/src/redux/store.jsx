import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
