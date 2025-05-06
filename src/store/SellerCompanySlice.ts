import { jane } from "@/data/users"; // sadece Jane'i al
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SellerCompanyInfo: jane,
};

export const SellerCompany = createSlice({
  name: "SellerCompany",
  initialState,
  reducers: {
    setSellerCompany: (state, action) => {
      state.SellerCompanyInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = SellerCompany.actions;

export default SellerCompany.reducer;
