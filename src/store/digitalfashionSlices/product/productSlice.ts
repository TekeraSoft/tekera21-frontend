import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Product arayüzü
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  color: string;
}

// ProductState arayüzü
interface ProductState {
  products: Product[];
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
const DigitalFashionBuyerProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setBuyerProducts(state, action: PayloadAction<Product[]>) {
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
  DigitalFashionBuyerProductSlice.actions;

export default DigitalFashionBuyerProductSlice.reducer;
