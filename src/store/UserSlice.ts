import { jane } from "@/data/users";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
