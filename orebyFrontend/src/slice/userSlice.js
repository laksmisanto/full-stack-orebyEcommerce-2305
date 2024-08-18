import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoginInfo } = userSlice.actions;

export default userSlice.reducer;
