import { jane } from "@/data/users"; // sadece Jane'i al
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SellerUserInfo: jane,
};

export const SellerUserSlice = createSlice({
  name: "SellerUser",
  initialState,
  reducers: {
    setSellerUser: (state, action) => {
      state.SellerUserInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSellerUser } = SellerUserSlice.actions;

export default SellerUserSlice.reducer;
