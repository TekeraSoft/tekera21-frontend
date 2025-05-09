import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userInfo: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string[];
    image: string;
    memberSince: string;
  } | null;
}
const initialState: UserState = {
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
