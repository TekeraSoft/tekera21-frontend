import {
  getAdminProductCategories,
  getAdminProducts,
  getProductsByCategory,
} from "@/services/superadmin/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string; // ISO format (string olarak tutulur)
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO tarih formatı
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

interface IData {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

interface ICategory {
  name: string;
  slug: string;
  url: string;
}

interface ProductState {
  data: IData;
  loading: boolean;
  error: string | null;
  categories: ICategory[];
  selectedCategory: string;
}

const initialState: ProductState = {
  data: { products: [], limit: 0, skip: 0, total: 0 },
  loading: true,
  error: null,
  categories: [],
  selectedCategory: "all",
};

interface FetchProductsParams {
  skip: number;
  limit: number;
}

export const fetchProducts = createAsyncThunk<IData, FetchProductsParams>(
  "products/fetchProducts",
  async (params, thunkAPI) => {
    try {
      const data = await getAdminProducts(params.limit, params.skip); // bu fonksiyon parametreleri almalı
      return data;
    } catch (error: any) {
      console.log("Fetch error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk<
  ICategory[],
  FetchProductsParams
>("products/fetchCategories", async (params, thunkAPI) => {
  try {
    const data = await getAdminProductCategories(params.limit, params.skip); // bu fonksiyon parametreleri almalı
    return data;
  } catch (error: any) {
    console.log("Fetch error:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchProductsByCategory = createAsyncThunk<
  IData,
  { catSlug: string }
>("products/fetchProductsByCategory", async (params, thunkAPI) => {
  console.log("fetch by category");
  try {
    const data = await getProductsByCategory(params.catSlug); // bu fonksiyon parametreleri almalı
    return data; // Assuming the API returns an array and we need the first item
  } catch (error: any) {
    console.log("Fetch error:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const adminProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.selectedCategory = "all";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu.";
      })

      //fetchProductsByCategory
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        state.selectedCategory = action.meta.arg.catSlug;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload as string;
        state.error = (action.payload as string) || "Bir hata oluştu.";
      })

      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu.";
      });
  },
});

export const { setError } = adminProductSlice.actions;

export default adminProductSlice.reducer;
