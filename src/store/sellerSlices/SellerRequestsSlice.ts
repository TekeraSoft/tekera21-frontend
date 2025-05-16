import { HelpRequestBuyerdummyTickets } from "@/data/HelpRequestBuyer";
import { helpRequestCompanyDummyTickets } from "@/data/helpRequestCompany";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Tip tanımı
export interface SellerRequestsSliceProps {
  SellerRequestsCompany: any[];
  SellerRequestsBuyer: any[];
  loading: boolean;
}

// Başlangıç durumu
const initialState: SellerRequestsSliceProps = {
  //   SellerRequestsCompany: [],
  //   SellerRequestsBuyer: [],
  SellerRequestsCompany: helpRequestCompanyDummyTickets,
  SellerRequestsBuyer: HelpRequestBuyerdummyTickets,
  loading: true,
};

export const SellerRequestsSlice = createSlice({
  name: "SellerRequestsSlice",
  initialState,
  reducers: {
    setSellerRequestsCompany: (state, action: PayloadAction<any[]>) => {
      state.SellerRequestsCompany = action.payload;
    },
    setSellerRequestsBuyer: (state, action: PayloadAction<any[]>) => {
      state.SellerRequestsBuyer = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Aksiyonları dışa aktar
export const { setSellerRequestsCompany, setSellerRequestsBuyer, setLoading } =
  SellerRequestsSlice.actions;

// Reducer'ı dışa aktar
export default SellerRequestsSlice.reducer;
