import { createSlice } from "@reduxjs/toolkit";
import { SellerCompanyProps } from "../../../types/CompanyTypes/CompanySliceTypes";

// Slice’ın genel durumu
export interface SellerCompanyState {
  SellerCompanyInfo: SellerCompanyProps | null;
  loading: boolean;
}

const initialState: SellerCompanyState = {
  SellerCompanyInfo: null,
  loading: true,
};

export const SellerCompany = createSlice({
  name: "SellerCompany",
  initialState,
  reducers: {
    setSellerCompany: (state, action) => {
      state.SellerCompanyInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSellerCompany, setLoading } = SellerCompany.actions;

export default SellerCompany.reducer;
