import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SellerCompanyInfo: null,
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
export const { setSellerCompany } = SellerCompany.actions;

export default SellerCompany.reducer;
