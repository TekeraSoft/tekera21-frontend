import { IProduct } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

// Başlangıç durumu
const initialState: ProductState = {
  products: [],
  loading: true,
  error: null,
};

// Slice oluştur
const buyerProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setBuyerProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setBuyerLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setBuyerError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions ve reducer
export const { setBuyerProducts, setBuyerLoading, setBuyerError } =
  buyerProductSlice.actions;

export default buyerProductSlice.reducer;
