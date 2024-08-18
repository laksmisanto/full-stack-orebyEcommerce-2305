import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./src/slice/userSlice";

export const store = configureStore({
  reducer: {
    userInfo: userSlice,
  },
});
