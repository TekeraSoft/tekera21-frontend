import {
  getAdminProductCategories,
  getAdminProducts,
  getProductsByCategory,
  searchProducts,
} from "@/services/superadmin/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  code: string;
  brandName: string;
  description: string;
  category?: {
    id: string;
    name: string;
    image: string;
    subCategories: {
      id: string;
      name: string;
      image: string;
    }[];
  };
  variations: {
    id: string;
    modelName: string;
    modelCode: string;
    price: number;
    stock: number;
    sku: string;
    barcode: string;
    attributes: {
      key: string;
      value: string;
    }[];
    images: string[];
  }[];
  currencyType: string;
  tags: string[];
  productType: string;
  attributes: {
    key: string;
    value: string;
  }[];
  rate: number;
  comments: any[]; // yorumlar daha sonra tanımlanacaksa bu şekilde kalabilir
}

interface IData {
  content: IProduct[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
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
  searchTerm: string;
}

const initialState: ProductState = {
  data: {
    content: [],
    page: {
      number: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    },
  },
  loading: true,
  error: null,
  categories: [],
  selectedCategory: "all",
  searchTerm: "",
};

interface FetchProductsParams {
  page: number;
  size: number;
}

export const fetchProducts = createAsyncThunk<IData, FetchProductsParams>(
  "products/fetchProducts",
  async (params, thunkAPI) => {
    try {
      const data = await getAdminProducts(params.page, params.size); // bu fonksiyon parametreleri almalı
      console.log("adminproducts", data);
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
    const data = await getAdminProductCategories(params.page, params.size); // bu fonksiyon parametreleri almalı
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
  try {
    const data = await getProductsByCategory(params.catSlug); // bu fonksiyon parametreleri almalı
    return data; // Assuming the API returns an array and we need the first item
  } catch (error: any) {
    console.log("Fetch error:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const searchProduct = createAsyncThunk<IData, { query: string }>(
  "products/searchProducts",
  async (params, thunkAPI) => {
    try {
      const data = await searchProducts(params.query); // bu fonksiyon parametreleri almalı
      return data; // Assuming the API returns an array and we need the first item
    } catch (error: any) {
      console.log("Fetch error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
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
      })

      // Search Products
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.selectedCategory = "all";
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.error = action.payload.content.length
          ? null
          : "Aradığınız kriterlere uygun ürün Bulunamadı.";
        state.data = action.payload.content.length
          ? action.payload
          : state.data;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu.";
      });
  },
});

export const { setError, setSearchTerm } = adminProductSlice.actions;

export default adminProductSlice.reducer;
